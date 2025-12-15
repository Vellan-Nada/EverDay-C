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
  const dateCount = dates.length || 1;
  const baseMinWidth = 40 + 160 + 60 + 80 + 100; // px for fixed columns
  const dateMinWidth = 72; // px per date column
  const minWidthPx = baseMinWidth + dateCount * dateMinWidth;
  const tableStyle = {
    width: '100%',
    minWidth: `${minWidthPx}px`,
    '--date-count': dateCount,
    '--fixed-pct': '40%',
  };

  return (
    <div className="habit-table-wrapper">
      <div className="habit-table-scroller">
        <table className="habit-table mobile-table" style={tableStyle}>
          <thead>
            <tr>
              <th>#</th>
              <th className="habit-col">Habit</th>
              <th className="icon-col">{showIcons ? 'Icon' : ''}</th>
              <th className="streak-col">{showStreak ? 'Streak' : ''}</th>
              <th className="actions-col">Actions</th>
              {dates.map((date) => (
                <th key={date.iso} className="sticky-dates">
                  {date.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {habits.length === 0 ? (
              <tr>
                <td colSpan={3 + dates.length + 2} style={{ textAlign: 'center', padding: '1.5rem' }}>
                  No habits yet. Click “Add Habit” to start tracking.
                </td>
              </tr>
            ) : (
              habits.map((habit, index) => (
                <HabitRow
                  key={habit.id}
                  index={index}
                  habit={habit}
                  dates={dates}
                  showIcons={showIcons}
                  showStreak={showStreak}
                  onToggleStatus={onToggleStatus}
                  onEdit={onEditHabit}
                  onDelete={onDeleteHabit}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HabitTable;
