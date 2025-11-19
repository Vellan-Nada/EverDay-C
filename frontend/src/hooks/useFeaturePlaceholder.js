import { useEffect, useState } from 'react';
import { fetchFeatureDetail } from '../api/featureApi.js';

export const useFeaturePlaceholder = (featureKey) => {
  const [feature, setFeature] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFeature = async () => {
      setLoading(true);
      try {
        const { feature: data } = await fetchFeatureDetail(featureKey);
        setFeature(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadFeature();
  }, [featureKey]);

  return { feature, loading, error };
};
