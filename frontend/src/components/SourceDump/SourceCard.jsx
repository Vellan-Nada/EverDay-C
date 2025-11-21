import { useState } from 'react';

const COLOR_PRESETS = ['#f8fafc', '#e0f2fe', '#fef9c3', '#dcfce7', '#ffe4e6'];

const SourceCard = ({ card, isPremium, onEdit, onDelete, onChangeColor }) => {
  const [colorMenu, setColorMenu] = useState(false);
  const [lockedMsg, setLockedMsg] = useState(false);

  const links = (card.links || '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  const bg = isPremium && card.background_color ? card.background_color : '#fff';

  const handleColorClick = () => {
    if (!isPremium) {
      setLockedMsg(true);
      setTimeout(() => setLockedMsg(false), 1500);
      return;
    }
    setColorMenu((p) => !p);
  };

  return (
    <article className="sd-card" style={{ background: bg }}>
      <div className="sd-card-header">
        <h3 title={card.title}>{card.title}</h3>
      </div>
      <div className="sd-card-body">
        {links.length > 0 && (
          <div className="sd-section">
            <strong>Links</strong>
            <div className="sd-links">
              {links.slice(0, 2).map((l) => (
                <a key={l} href={l} target="_blank" rel="noreferrer">
                  {l}
                </a>
              ))}
              {links.length > 2 && <span className="sd-muted">+{links.length - 2} more…</span>}
            </div>
          </div>
        )}
        {card.text_content && (
          <div className="sd-section">
            <strong>Text</strong>
            <p className="sd-text">{card.text_content}</p>
          </div>
        )}
        {isPremium && card.screenshots?.length > 0 && (
          <div className="sd-section">
            <strong>Screenshots</strong>
            <div className="sd-shots">
              {card.screenshots.map((url) => (
                <a key={url} href={url} target="_blank" rel="noreferrer">
                  <img src={url} alt="screenshot" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="sd-card-actions">
        <div className="sd-buttons">
          <button type="button" className="sd-btn ghost" onClick={() => onEdit(card)}>
            Edit
          </button>
          <button type="button" className="sd-btn danger" onClick={() => onDelete(card)}>
            Delete
          </button>
        </div>
        <div className="sd-color-wrap">
          <button type="button" className="sd-color" onClick={handleColorClick} aria-label="Change background color">
            ●
          </button>
          {colorMenu && isPremium && (
            <div className="sd-color-menu">
              {COLOR_PRESETS.map((c) => (
                <button key={c} type="button" style={{ background: c }} onClick={() => { onChangeColor(card, c); setColorMenu(false); }} />
              ))}
              <button type="button" style={{ background: '#fff', border: '1px solid var(--border)' }} onClick={() => { onChangeColor(card, null); setColorMenu(false); }}>
                Default
              </button>
            </div>
          )}
          {lockedMsg && <div className="sd-locked">Premium feature</div>}
        </div>
      </div>
    </article>
  );
};

export default SourceCard;
