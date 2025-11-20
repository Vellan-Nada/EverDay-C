const FREE_ICONS = ['🌞', '📚', '🏃', '🧘', '📝', '💧'];
const PREMIUM_ONLY = ['🚴', '🎯', '🥗', '🛌', '🎵', '🧠'];

const IconPicker = ({ value, onChange, isPremium }) => {
  const icons = isPremium ? [...FREE_ICONS, ...PREMIUM_ONLY] : FREE_ICONS;
  return (
    <div className="icon-picker-grid">
      {icons.map((icon) => (
        <button
          key={icon}
          type="button"
          className={`icon-option ${value === icon ? 'active' : ''}`}
          onClick={() => onChange(icon)}
        >
          {icon}
        </button>
      ))}
    </div>
  );
};

export default IconPicker;
