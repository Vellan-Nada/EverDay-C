import styles from '../styles/UiSamples.module.css';

const overviewStats = [
  { label: 'Focus score', value: '82', detail: '↑ 4 vs last week' },
  { label: 'Deep work hours', value: '14h', detail: 'Goal: 16h' },
  { label: 'Habits kept', value: '11 / 14', detail: 'Next check-in 7pm' },
];

const dayPlan = [
  { time: '07:30', label: 'Movement + journaling', status: 'done' },
  { time: '09:00', label: 'Client sprint review', status: 'done' },
  { time: '11:30', label: 'Deep work block', status: 'in-progress' },
  { time: '15:00', label: 'Learning / reading', status: 'up-next' },
  { time: '18:30', label: 'Family routine', status: 'hold' },
];

const standupUpdates = [
  { title: 'Shipped note sync polishing', meta: 'Today • 45m', tone: 'positive' },
  { title: 'Still testing reading tracker filters', meta: 'Ongoing • 1h', tone: 'neutral' },
  { title: 'Need UX input on Source Dump cards', meta: 'Blocked • awaiting mock', tone: 'alert' },
];

const checkIns = [
  { title: 'Energy', value: 'Balanced', detail: 'Took midday walk, hydration ok.' },
  { title: 'Intentionality', value: 'High', detail: 'Working in 90-minute focus waves.' },
  { title: 'Learning note', value: 'Summarized 3 pages of “Slow Productivity”.' },
];

const UiSamplesPage = () => {
  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>Explorations</p>
          <h1>Modern UI samples</h1>
          <p className={styles.subtitle}>
            Three alternative layouts that stay minimal, tactile, and free of gradients. Use them for hero states,
            marketing snapshots, or upcoming EverDay surfaces.
          </p>
        </div>
        <span className={styles.tag}>No gradients · Neutral palette</span>
      </header>

      <div className={styles.samplesGrid}>
        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <p className={styles.kicker}>Sample A</p>
              <h2>Concise activity overview</h2>
            </div>
            <button type="button" className={styles.secondaryButton}>
              Export layout
            </button>
          </div>
          <div className={styles.sampleOneTop}>
            <div>
              <p className={styles.metaText}>Weekly intention</p>
              <h3>“Protect mornings for deep work and limit context switching after lunch.”</h3>
            </div>
            <div className={styles.statusBadge}>
              <span className={styles.statusDot} />
              In sync with Supabase
            </div>
          </div>
          <div className={styles.statGrid}>
            {overviewStats.map((stat) => (
              <div key={stat.label} className={styles.statCard}>
                <p className={styles.metaText}>{stat.label}</p>
                <p className={styles.statValue}>{stat.value}</p>
                <p className={styles.metaMuted}>{stat.detail}</p>
              </div>
            ))}
          </div>
          <div className={styles.progressRow}>
            <div>
              <p className={styles.metaText}>Focus queue</p>
              <p className={styles.progressTitle}>Writing learning recap</p>
            </div>
            <div className={styles.progressMeter} aria-label="Focus progress">
              <span style={{ width: '68%' }} />
            </div>
            <p className={styles.metaMuted}>68% complete</p>
          </div>
        </article>

        <article className={`${styles.card} ${styles.sampleTwo}`}>
          <div className={styles.cardHeader}>
            <div>
              <p className={styles.kicker}>Sample B</p>
              <h2>Daily rhythm board</h2>
            </div>
            <button type="button" className={styles.primaryButton}>
              Save template
            </button>
          </div>

          <div className={styles.twoColumn}>
            <div className={styles.column}>
              <p className={styles.metaText}>Plan for Wednesday</p>
              <ul className={styles.timeline}>
                {dayPlan.map((block) => (
                  <li key={block.time} className={styles.timelineItem}>
                    <span className={styles.time}>{block.time}</span>
                    <div>
                      <strong>{block.label}</strong>
                      <p className={styles.metaMuted}>{block.status.replace('-', ' ')}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.column}>
              <p className={styles.metaText}>Notes & updates</p>
              <div className={styles.updateList}>
                {standupUpdates.map((update) => (
                  <div key={update.title} className={`${styles.updateCard} ${styles[`tone-${update.tone}`]}`}>
                    <strong>{update.title}</strong>
                    <span>{update.meta}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>

        <article className={`${styles.card} ${styles.sampleThree}`}>
          <div className={styles.cardHeader}>
            <div>
              <p className={styles.kicker}>Sample C</p>
              <h2>Mindful check-in strip</h2>
            </div>
          </div>
          <div className={styles.checkInGrid}>
            {checkIns.map((item) => (
              <div key={item.title} className={styles.checkInCard}>
                <p className={styles.metaText}>{item.title}</p>
                <p className={styles.checkValue}>{item.value}</p>
                {item.detail && <p className={styles.metaMuted}>{item.detail}</p>}
              </div>
            ))}
          </div>
          <div className={styles.notePanel}>
            <p className={styles.metaText}>Today’s highlight</p>
            <p>
              “Even a pared-down UI can feel inviting when we lean on spacing, consistent typography, and quiet accent
              lines instead of gradients.”
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default UiSamplesPage;
