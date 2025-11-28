const AddNoteForm = ({
  title,
  content,
  onChange,
  onSubmit,
  onCancel,
  disabled,
  limitReached,
  isPremium,
  error,
  loading,
}) => {
  const hasContent = Boolean(title.trim() || content.trim());

  return (
    <div className="notes-form-card">
      <div className="notes-form-header">
        <h2>New note</h2>
        <p>Capture quick thoughts, plans, or anything that matters.</p>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (!disabled && hasContent) {
            onSubmit();
          }
        }}
        className="notes-form"
      >
        <input
          type="text"
          name="title"
          placeholder="Title..."
          value={title}
          onChange={(event) => onChange('title', event.target.value)}
        />
        <textarea
          name="content"
          placeholder="Content..."
          rows={5}
          value={content}
          onChange={(event) => onChange('content', event.target.value)}
        />
        <div className="notes-form-actions">
          <div className="notes-form-meta">
            {limitReached && !isPremium && (
              <span className="notes-form-warning">Free plan limit reached (15 notes). Upgrade to add more.</span>
            )}
            {error && <span className="notes-form-error">{error}</span>}
          </div>
          <div className="notes-form-buttons">
            <button type="button" className="notes-btn secondary" onClick={onCancel}>
              Cancel
            </button>
            <button
              type="submit"
              className="notes-btn primary"
              disabled={!hasContent || disabled || loading}
            >
              {loading ? 'Adding…' : 'Add'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNoteForm;
