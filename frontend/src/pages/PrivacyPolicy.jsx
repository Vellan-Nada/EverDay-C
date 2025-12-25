import privacyPolicy from '../Policies/privacy policy.txt?raw';
import styles from '../styles/LegalPage.module.css';

const PrivacyPolicy = () => {
  return (
    <section className={styles.legalPage}>
      <div className={styles.legalCard}>
        <h1>Privacy Policy</h1>
        <pre className={styles.legalText}>{privacyPolicy}</pre>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
