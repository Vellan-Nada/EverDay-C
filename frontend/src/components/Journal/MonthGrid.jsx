import DayTile from './DayTile.jsx';

const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

const MonthGrid = ({ month, year, entriesMap, onSelectDate }) => {
  const days = daysInMonth(month, year);
  const tiles = Array.from({ length: days }, (_, idx) => idx + 1);

  return (
    <div className="journal-grid">
      {tiles.map((day) => {
        const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const hasEntry = Boolean(entriesMap[key]);
        return <DayTile key={key} dateNum={day} hasEntry={hasEntry} onClick={() => onSelectDate(key)} />;
      })}
    </div>
  );
};

export default MonthGrid;
