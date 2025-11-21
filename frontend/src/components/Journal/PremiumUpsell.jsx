const PremiumUpsell = ({ onUpgrade }) => {
  return (
    <div className="journal-upgrade">
      <h3>Unlock Journal Reports</h3>
      <p>Get streak insights, totals, and mood breakdowns with Premium.</p>
      <button type="button" className="journal-btn primary" onClick={onUpgrade}>
        Go Premium
      </button>
    </div>
  );
};

export default PremiumUpsell;
