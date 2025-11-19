import { useOutletContext } from 'react-router-dom';

const WelcomePage = () => {
  const { features = [] } = useOutletContext() || {};

  return (
    <article style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <header>
        <h1 style={{ marginBottom: '0.4rem' }}>Welcome to EverDay</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          EverDay unifies your habits, notes, todos, focus cycles, and inspiration into one fast web
          app. Explore the sidebar to preview each workspace.
        </p>
      </header>
      <section style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        {features.map((feature) => (
          <div
            key={feature.key}
            style={{
              borderRadius: '1rem',
              background: '#fff',
              padding: '1rem',
              border: '1px solid var(--border)',
            }}
          >
            <h3 style={{ marginTop: 0 }}>{feature.title}</h3>
            <p style={{ marginBottom: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {feature.description}
            </p>
          </div>
        ))}
      </section>
    </article>
  );
};

export default WelcomePage;
