import { supabaseAdmin, supabasePublic } from '../services/supabaseClient.js';
import { logger } from '../config/logger.js';

const supabaseAuthClient = supabasePublic || supabaseAdmin;

const fetchUserFromToken = async (token) => {
  return supabaseAuthClient.auth.getUser(token);
};

export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Authorization token missing' });
  }

  try {
    const { data, error } = await fetchUserFromToken(token);

    if (error || !data?.user) {
      logger.warn('Auth middleware rejected token', { error });
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    req.user = data.user;
    req.userId = data.user.id;
    return next();
  } catch (err) {
    logger.error('Auth middleware failed', err);
    return res.status(500).json({ error: 'Auth validation failed' });
  }
};

export const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;

  if (!token) {
    return next();
  }

  try {
    const { data, error } = await fetchUserFromToken(token);
    if (!error && data?.user) {
      req.user = data.user;
      req.userId = data.user.id;
    }
  } catch (err) {
    logger.error('optionalAuth failed', err);
  }

  return next();
};

export const attachProfile = async (req, res, next) => {
  if (!req.userId) {
    return next();
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', req.userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      logger.error('Failed to fetch profile', error);
      return res.status(500).json({ error: 'Unable to load profile' });
    }

    req.profile = data || null;
    return next();
  } catch (err) {
    logger.error('attachProfile error', err);
    return res.status(500).json({ error: 'Unable to attach profile' });
  }
};
