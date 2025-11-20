import { useEffect, useState } from 'react';
import IconPicker from './IconPicker.jsx';

const defaultState = { name: '', icon_key: '', initialStatus: 'completed' };

const AddHabitModal = ({ open, onClose, onSubmit, initialHabit, isPremium, limitReached }) => {
  const [form, setForm] = useState(defaultState);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialHabit) {
      setForm({ name: initialHabit.name || '', icon_key: initialHabit.icon_key || '', initialStatus: 'completed' });
    } else {
      setForm(defaultState);
    }
  }, [initialHabit]);

  if (!open) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name.trim()) return;
    setSaving(true);
    await onSubmit({ ...form, id: initialHabit?.id });
    setSaving(false);
  };

  return (
    <div className="habit-modal-backdrop" role="dialog" aria-modal="true">
      <form className="habit-modal" onSubmit={handleSubmit}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2>{initialHabit ? 'Edit Habit' : 'Add Habit'}</h2>
          <button type="button" onClick={onClose} style={{ border: 'none', background: 'transparent', fontSize: '1.2rem' }}>
            ✕
          </button>
        </div>
        {limitReached && !initialHabit && (
          <p style={{ color: 'var(--danger)', fontSize: '0.9rem' }}>
            Free plan limit reached (10 habits). Upgrade to add more.
          </p>
        )}
        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <span>Name</span>
          <input
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Morning stretch"
            style={{ borderRadius: '0.75rem', border: '1px solid var(--border)', padding: '0.7rem' }}
            disabled={limitReached && !initialHabit}
          />
        </label>
        <div>
          <p style={{ marginBottom: '0.35rem' }}>Icon</p>
          <IconPicker value={form.icon_key} onChange={(icon) => setForm((prev) => ({ ...prev, icon_key: icon }))} isPremium={isPremium} />
        </div>
        {!initialHabit && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <span>Today's status</span>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <input
                  type="radio"
                  name="initialStatus"
                  value="completed"
                  checked={form.initialStatus === 'completed'}
                  onChange={handleChange}
                  disabled={limitReached}
                />
                Completed (✔)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <input
                  type="radio"
                  name="initialStatus"
                  value="failed"
                  checked={form.initialStatus === 'failed'}
                  onChange={handleChange}
                  disabled={limitReached}
                />
                Failed (✖)
              </label>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Choose how today should start for this habit. You can change it later.
            </p>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
          <button type="button" className="secondaryButton" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" disabled={limitReached && !initialHabit} style={{ border: 'none', borderRadius: '0.75rem', background: 'var(--accent)', color: '#fff', padding: '0.6rem 1.1rem' }}>
            {saving ? 'Saving…' : initialHabit ? 'Save changes' : 'Create habit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHabitModal;
