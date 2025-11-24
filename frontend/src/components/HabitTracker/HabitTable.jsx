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
    <div className="habit-table-wrapper dual-table">
      <div className="habit-table-fixed">
        <table className="habit-table">
          <thead>
            <tr>
              <th className="sticky-col">#</th>
              <th className="sticky-col habit-col">Habit</th>
              <th className="sticky-col actions-col">Actions</th>
              {showIcons && <th className="sticky-col icon-col">Icon</th>}
              {showStreak && isPremium && <th className="sticky-col streak-col">Streak</th>}
            </tr>
          </thead>
          <tbody>
            {habits.map((habit, index) => (
              <HabitRow
                key={`fixed-${habit.id}`}
                mode="fixed"
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

      <div className="habit-table-dates">
        <div className="habit-date-scroller">
          <table className="habit-table">
            <thead>
              <tr>
                {dates.map((date) => (
                  <th key={date.iso} className="sticky-dates">
                    {date.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {habits.map((habit, index) => (
                <HabitRow
                  key={`dates-${habit.id}`}
                  mode="dates"
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
      </div>
    </div>
  );
};

export default HabitTable;
