import { useState } from 'react';
import ColorPickerPopover from './ColorPickerPopover.jsx';

const TodoItem = ({
  todo,
  onToggleComplete,
  onDelete,
  onUpdateTitle,
  onChangeColor,
  isPremium,
  colorSaving,
}) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);
  const [error, setError] = useState(null);
  const [showColors, setShowColors] = useState(false);

  const toggleComplete = () => {
    onToggleComplete(todo);
  };

  const startEdit = () => {
    setDraft(todo.title);
    setEditing(true);
    setError(null);
  };

  const saveEdit = async () => {
    if (!draft.trim()) {
      setError('Title cannot be empty.');
      return;
    }
    try {
      await onUpdateTitle(todo, draft.trim());
      setEditing(false);
      setError(null);
    } catch (err) {
      setError(err.message || 'Unable to save.');
    }
  };

  const handleColorSelect = async (color) => {
    try {
      await onChangeColor(todo, color);
      setShowColors(false);
    } catch (err) {
      setError(err.message || 'Unable to update color.');
    }
  };

  return (
    <div
      className={`todo-item ${todo.is_completed ? 'is-complete' : ''}`}
      style={{ background: todo.background_color || '#fff' }}
    >
      <button
        type="button"
        className={`todo-check ${todo.is_completed ? 'checked' : ''}`}
        onClick={toggleComplete}
        aria-label="Toggle completion"
      >
        {todo.is_completed ? '✔' : ''}
      </button>
      <div className="todo-body">
        {editing ? (
          <input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              saveEdit();
            } else if (e.key === 'Escape') {
              e.preventDefault();
              setEditing(false);
              setDraft(todo.title);
            }
          }} />
        ) : (
          <span>{todo.title}</span>
        )}
        {error && <p className="todo-inline-error">{error}</p>}
      </div>
      <div className="todo-actions">
        {editing ? (
          <>
            <button type="button" className="todo-btn ghost" onClick={() => { setEditing(false); setDraft(todo.title); setError(null); }}>
              Cancel
            </button>
            <button type="button" className="todo-btn primary" onClick={saveEdit}>
              Save
            </button>
          </>
        ) : (
          <>
            <button type="button" className="todo-btn ghost" onClick={startEdit}>
              Edit
            </button>
            <button type="button" className="todo-btn danger" onClick={() => onDelete(todo)}>
              Delete
            </button>
          </>
        )}
      </div>
      <div className="todo-color-control">
        <button
          type="button"
          className={`color-dot ${isPremium ? '' : 'locked'}`}
          style={{ background: todo.background_color || '#e2e8f0' }}
          onClick={() => setShowColors((prev) => !prev)}
        >
          {!isPremium && '🔒'}
        </button>
        {showColors && (
          <ColorPickerPopover
            isPremium={isPremium}
            onSelect={handleColorSelect}
            onClose={() => setShowColors(false)}
            disabledReason="Background colors are premium."
            saving={colorSaving}
          />
        )}
      </div>
    </div>
  );
};

export default TodoItem;
