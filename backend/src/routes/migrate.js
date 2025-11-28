import { Router } from 'express';
import { supabaseAdmin } from '../services/supabaseClient.js';

const router = Router();

// Normalize strings for loose matching
const norm = (val) => (val || '').trim().toLowerCase();

router.post('/guest-to-user', async (req, res) => {
  const { user_id: userId, guestData } = req.body || {};
  if (!userId || !guestData) {
    return res.status(400).json({ error: 'Missing user_id or guestData' });
  }

  try {
    // Notes: dedupe by title+content
    if (guestData.notes?.length) {
      await supabaseAdmin.from('notes').upsert(
        guestData.notes.map((n) => ({
          title: n.title || null,
          content: n.content || null,
          user_id: userId,
        })),
        { onConflict: 'user_id,title,content' }
      );
    }

    // Todos: dedupe by title+type
    if (guestData.todos?.length) {
      await supabaseAdmin.from('todos').upsert(
        guestData.todos.map((t) => ({
          title: t.title || null,
          type: t.type || 'task',
          is_completed: Boolean(t.is_completed),
          background_color: t.background_color || null,
          user_id: userId,
        })),
        { onConflict: 'user_id,title,type' }
      );
    }

    // Reading list: dedupe by title+status
    if (guestData.readingList?.length) {
      await supabaseAdmin.from('reading_list_items').upsert(
        guestData.readingList.map((b) => ({
          title: b.title || null,
          author: b.author || null,
          notes: b.notes || null,
          status: b.status || 'want_to_read',
          background_color: b.background_color || null,
          user_id: userId,
        })),
        { onConflict: 'user_id,title,status' }
      );
    }

    // Movie items: dedupe by title+status
    if (guestData.movieItems?.length) {
      await supabaseAdmin.from('movie_items').upsert(
        guestData.movieItems.map((m) => ({
          title: m.title || null,
          actor_actress: m.actor_actress || null,
          director: m.director || null,
          notes: m.notes || null,
          status: m.status || 'to_watch',
          card_color: m.card_color || null,
          user_id: userId,
        })),
        { onConflict: 'user_id,title,status' }
      );
    }

    // Journal: dedupe by entry_date
    if (guestData.journalEntries?.length) {
      await supabaseAdmin.from('journal_entries').upsert(
        guestData.journalEntries
          .filter((j) => j.entry_date)
          .map((j) => ({
            entry_date: j.entry_date,
            thoughts: j.thoughts || null,
            good_things: j.good_things || null,
            bad_things: j.bad_things || null,
            lessons: j.lessons || null,
            dreams: j.dreams || null,
            mood: j.mood || null,
            user_id: userId,
          })),
        { onConflict: 'user_id,entry_date' }
      );
    }

    // Source dumps: dedupe by title
    if (guestData.sourceDumps?.length) {
      await supabaseAdmin.from('source_dumps').upsert(
        guestData.sourceDumps.map((s) => ({
          title: s.title || null,
          links: s.links || null,
          text_content: s.text_content || null,
          screenshots: s.screenshots || [],
          background_color: s.background_color || null,
          user_id: userId,
        })),
        { onConflict: 'user_id,title' }
      );
    }

    // Habits: dedupe by name
    if (guestData.habits?.length) {
      await supabaseAdmin.from('habits').upsert(
        guestData.habits.map((h) => ({
          name: h.name || h.title || '',
          icon_key: h.icon_key || null,
          is_deleted: Boolean(h.is_deleted),
          best_streak: h.best_streak || 0,
          user_id: userId,
          created_at: h.created_at || new Date().toISOString(),
        })),
        { onConflict: 'user_id,name' }
      );
    }

    // Habit logs: dedupe by habit/date
    if (guestData.habitLogs && Object.keys(guestData.habitLogs).length) {
      const rows = [];
      Object.entries(guestData.habitLogs).forEach(([hid, logs]) => {
        Object.values(logs || {}).forEach((log) => {
          if (!log.log_date && !log.date) return;
          rows.push({
            habit_id: hid,
            log_date: log.log_date || log.date,
            status: log.status || 'completed',
            user_id: userId,
          });
        });
      });
      if (rows.length) {
        await supabaseAdmin.from('habit_logs').upsert(rows, { onConflict: 'user_id,habit_id,log_date' });
      }
    }

    return res.json({ status: 'ok' });
  } catch (err) {
    console.error('Migration failed', err);
    return res.status(500).json({ error: 'Migration failed' });
  }
});

export default router;
