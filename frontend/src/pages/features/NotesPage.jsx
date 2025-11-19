import FeaturePlaceholder from '../../components/FeaturePlaceholder.jsx';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';
import { useFeaturePlaceholder } from '../../hooks/useFeaturePlaceholder.js';

const NotesPage = () => {
  const { feature, loading, error } = useFeaturePlaceholder('notes');

  if (loading) return <LoadingSpinner label="Loading notes workspace…" />;
  if (error) return <p style={{ color: 'var(--danger)' }}>{error}</p>;

  return (
    <FeaturePlaceholder
      feature={feature}
      ctaLabel="Draft a note"
      onCta={() => alert('Note editor coming soon.')}
    />
  );
};

export default NotesPage;
