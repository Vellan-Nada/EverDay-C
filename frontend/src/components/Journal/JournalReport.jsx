const formatDateKey = (str) => str;

const JournalReport = ({ entries }) => {
  const total = entries.length;
  const dateSet = new Set(entries.map((e) => formatDateKey(e.entry_date)));

  // simple streak calculation
  const computeStreaks = () => {
    const today = new Date();
    let current = 0;
    let cursor = new Date(today);
    while (dateSet.has(cursor.toISOString().slice(0, 10))) {
      current += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    const sorted = Array.from(dateSet).sort();
    let best = 0;
    let run = 0;
    let prev = null;
    sorted.forEach((d) => {
      if (!prev) {
        run = 1;
      } else {
        const p = new Date(prev);
        p.setDate(p.getDate() + 1);
        if (p.toISOString().slice(0, 10) === d) {
          run += 1;
        } else {
          run = 1;
        }
      }
      prev = d;
      if (run > best) best = run;
    });
    return { current, best };
  };

  const streaks = computeStreaks();
  const moodCounts = entries.reduce((acc, e) => {
    if (e.mood) acc[e.mood] = (acc[e.mood] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="journal-report">
      <div className="journal-report-card">
        <h3>Total entries</h3>
        <p className="journal-metric">{total}</p>
      </div>
      <div className="journal-report-card">
        <h3>Current streak</h3>
        <p className="journal-metric">{streaks.current} days</p>
      </div>
      <div className="journal-report-card">
        <h3>Best streak</h3>
        <p className="journal-metric">{streaks.best} days</p>
      </div>
      <div className="journal-report-card">
        <h3>Moods</h3>
        {Object.keys(moodCounts).length === 0 ? (
          <p className="journal-muted">No moods logged yet.</p>
        ) : (
          <ul className="journal-list">
            {Object.entries(moodCounts).map(([mood, count]) => (
              <li key={mood}>
                {mood}: {count}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default JournalReport;
