import { getIconSymbol } from './iconConfig.js';

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
      <td className="sticky-col">{index + 1}</td>
      <td className="sticky-col habit-col">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <strong>{habit.name}</strong>
          {habit.lastCompleted && (
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Last completed: {habit.lastCompleted}
            </span>
          )}
        </div>
      </td>
      <td className="sticky-col actions-col">
        <div className="habit-row-actions">
          <button type="button" onClick={() => onEdit(habit)}>
            Edit
          </button>
          <button type="button" onClick={() => onDelete(habit)}>
            Delete
          </button>
        </div>
      </td>
      {showIcons && (
        <td className="sticky-col icon-col">
          <span className="habit-icon">{getIconSymbol(habit.icon_key) || '📌'}</span>
        </td>
      )}
      {showStreak && (
        <td className="sticky-col streak-col">
          <span title={`Current: ${habit.currentStreak} • Best: ${habit.best_streak}`}>
            {habit.currentStreak}-day
          </span>
        </td>
      )}
      {dates.map((date) => {
        const cellStatus = habit.statusByDate[date.iso];
        let className = 'status-cell status-empty';
        let symbol = '';
        let content = null;
        let clickable = true;
        if (cellStatus === 'na') {
          className = 'status-cell status-na';
          clickable = false;
        } else if (cellStatus === 'completed') {
          className = 'status-cell status-completed';
          symbol = '✔';
        } else if (cellStatus === 'failed') {
          className = 'status-cell status-failed';
          symbol = '✖';
        } else if (cellStatus === 'none') {
          className = 'status-cell status-choice';
          clickable = false;
          content = (
            <div className="status-choice-options">
              <button type="button" onClick={() => onToggleStatus(habit, date, 'completed')}>
                ✔
              </button>
              <button type="button" onClick={() => onToggleStatus(habit, date, 'failed')}>
                ✖
              </button>
            </div>
          );
        }
        return (
          <td key={date.iso} className="sticky-dates">
            <div
              className={className}
              onClick={() => clickable && onToggleStatus(habit, date)}
              role={clickable ? 'button' : 'group'}
              aria-label={`Toggle ${habit.name} on ${date.label}`}
            >
              {content || symbol}
            </div>
          </td>
        );
      })}
    </tr>
  );
};

export default HabitRow;
