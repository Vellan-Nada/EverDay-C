import { supabaseAdmin } from '../services/supabaseClient.js';
import { stripe } from '../services/stripeClient.js';
import { logger } from '../config/logger.js';

const ensureProfileRow = async (user) => {
  const { data, error } = await supabaseAdmin.from('profiles').select('*').eq('id', user.id).single();

  if (error && error.code !== 'PGRST116') {
    throw error;
  }

  if (data) {
    return data;
  }

  const { data: inserted, error: insertError } = await supabaseAdmin
    .from('profiles')
    .insert({
      id: user.id,
      email: user.email ?? user.user_metadata?.email ?? null,
      username: user.user_metadata?.username ?? null,
      plan: 'free',
    })
    .select()
    .single();

  if (insertError) {
    throw insertError;
  }

  return inserted;
};

export const getProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const profile = await ensureProfileRow(req.user);
    return res.json({ profile });
  } catch (error) {
    logger.error('getProfile failed', error);
    return res.status(500).json({ error: 'Unable to fetch profile' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { full_name, avatar_url, username } = req.body;

    if (username) {
      const { data: existing, error: usernameError } = await supabaseAdmin
        .from('profiles')
        .select('id')
        .eq('username', username)
        .neq('id', req.userId)
        .maybeSingle();

      if (usernameError && usernameError.code !== 'PGRST116') {
        logger.error('updateProfile username check error', usernameError);
        return res.status(400).json({ error: 'Unable to validate username' });
      }

      if (existing) {
        return res.status(400).json({ error: 'Username already taken' });
      }
    }

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update({
        full_name,
        avatar_url,
        username,
        updated_at: new Date().toISOString(),
      })
      .eq('id', req.userId)
      .select()
      .single();

    if (error) {
      logger.error('updateProfile error', error);
      return res.status(400).json({ error: 'Could not update profile' });
    }

    return res.json({ profile: data });
  } catch (error) {
    logger.error('updateProfile failed', error);
    return res.status(500).json({ error: 'Unable to update profile' });
  }
};

export const getPlanStatus = async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('plan, plan_expires_at')
      .eq('id', req.userId)
      .single();

    if (error) {
      logger.error('getPlanStatus error', error);
      return res.status(400).json({ error: 'Unable to load plan status' });
    }

    return res.json({ plan: data.plan, plan_expires_at: data.plan_expires_at });
  } catch (error) {
    logger.error('getPlanStatus failed', error);
    return res.status(500).json({ error: 'Unable to load plan status' });
  }
};

const isMissingTableError = (error) => {
  if (!error) return false;
  if (error.code === '42P01') return true;
  if (typeof error.message === 'string' && error.message.toLowerCase().includes('does not exist')) {
    return true;
  }
  return false;
};

const deleteUserRows = async ({ table, column = 'user_id', userId }) => {
  const { error } = await supabaseAdmin.from(table).delete().eq(column, userId);
  if (error) {
    if (isMissingTableError(error)) {
      logger.warn(`Delete skipped, table missing: ${table}`);
      return;
    }
    throw error;
  }
};

const removeSourceDumpScreenshots = async (userId) => {
  const { data, error } = await supabaseAdmin
    .from('source_dumps')
    .select('screenshots')
    .eq('user_id', userId);

  if (error) {
    if (isMissingTableError(error)) {
      logger.warn('source_dumps table missing, skipping screenshot cleanup');
      return;
    }
    throw error;
  }

  const paths = (data || [])
    .flatMap((row) => row?.screenshots || [])
    .filter(Boolean);

  if (!paths.length) return;

  const uniquePaths = Array.from(new Set(paths));
  const { error: storageError } = await supabaseAdmin.storage.from('source-screenshots').remove(uniquePaths);
  if (storageError) {
    logger.warn('Failed to remove source dump screenshots', storageError);
  }
};

const cancelStripeSubscriptions = async (userId) => {
  const { data: profile, error } = await supabaseAdmin
    .from('profiles')
    .select('stripe_customer_id, plan')
    .eq('id', userId)
    .maybeSingle();

  if (error && error.code !== 'PGRST116') {
    throw error;
  }

  if (!profile?.stripe_customer_id) return;

  const { data } = await stripe.subscriptions.list({
    customer: profile.stripe_customer_id,
    status: 'all',
    limit: 100,
  });

  const activeSubscriptions = data.filter((subscription) => subscription.status !== 'canceled');

  if (!activeSubscriptions.length) return;

  await Promise.all(activeSubscriptions.map((subscription) => stripe.subscriptions.cancel(subscription.id)));
};

export const deleteAccount = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    await cancelStripeSubscriptions(req.userId);
    await removeSourceDumpScreenshots(req.userId);

    const tablesToDelete = [
      'habit_logs',
      'habits',
      'notes',
      'todos',
      'reading_list_items',
      'movie_items',
      'source_dumps',
      'journal_entries',
      'pomodoro_sessions',
      'pomodoro_settings',
      'ai_sessions',
      'subscriptions',
      'payments',
      'feedback',
    ];

    for (const table of tablesToDelete) {
      await deleteUserRows({ table, userId: req.userId });
    }

    await deleteUserRows({ table: 'profiles', column: 'id', userId: req.userId });

    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(req.userId);
    if (deleteError) {
      logger.error('Failed to delete auth user', deleteError);
      return res.status(500).json({ error: 'Unable to delete account' });
    }

    return res.json({ success: true });
  } catch (error) {
    logger.error('deleteAccount failed', error);
    return res.status(500).json({ error: 'Unable to delete account' });
  }
};
