import styles from '../styles/FeaturePanel.module.css';
import { useAuth } from '../hooks/useAuth.js';

const FeaturePlaceholder = ({ feature, ctaLabel = 'Start planning', onCta }) => {
  const { user } = useAuth();

  if (!feature) {
    return (
      <div className={styles.placeholderBox}>
        <p>Loading feature details…</p>
      </div>
    );
  }

  return (
    <div className={styles.featureWrapper}>
      <div className={styles.featureHeader}>
        <h2>{feature.title}</h2>
        <span className={styles.tag}>{user ? 'Synced' : 'Preview'}</span>
      </div>
      <p className={styles.featureDescription}>{feature.description}</p>
      <div className={styles.placeholderBox}>
        <p>
          The {feature.title} experience will live here. We will plug in tracking widgets, charts, and
          Supabase-powered data flows in the next iteration.
        </p>
      </div>
      <div className={styles.ctaRow}>
        <button type="button" className={styles.primaryButton} onClick={onCta}>
          {ctaLabel}
        </button>
        {!user && (
          <button type="button" className={styles.secondaryButton} onClick={() => (window.location.href = '/signup')}>
            Save progress &rarr;
          </button>
        )}
      </div>
      {!user && <p className={styles.infoNote}>Sign up to save and sync your data securely.</p>}
    </div>
  );
};

export default FeaturePlaceholder;
