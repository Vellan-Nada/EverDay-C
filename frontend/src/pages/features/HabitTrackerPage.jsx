import FeaturePlaceholder from '../../components/FeaturePlaceholder.jsx';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';
import { useFeaturePlaceholder } from '../../hooks/useFeaturePlaceholder.js';

const HabitTrackerPage = () => {
  const { feature, loading, error } = useFeaturePlaceholder('habits');

  if (loading) return <LoadingSpinner label="Preparing habit insights…" />;
  if (error) return <p style={{ color: 'var(--danger)' }}>{error}</p>;

  return (
    <FeaturePlaceholder
      feature={feature}
      ctaLabel="Map your habits"
      onCta={() => alert('Habit tracking widgets will appear here soon!')}
    />
  );
};

export default HabitTrackerPage;
