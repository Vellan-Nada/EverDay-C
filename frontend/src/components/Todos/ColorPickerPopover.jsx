import PremiumColorUpsell from '../PremiumColorUpsell.jsx';

const PALETTE = ['#fef3c7', '#e0f2fe', '#f1f5f9', '#e9d5ff', '#fef9c3', '#cffafe', '#dcfce7'];

const ColorPickerPopover = ({ isPremium, onSelect, onClose, disabledReason, saving }) => {
  if (!isPremium) {
    return (
      <div className="todo-color-popover">
        <PremiumColorUpsell
          message={disabledReason || 'Color coding is a premium perk.'}
          onClose={onClose}
        />
      </div>
    );
  }

  return (
    <div className="todo-color-popover">
      <div className="todo-color-grid">
        {PALETTE.map((color) => (
          <button
            key={color}
            type="button"
            style={{ background: color }}
            onClick={() => onSelect(color)}
            disabled={saving}
          />
        ))}
      </div>
      <button type="button" className="todo-btn ghost" onClick={onClose}>
        Cancel
      </button>
    </div>
  );
};

export default ColorPickerPopover;
