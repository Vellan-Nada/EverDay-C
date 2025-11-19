import { useAuth } from '../hooks/useAuth.js';

const PLAN_STYLES = {
  free: {
    border: 'rgba(148,163,184,0.6)',
    background: 'transparent',
    color: 'var(--text-muted)',
    label: 'Free plan',
  },
  plus: {
    border: 'rgba(251,191,36,0.7)',
    background: 'rgba(251,191,36,0.18)',
    color: '#b45309',
    label: 'Plus plan',
  },
  pro: {
    border: 'rgba(34,197,94,0.4)',
    background: 'rgba(34,197,94,0.15)',
    color: '#15803d',
    label: 'Pro plan',
  },
};

const PlanBadge = () => {
  const { planTier, planExpiresAt } = useAuth();
  const style = PLAN_STYLES[planTier] || PLAN_STYLES.free;

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
        border: `1px solid ${style.border}`,
        background: style.background,
        color: style.color,
        fontWeight: 600,
        padding: '0.35rem 0.85rem',
        fontSize: '0.85rem',
      }}
    >
      {style.label}
      {formattedExpiry && ` • until ${formattedExpiry}`}
    </div>
  );
};

export default PlanBadge;
