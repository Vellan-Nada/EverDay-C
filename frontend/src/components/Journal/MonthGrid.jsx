import DayTile from './DayTile.jsx';

const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

const MonthGrid = ({ month, year, entriesMap, onSelectDate }) => {
  const days = daysInMonth(month, year);
  const tiles = Array.from({ length: days }, (_, idx) => idx + 1);
  const firstDay = new Date(year, month, 1).getDay(); // 0 = Sun
  const offset = (firstDay + 6) % 7; // shift to Monday start
  const totalSlots = Math.ceil((offset + days) / 7) * 7;
  const placeholders = totalSlots - (offset + days);
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <>
      <div className="journal-day-row">
        {dayNames.map((d) => (
          <div key={d} className="journal-day-name">
            {d}
          </div>
        ))}
      </div>
      <div className="journal-grid">
        {Array.from({ length: offset }).map((_, idx) => (
          <div key={`lead-${idx}`} className="journal-day placeholder" />
        ))}
        {tiles.map((day) => {
          const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const hasEntry = Boolean(entriesMap[key]);
          return <DayTile key={key} dateNum={day} hasEntry={hasEntry} onClick={() => onSelectDate(key)} />;
        })}
        {Array.from({ length: placeholders }).map((_, idx) => (
          <div key={`trail-${idx}`} className="journal-day placeholder" />
        ))}
      </div>
    </>
  );
};

export default MonthGrid;
