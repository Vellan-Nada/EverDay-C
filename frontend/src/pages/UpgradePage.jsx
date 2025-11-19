import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { createCheckoutSession, createBillingPortalSession } from '../api/billingApi.js';
import PlanBadge from '../components/PlanBadge.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const perkList = [
  'Unlimited habit + task history with insights',
  'AI Helper priority responses & saved threads',
  'Cloud backups for notes, journal, and Source Dump',
  'Early feature drops & direct feedback loop',
];

const UpgradePage = () => {
  const navigate = useNavigate();
  const { user, token, isPro, planExpiresAt, profileLoading } = useAuth();
  const [status, setStatus] = useState({ checkout: null, portal: null, error: null });

  const ensureSignedIn = () => {
    if (!token) {
      navigate('/login');
      return false;
    }
    return true;
  };

  const startCheckout = async () => {
    if (!ensureSignedIn() || isPro) return;
    try {
      setStatus((prev) => ({ ...prev, checkout: 'loading', error: null }));
      const { url } = await createCheckoutSession('subscription', token);
      window.location.href = url;
    } catch (err) {
      setStatus((prev) => ({ ...prev, checkout: null, error: err.message || 'Unable to start checkout' }));
    }
  };

  const startDonation = async () => {
    if (!ensureSignedIn()) return;
    try {
      setStatus((prev) => ({ ...prev, checkout: 'loading', error: null }));
      const { url } = await createCheckoutSession('donation', token);
      window.location.href = url;
    } catch (err) {
      setStatus((prev) => ({ ...prev, checkout: null, error: err.message || 'Unable to start donation' }));
    }
  };

  const openBillingPortal = async () => {
    if (!ensureSignedIn()) return;
    try {
      setStatus((prev) => ({ ...prev, portal: 'loading', error: null }));
      const { url } = await createBillingPortalSession(token);
      window.location.href = url;
    } catch (err) {
      setStatus((prev) => ({ ...prev, portal: null, error: err.message || 'Unable to open portal' }));
    }
  };

  const formattedExpiry =
    planExpiresAt && new Date(planExpiresAt).getTime() > Date.now()
      ? new Date(planExpiresAt).toLocaleString(undefined, {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : null;

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <header>
        <p style={{ textTransform: 'uppercase', fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
          Plans
        </p>
        <h1 style={{ marginBottom: '0.35rem' }}>Choose the focus you need</h1>
        <p style={{ color: 'var(--text-muted)', margin: 0 }}>
          Unlock deeper analytics, AI assistance, and synced backups. You can upgrade any time and cancel directly via Stripe.
        </p>
      </header>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
        }}
      >
        <div style={{ border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.5rem', background: '#fff' }}>
          <h2 style={{ marginTop: 0 }}>EverDay Free</h2>
          <p style={{ color: 'var(--text-muted)' }}>Explore every workspace and keep using EverDay anonymously.</p>
          <p style={{ fontSize: '2.4rem', fontWeight: 700, margin: '1rem 0' }}>$0</p>
          <ul style={{ paddingLeft: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            <li>Access to all 9 tools in preview</li>
            <li>Local experience without sync</li>
            <li>Community updates</li>
          </ul>
        </div>

        <div
          style={{
            borderRadius: '1rem',
            padding: '1.5rem',
            background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
            color: '#fff',
            boxShadow: '0 25px 60px rgba(79, 70, 229, 0.35)',
            position: 'relative',
          }}
        >
          <div style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '0.75rem', letterSpacing: '0.08em' }}>
            PRO
          </div>
          <h2 style={{ marginTop: 0 }}>EverDay Pro</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)' }}>One plan, all the depth you need.</p>
          <p style={{ fontSize: '2.8rem', fontWeight: 700, margin: '1rem 0' }}>$9<span style={{ fontSize: '1rem' }}>/mo</span></p>
          <ul style={{ paddingLeft: '1.1rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
            {perkList.map((perk) => (
              <li key={perk}>{perk}</li>
            ))}
          </ul>
          <button
            type="button"
            onClick={startCheckout}
            disabled={isPro || status.checkout === 'loading'}
            style={{
              marginTop: '1rem',
              width: '100%',
              borderRadius: '0.9rem',
              border: 'none',
              padding: '0.9rem 1rem',
              background: '#fff',
              color: '#1d4ed8',
              fontWeight: 700,
              cursor: isPro ? 'not-allowed' : 'pointer',
              opacity: isPro ? 0.5 : 1,
            }}
          >
            {isPro ? 'Already on Pro' : status.checkout === 'loading' ? 'Redirecting…' : 'Upgrade to Pro'}
          </button>
          {isPro && formattedExpiry && (
            <p style={{ marginTop: '0.5rem', color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
              Your plan stays active until {formattedExpiry}.
            </p>
          )}
        </div>
      </div>

      <div style={{ border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.25rem', background: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <PlanBadge />
          {user ? <span style={{ color: 'var(--text-muted)' }}>{user.email}</span> : <span>Guest session</span>}
        </div>
        {profileLoading ? (
          <LoadingSpinner label="Checking plan…" />
        ) : (
          <>
            <p style={{ marginTop: 0, color: 'var(--text-muted)' }}>
              Manage your billing at any time through Stripe. If you cancel, you keep Pro access until the end of the paid period.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={openBillingPortal}
                disabled={!isPro || status.portal === 'loading'}
                style={{
                  borderRadius: '0.85rem',
                  border: '1px solid var(--border)',
                  padding: '0.75rem 1.2rem',
                  background: '#fff',
                  cursor: isPro ? 'pointer' : 'not-allowed',
                  opacity: isPro ? 1 : 0.6,
                }}
              >
                {status.portal === 'loading' ? 'Opening portal…' : 'Manage subscription'}
              </button>
              <button
                type="button"
                onClick={startDonation}
                style={{
                  borderRadius: '0.85rem',
                  border: 'none',
                  padding: '0.75rem 1.2rem',
                  background: 'rgba(239,68,68,0.15)',
                  color: '#b91c1c',
                }}
              >
                Donate $5 ❤️
              </button>
            </div>
            {!user && (
              <p style={{ color: 'var(--danger)', marginTop: '0.75rem' }}>
                Sign in to upgrade so we can connect Stripe to your account.
              </p>
            )}
            {status.error && <p style={{ color: 'var(--danger)', marginTop: '0.75rem' }}>{status.error}</p>}
          </>
        )}
      </div>
    </section>
  );
};

export default UpgradePage;
