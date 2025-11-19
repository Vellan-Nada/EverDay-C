import FeaturePlaceholder from '../../components/FeaturePlaceholder.jsx';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';
import { useFeaturePlaceholder } from '../../hooks/useFeaturePlaceholder.js';

const ReadingListPage = () => {
  const { feature, loading, error } = useFeaturePlaceholder('reading');

  if (loading) return <LoadingSpinner label="Fetching reading tracker…" />;
  if (error) return <p style={{ color: 'var(--danger)' }}>{error}</p>;

  return (
    <FeaturePlaceholder
      feature={feature}
      ctaLabel="Save a book"
      onCta={() => alert('Reading list view will live here soon.')}
    />
  );
};

export default ReadingListPage;
