import FeaturePlaceholder from '../../components/FeaturePlaceholder.jsx';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';
import { useFeaturePlaceholder } from '../../hooks/useFeaturePlaceholder.js';

const JournalingPage = () => {
  const { feature, loading, error } = useFeaturePlaceholder('journaling');

  if (loading) return <LoadingSpinner label="Opening journal…" />;
  if (error) return <p style={{ color: 'var(--danger)' }}>{error}</p>;

  return (
    <FeaturePlaceholder
      feature={feature}
      ctaLabel="Start writing"
      onCta={() => alert('Daily journaling canvas coming right up.')}
    />
  );
};

export default JournalingPage;
