import { useLayoutEffect, useRef, useState } from 'react';
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

  const scrollerRef = useRef(null);
  const [tableWidth, setTableWidth] = useState(1200);

  // Measure available width (content area) and force slight overflow so horizontal scroll stays inside the table
  useLayoutEffect(() => {
    const measure = () => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      const available = scroller.clientWidth || 0;
      const perDate = 110;
      const base = 480; // rough width for non-date columns
      const needed = base + dates.length * perDate;
      const target = Math.max(needed, available + 25, 900);
      setTableWidth(target);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [dates.length]);

  const tableStyle = { minWidth: `${tableWidth}px` };

  return (
    <div className="habit-table-wrapper">
      <div className="habit-table-scroller" ref={scrollerRef}>
        <table className="habit-table mobile-table" style={tableStyle}>
          <thead>
            <tr>
              <th>#</th>
              <th className="habit-col">Habit</th>
              <th className="actions-col">Actions</th>
              {showIcons && <th className="icon-col">Icon</th>}
              {showStreak && isPremium && <th className="streak-col">Streak</th>}
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
    </div>
  );
};

export default HabitTable;
