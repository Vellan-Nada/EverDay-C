import FeaturePlaceholder from '../../components/FeaturePlaceholder.jsx';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';
import { useFeaturePlaceholder } from '../../hooks/useFeaturePlaceholder.js';

const TodoPage = () => {
  const { feature, loading, error } = useFeaturePlaceholder('todos');

  if (loading) return <LoadingSpinner label="Loading tasks…" />;
  if (error) return <p style={{ color: 'var(--danger)' }}>{error}</p>;

  return (
    <FeaturePlaceholder
      feature={feature}
      ctaLabel="Add first task"
      onCta={() => alert('Task board coming soon.')}
    />
  );
};

export default TodoPage;
