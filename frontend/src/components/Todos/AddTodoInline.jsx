import { useEffect, useRef } from 'react';

const AddTodoInline = ({ value, onChange, onSave, onCancel, saving }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSave();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      onCancel();
    }
  };

  return (
    <div className="todo-add-inline">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Write something actionable…"
      />
      <div className="todo-add-actions">
        <button type="button" className="todo-btn ghost" onClick={onCancel}>
          Cancel
        </button>
        <button
          type="button"
          className="todo-btn primary"
          onClick={onSave}
          disabled={!value.trim() || saving}
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default AddTodoInline;
