const HabitRow = ({
  index,
  habit,
  dates,
  showIcons,
  showStreak,
  onToggleStatus,
  onEdit,
  onDelete,
}) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <strong>{habit.name}</strong>
          {habit.lastCompleted && (
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Last completed: {habit.lastCompleted}
            </span>
          )}
        </div>
      </td>
      {showIcons && (
        <td>
          <span className="habit-icon">{habit.icon_key || '📌'}</span>
        </td>
      )}
      {showStreak && (
        <td>
          <span title={`Current: ${habit.currentStreak} • Best: ${habit.best_streak}`}>
            {habit.currentStreak}-day
          </span>
        </td>
      )}
      {dates.map((date) => {
        const cellStatus = habit.statusByDate[date.iso];
        let className = 'status-cell status-empty';
        let symbol = '';
        if (cellStatus === 'completed') {
          className = 'status-cell status-completed';
          symbol = '✔';
        } else if (cellStatus === 'failed') {
          className = 'status-cell status-failed';
          symbol = '✖';
        }
        return (
          <td key={date.iso} className="sticky-dates">
            <div
              className={className}
              onClick={() => onToggleStatus(habit, date)}
              role="button"
              aria-label={`Toggle ${habit.name} on ${date.label}`}
            >
              {symbol}
            </div>
          </td>
        );
      })}
      <td className="habit-row-actions">
        <button type="button" onClick={() => onEdit(habit)}>
          Edit
        </button>
        <button type="button" onClick={() => onDelete(habit)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default HabitRow;
