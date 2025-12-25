import termsOfService from '../Policies/terms.txt?raw';
import styles from '../styles/LegalPage.module.css';

const TermsOfService = () => {
  return (
    <section className={styles.legalPage}>
      <div className={`${styles.legalCard} ${styles.legalCardRightPad}`}>
        <h1>Terms of Service</h1>
        <pre className={styles.legalText}>{termsOfService}</pre>
      </div>
    </section>
  );
};

export default TermsOfService;
