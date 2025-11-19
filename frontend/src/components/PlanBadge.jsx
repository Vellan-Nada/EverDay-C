import { useAuth } from '../hooks/useAuth.js';

const PlanBadge = () => {
  const { plan, planExpiresAt } = useAuth();
  const isPro = plan === 'pro';

  const formattedExpiry =
    planExpiresAt && new Date(planExpiresAt).getTime() > Date.now()
      ? new Date(planExpiresAt).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
        })
      : null;

  return (
    <div
      style={{
        borderRadius: '999px',
        border: `1px solid ${isPro ? 'rgba(34,197,94,0.4)' : 'rgba(148,163,184,0.6)'}`,
        background: isPro ? 'rgba(34,197,94,0.15)' : 'transparent',
        color: isPro ? '#15803d' : 'var(--text-muted)',
        fontWeight: 600,
        padding: '0.35rem 0.85rem',
        fontSize: '0.85rem',
      }}
    >
      {isPro ? 'Pro plan' : 'Free plan'}
      {formattedExpiry && ` • until ${formattedExpiry}`}
    </div>
  );
};

export default PlanBadge;
