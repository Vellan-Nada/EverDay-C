const LoadingSpinner = ({ label = 'Loading…' }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
      <span
        style={{
          width: '1rem',
          height: '1rem',
          borderRadius: '50%',
          border: '3px solid rgba(37,99,235,0.2)',
          borderTopColor: 'var(--accent)',
          animation: 'spin 1s linear infinite',
        }}
      />
      {label}
      <style>
        {`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}
      </style>
    </div>
  );
};

export default LoadingSpinner;
