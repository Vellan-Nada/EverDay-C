const FEATURE_PLACEHOLDERS = {
  habits: {
    title: 'Habit Tracker',
    description: 'Track streaks, completions, and routines. Detailed config coming soon.',
  },
  notes: {
    title: 'Notes',
    description: 'Capture quick notes, organize by tags, and sync to Supabase.',
  },
  todos: {
    title: 'To Do List',
    description: 'Plan tasks, set priorities, and stay focused.',
  },
  pomodoro: {
    title: 'Pomodoro',
    description: 'Timer with customizable focus/break sessions.',
  },
  reading: {
    title: 'Reading List',
    description: 'Save books/articles with status, ratings, and highlights.',
  },
  watch: {
    title: 'Movie & Series List',
    description: 'Keep track of shows and movies you have watched or plan to watch.',
  },
  journaling: {
    title: 'Journaling',
    description: 'Daily reflections stored securely.',
  },
  sourceDump: {
    title: 'Source Dump',
    description: 'Drop screenshots, links, and copied text for later review.',
  },
  aiHelper: {
    title: 'AI Helper',
    description: 'Context-aware assistant powered by OpenAI.',
  },
};

export const listFeatures = (req, res) => {
  const features = Object.entries(FEATURE_PLACEHOLDERS).map(([key, value]) => ({
    key,
    ...value,
  }));
  res.json({ features });
};

export const getFeaturePlaceholder = (req, res) => {
  const { featureKey } = req.params;
  const data = FEATURE_PLACEHOLDERS[featureKey];
  if (!data) {
    return res.status(404).json({ error: 'Feature not found' });
  }
  return res.json({ feature: { key: featureKey, ...data } });
};
