import BookCard from './BookCard.jsx';
import UpgradeToPremium from '../Notes/UpgradeToPremium.jsx';

const StatusColumn = ({ title, statusId, items, onEdit, onDelete, onMove, onAdd, onChangeColor, isPremium, freeLimitReached, freeLimit }) => {
  return (
    <div className="reading-column">
      <div className="reading-column-header">
        <button type="button" className="reading-btn primary full" onClick={() => onAdd(statusId)}>
          + {title}
        </button>
      </div>
      {freeLimitReached && (
        <div className="reading-alert">
          <p>Free plan limit reached ({freeLimit} items). Upgrade to add more.</p>
          {!isPremium && <UpgradeToPremium variant="compact" cta="Upgrade to Premium" />}
        </div>
      )}
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
              onChangeColor={onChangeColor}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusColumn;
