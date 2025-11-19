import { useState } from 'react';
import styles from '../styles/TopNav.module.css';

const FeedbackButton = ({ onFeedback }) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'relative' }} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        className={styles.feedbackButton}
        onMouseEnter={() => setOpen(true)}
        onFocus={() => setOpen(true)}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        💬 Feedback
      </button>
      {open && (
        <div className={styles.tooltip} role="dialog" aria-label="Feedback prompt">
          <p>Give feedback</p>
          <button type="button" onClick={onFeedback}>
            Open form
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedbackButton;
