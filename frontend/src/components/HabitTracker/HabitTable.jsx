import HabitRow from './HabitRow.jsx';

const HabitTable = ({
  habits,
  dates,
  showIcons,
  showStreak,
  isPremium,
  onToggleStatus,
  onEditHabit,
  onDeleteHabit,
}) => {
  if (!habits.length) {
    return (
      <div className="habit-empty">
        <p>No habits yet. Click “Add Habit” to start tracking.</p>
      </div>
    );
  }

  return (
    <div className="habit-table-wrapper">
      <table className="habit-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Habit</th>
            {showIcons && <th>Icon</th>}
            {showStreak && isPremium && <th>Streak</th>}
            {dates.map((date) => (
              <th key={date.iso} className="sticky-dates">
                {date.label}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {habits.map((habit, index) => (
            <HabitRow
              key={habit.id}
              index={index}
              habit={habit}
              dates={dates}
              showIcons={showIcons}
              showStreak={showStreak && isPremium}
              onToggleStatus={onToggleStatus}
              onEdit={onEditHabit}
              onDelete={onDeleteHabit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HabitTable;
