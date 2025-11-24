import BookCard from './BookCard.jsx';

const StatusColumn = ({ title, statusId, items, onEdit, onDelete, onMove, onAdd, isPremium }) => {
  return (
    <div className="reading-column">
      <div className="reading-column-header">
        <h3>{title}</h3>
        <button type="button" className="reading-btn primary small" onClick={() => onAdd(statusId)}>
          + Add
        </button>
      </div>
      {items.length === 0 ? (
        <p className="reading-empty">No books here yet.</p>
      ) : (
        <div className="reading-list">
          {items.map((item) => (
            <BookCard
              key={item.id}
              item={item}
              isPremium={isPremium}
              onEdit={onEdit}
              onDelete={onDelete}
              onMove={onMove}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusColumn;
