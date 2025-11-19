import { NavLink } from 'react-router-dom';
import styles from '../styles/Sidebar.module.css';

const navItems = [
  { label: 'Habit Tracker', path: '/habits' },
  { label: 'Notes', path: '/notes' },
  { label: 'To Do List', path: '/tasks' },
  { label: 'Pomodoro', path: '/pomodoro' },
  { label: 'Reading List', path: '/reading' },
  { label: 'Movie & Series', path: '/watch' },
  { label: 'Journaling', path: '/journaling' },
  { label: 'Source Dump', path: '/source-dump' },
  { label: 'AI Helper', path: '/ai-helper' },
];

const Sidebar = ({ onUpgradeClick = () => {} }) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <h1>EverDay</h1>
        <span>All-in-one productivity space</span>
      </div>

      <div>
        <div className={styles.navSectionTitle}>Toolkit</div>
        <nav className={styles.nav} aria-label="Feature navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className={styles.ctaCard}>
        <strong>Unlock EverDay Pro</strong>
        <p>Get AI helper boosts, deep insights, and data backups.</p>
        <button type="button" onClick={onUpgradeClick}>
          See plans
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
