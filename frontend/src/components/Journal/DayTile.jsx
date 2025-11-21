const DayTile = ({ dateNum, hasEntry, onClick }) => {
  return (
    <button type="button" className={`journal-day ${hasEntry ? 'has-entry' : ''}`} onClick={onClick}>
      <span className="journal-day-number">{dateNum}</span>
      {hasEntry ? <span className="journal-day-label">Journal entry</span> : <span className="journal-plus">+</span>}
    </button>
  );
};

export default DayTile;
