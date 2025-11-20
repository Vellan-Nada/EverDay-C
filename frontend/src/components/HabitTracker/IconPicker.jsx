import React from 'react';
import { FREE_ICONS, PREMIUM_ICONS } from './iconConfig.js';

const IconPicker = ({ value, onChange, isPremium }) => {
  const icons = isPremium ? [...FREE_ICONS, ...PREMIUM_ICONS] : FREE_ICONS;

  return (
    <div className="icon-picker">
      {!isPremium && (
        <p className="icon-picker__hint">
          Upgrade to unlock more icons.
        </p>
      )}
      <div className="icon-picker__grid">
        {icons.map((icon) => {
          const isActive = value === icon.key;
          return (
            <button
              key={icon.key}
              type="button"
              className={`icon-picker__item ${isActive ? 'is-active' : ''}`}
              onClick={() => onChange(icon.key)}
              aria-pressed={isActive}
            >
              <span>{icon.symbol}</span>
              <small>{icon.label}</small>
            </button>
          );
        })}
      </div>
      {value && (
        <button type="button" className="icon-picker__clear" onClick={() => onChange('')}>
          Clear icon
        </button>
      )}
    </div>
  );
};

export default IconPicker;
