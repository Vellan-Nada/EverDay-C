import FeaturePlaceholder from '../../components/FeaturePlaceholder.jsx';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';
import { useFeaturePlaceholder } from '../../hooks/useFeaturePlaceholder.js';

const WatchlistPage = () => {
  const { feature, loading, error } = useFeaturePlaceholder('watch');

  if (loading) return <LoadingSpinner label="Loading watchlist workspace…" />;
  if (error) return <p style={{ color: 'var(--danger)' }}>{error}</p>;

  return (
    <FeaturePlaceholder
      feature={feature}
      ctaLabel="Track a show"
      onCta={() => alert('Watchlist board is under construction.')}
    />
  );
};

export default WatchlistPage;
