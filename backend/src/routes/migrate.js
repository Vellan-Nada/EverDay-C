import { Router } from 'express';
import { supabaseAdmin } from '../services/supabaseClient.js';

const router = Router();

// helper: fetch existing rows for a user and filter out rows that match by a predicate
const fetchExisting = async (table, userId, columns = '*') => {
  const { data, error } = await supabaseAdmin.from(table).select(columns).eq('user_id', userId);
  if (error) throw error;
  return data || [];
};

const insertSafe = async (table, rows) => {
  if (!rows.length) return null;
  return supabaseAdmin.from(table).insert(rows);
};

router.post('/guest-to-user', async (req, res) => {
  const { user_id: userId, guestData } = req.body || {};
  if (!userId || !guestData) {
    return res.status(400).json({ error: 'Missing user_id or guestData' });
  }

  try {
    // Notes: dedupe by title+content
    if (guestData.notes?.length) {
      const existing = await fetchExisting('notes', userId, 'title,content');
      const existingKeys = new Set(existing.map((n) => `${n.title || ''}||${n.content || ''}`));
      const rows = guestData.notes
        .filter((n) => {
          const key = `${n.title || ''}||${n.content || ''}`;
          if (existingKeys.has(key)) return false;
          existingKeys.add(key);
          return true;
        })
        .map((n) => ({
          title: n.title || null,
          content: n.content || null,
          user_id: userId,
        }));
      await insertSafe('notes', rows);
    }

    // Todos: dedupe by title+type
    if (guestData.todos?.length) {
      const existing = await fetchExisting('todos', userId, 'title,type');
      const existingKeys = new Set(existing.map((t) => `${t.title || ''}||${t.type || 'task'}`));
      const rows = guestData.todos
        .filter((t) => {
          const key = `${t.title || ''}||${t.type || 'task'}`;
          if (existingKeys.has(key)) return false;
          existingKeys.add(key);
          return true;
        })
        .map((t) => ({
          title: t.title || null,
          type: t.type || 'task',
          is_completed: Boolean(t.is_completed),
          background_color: t.background_color || null,
          user_id: userId,
        }));
      await insertSafe('todos', rows);
    }

    // Reading list: dedupe by title+status
    if (guestData.readingList?.length) {
      const existing = await fetchExisting('reading_list_items', userId, 'title,status');
      const existingKeys = new Set(existing.map((r) => `${r.title || ''}||${r.status || 'want_to_read'}`));
      const rows = guestData.readingList
        .filter((b) => {
          const key = `${b.title || ''}||${b.status || 'want_to_read'}`;
          if (existingKeys.has(key)) return false;
          existingKeys.add(key);
          return true;
        })
        .map((b) => ({
          title: b.title || null,
          author: b.author || null,
          notes: b.notes || null,
          status: b.status || 'want_to_read',
          background_color: b.background_color || null,
          user_id: userId,
        }));
      await insertSafe('reading_list_items', rows);
    }

    // Movie items: dedupe by title+status
    if (guestData.movieItems?.length) {
      const existing = await fetchExisting('movie_items', userId, 'title,status');
      const existingKeys = new Set(existing.map((m) => `${m.title || ''}||${m.status || 'to_watch'}`));
      const rows = guestData.movieItems
        .filter((m) => {
          const key = `${m.title || ''}||${m.status || 'to_watch'}`;
          if (existingKeys.has(key)) return false;
          existingKeys.add(key);
          return true;
        })
        .map((m) => ({
          title: m.title || null,
          actor_actress: m.actor_actress || null,
          director: m.director || null,
          notes: m.notes || null,
          status: m.status || 'to_watch',
          card_color: m.card_color || null,
          user_id: userId,
        }));
      await insertSafe('movie_items', rows);
    }

    // Journal: dedupe by entry_date
    if (guestData.journalEntries?.length) {
      const existing = await fetchExisting('journal_entries', userId, 'entry_date');
      const existingDates = new Set(existing.map((j) => j.entry_date));
      const rows = guestData.journalEntries
        .filter((j) => {
          if (!j.entry_date) return false;
          if (existingDates.has(j.entry_date)) return false;
          existingDates.add(j.entry_date);
          return true;
        })
        .map((j) => ({
          entry_date: j.entry_date,
          thoughts: j.thoughts || null,
          good_things: j.good_things || null,
          bad_things: j.bad_things || null,
          lessons: j.lessons || null,
          dreams: j.dreams || null,
          mood: j.mood || null,
          user_id: userId,
        }));
      await insertSafe('journal_entries', rows);
    }

    // Source dumps: dedupe by title
    if (guestData.sourceDumps?.length) {
      const existing = await fetchExisting('source_dumps', userId, 'title');
      const existingTitles = new Set(existing.map((s) => s.title || ''));
      const rows = guestData.sourceDumps
        .filter((s) => {
          const key = s.title || '';
          if (existingTitles.has(key)) return false;
          existingTitles.add(key);
          return true;
        })
        .map((s) => ({
          title: s.title || null,
          links: s.links || null,
          text_content: s.text_content || null,
          screenshots: s.screenshots || [],
          background_color: s.background_color || null,
          user_id: userId,
        }));
      await insertSafe('source_dumps', rows);
    }

    // Habits: dedupe by name
    if (guestData.habits?.length) {
      const existing = await fetchExisting('habits', userId, 'id,name');
      const existingNames = new Set(existing.map((h) => h.name || ''));
      const idMap = {};
      existing.forEach((h) => {
        if (h.name) idMap[h.name] = h.id;
      });
      const rows = guestData.habits
        .filter((h) => {
          const key = h.name || h.title || '';
          if (existingNames.has(key)) return false;
          existingNames.add(key);
          return true;
        })
        .map((h) => ({
          name: h.name || h.title || '',
          icon_key: h.icon_key || null,
          is_deleted: Boolean(h.is_deleted),
          best_streak: h.best_streak || 0,
          user_id: userId,
          created_at: h.created_at || new Date().toISOString(),
        }));
      const insertRes = await insertSafe('habits', rows);
      // Map habit logs to any newly created habit IDs where names matched
      if (guestData.habitLogs && Object.keys(guestData.habitLogs).length) {
        let habitRows = [];
        if (insertRes?.data) habitRows = insertRes.data;
        const nameToId = { ...idMap };
        habitRows.forEach((h) => {
          if (h.name) nameToId[h.name] = h.id;
        });
        const logsPayload = [];
        Object.entries(guestData.habitLogs).forEach(([hid, logs]) => {
          Object.values(logs || {}).forEach((log) => {
            const targetHabitId = nameToId[log.habit_name || log.habitTitle || log.habitName] || nameToId[log.habit_name] || nameToId[log.habitTitle] || nameToId[log.habitName] || nameToId[hid];
            if (!targetHabitId) return;
            logsPayload.push({
              habit_id: targetHabitId,
              log_date: log.log_date || log.date || null,
              status: log.status || 'completed',
              user_id: userId,
            });
          });
        });
        if (logsPayload.length) {
          await insertSafe('habit_logs', logsPayload);
        }
      }
    } else if (guestData.habitLogs && Object.keys(guestData.habitLogs).length) {
      // If only logs exist without habits, skip to avoid orphan rows
    }

    return res.json({ status: 'ok' });
  } catch (err) {
    console.error('Migration failed', err);
    return res.status(500).json({ error: 'Migration failed' });
  }
});

export default router;
