import { useState } from 'react';
import PremiumColorUpsell from '../PremiumColorUpsell.jsx';

const STATUS_OPTIONS = [
  { id: 'to_watch', label: "Move to 'To watch'" },
  { id: 'watching', label: "Move to 'Watching'" },
  { id: 'watched', label: "Move to 'Watched'" },
];

const COLOR_PRESETS = ['#fff7ed', '#eef2ff', '#ecfeff', '#f1f5f9', '#fef9c3', '#e0f2fe'];

const MovieItemCard = ({ item, isPremium, onEdit, onDelete, onMove, onChangeColor }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [showUpsell, setShowUpsell] = useState(false);

  const bg = item.card_color ?? '#f8fafc';

  const handleColorClick = () => {
    if (!isPremium) {
      setShowUpsell((prev) => !prev);
      setColorOpen(false);
      return;
    }
    setColorOpen((prev) => !prev);
  };

  return (
    <article className="movie-card" style={{ background: bg }}>
      <div className="movie-card-body">
        {item.title && <h3>{item.title}</h3>}
        {item.actor_actress && <p className="movie-meta">Cast: {item.actor_actress}</p>}
        {item.director && <p className="movie-meta">Director: {item.director}</p>}
        {item.notes && <p className="movie-notes">{item.notes}</p>}
      </div>
      <div className="movie-card-actions">
        <div className="movie-card-buttons">
          <div className="movie-color-wrap">
            <button
              type="button"
              className={`movie-color ${isPremium ? '' : 'locked'}`}
              aria-label="Change color"
              onClick={(e) => {
                e.stopPropagation();
                handleColorClick();
              }}
            >
              {isPremium ? '●' : '🔒'}
            </button>
            {colorOpen && isPremium && (
              <div className="movie-color-popover" onClick={(e) => e.stopPropagation()}>
                <div className="movie-color-menu">
                  {COLOR_PRESETS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      style={{ background: c }}
                      onClick={() => {
                        onChangeColor(item, c);
                        setColorOpen(false);
                      }}
                    />
                  ))}
                  <button
                    type="button"
                    style={{ background: '#fff', border: '1px solid var(--border)' }}
                    onClick={() => {
                      onChangeColor(item, null);
                      setColorOpen(false);
                    }}
                    aria-label="Reset color"
                  />
                </div>
                <button type="button" className="movie-btn ghost" onClick={() => setColorOpen(false)}>
                  Cancel
                </button>
              </div>
            )}
            {showUpsell && (
              <div className="movie-color-popover" onClick={(e) => e.stopPropagation()}>
                <PremiumColorUpsell onClose={() => setShowUpsell(false)} />
              </div>
            )}
          </div>
          <button type="button" className="movie-btn ghost" onClick={() => onEdit(item)}>
            Edit
          </button>
          <button type="button" className="movie-btn danger" onClick={() => onDelete(item)}>
            Delete
          </button>
        </div>
        <div className="movie-move">
          <button type="button" className="movie-btn ghost" onClick={() => setMenuOpen((p) => !p)} aria-label="Move item">
            ⇄ Move
          </button>
          {menuOpen && (
            <div className="movie-move-menu">
              {STATUS_OPTIONS.filter((opt) => opt.id !== item.status).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    onMove(item, opt.id);
                    setMenuOpen(false);
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default MovieItemCard;
