import FeaturePlaceholder from '../../components/FeaturePlaceholder.jsx';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';
import { useFeaturePlaceholder } from '../../hooks/useFeaturePlaceholder.js';

const PomodoroPage = () => {
  const { feature, loading, error } = useFeaturePlaceholder('pomodoro');

  if (loading) return <LoadingSpinner label="Booting the timer…" />;
  if (error) return <p style={{ color: 'var(--danger)' }}>{error}</p>;

  return (
    <FeaturePlaceholder
      feature={feature}
      ctaLabel="Start focus sprint"
      onCta={() => alert('Pomodoro timer UI coming soon.')}
    />
  );
};

export default PomodoroPage;
