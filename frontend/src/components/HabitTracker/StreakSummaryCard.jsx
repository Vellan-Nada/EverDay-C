const StreakSummaryCard = ({ habits }) => {
  if (!habits.length) return null;

  const sorted = [...habits]
    .filter((habit) => habit.currentStreak > 0)
    .sort((a, b) => b.currentStreak - a.currentStreak)
    .slice(0, 5);

  if (!sorted.length) return null;

  return (
    <div className="streak-card">
      <h3>Top streaks</h3>
      <ul>
        {sorted.map((habit) => (
          <li key={habit.id}>
            <strong>{habit.name}</strong> – {habit.currentStreak} days
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StreakSummaryCard;
