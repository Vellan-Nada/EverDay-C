import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient.js';

export const usePremiumStatus = (userId) => {
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setIsPremium(false);
      setLoading(false);
      return;
    }
    const fetchStatus = async () => {
      setLoading(true);
      try {
        const { data, error: fetchError } = await supabase
          .from('profiles')
          .select('is_premium')
          .eq('id', userId)
          .single();
        if (fetchError) throw fetchError;
        setIsPremium(Boolean(data?.is_premium));
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Unable to load premium status');
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, [userId]);

  return { isPremium, loading, error };
};

export default usePremiumStatus;
