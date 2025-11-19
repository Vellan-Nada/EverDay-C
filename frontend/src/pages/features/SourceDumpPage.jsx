import FeaturePlaceholder from '../../components/FeaturePlaceholder.jsx';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';
import { useFeaturePlaceholder } from '../../hooks/useFeaturePlaceholder.js';

const SourceDumpPage = () => {
  const { feature, loading, error } = useFeaturePlaceholder('sourceDump');

  if (loading) return <LoadingSpinner label="Preparing Source Dump…" />;
  if (error) return <p style={{ color: 'var(--danger)' }}>{error}</p>;

  return (
    <FeaturePlaceholder
      feature={feature}
      ctaLabel="Capture a resource"
      onCta={() => alert('Upload & clipping experience coming next.')}
    />
  );
};

export default SourceDumpPage;
