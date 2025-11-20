import { useState } from 'react';
import TodoItem from './TodoItem.jsx';
import AddTodoInline from './AddTodoInline.jsx';
import UpgradeToPremium from '../Notes/UpgradeToPremium.jsx';

const TodoSection = ({
  label,
  type,
  items,
  isPremium,
  freeLimit,
  isFreeLimitReached,
  onAddItem,
  onToggleComplete,
  onDeleteItem,
  onUpdateTitle,
  onChangeColor,
  colorSavingId,
}) => {
  const [adding, setAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const startAdd = () => {
    if (isFreeLimitReached) {
      setError(`Free plan limit reached (${freeLimit} items). Upgrade to create more.`);
      return;
    }
    setError(null);
    setAdding(true);
    setNewTitle('');
  };

  const cancelAdd = () => {
    setAdding(false);
    setNewTitle('');
    setError(null);
  };

  const handleAdd = async () => {
    if (!newTitle.trim()) {
      setError('Title required');
      return;
    }
    setSaving(true);
    try {
      await onAddItem(type, newTitle.trim());
      setNewTitle('');
      setAdding(false);
      setError(null);
    } catch (err) {
      setError(err.message || 'Unable to add item.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="todo-section">
      <header>
        <h2>{label}</h2>
        <button type="button" className="todo-btn primary" onClick={startAdd}>
          + Add {label.replace(/s$/, '')}
        </button>
      </header>
      {error && (
        <div className="todo-alert">
          <p>{error}</p>
          {!isPremium && <UpgradeToPremium variant="compact" />}
        </div>
      )}

      {adding && (
        <AddTodoInline
          value={newTitle}
          onChange={setNewTitle}
          onSave={handleAdd}
          onCancel={cancelAdd}
          saving={saving}
        />
      )}

      {items.length === 0 && !adding ? (
        <p className="todo-empty">No items yet. Click “+ Add {label.replace(/s$/, '')}”.</p>
      ) : (
        <div className="todo-list">
          {items.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleComplete={onToggleComplete}
              onDelete={onDeleteItem}
              onUpdateTitle={onUpdateTitle}
              onChangeColor={onChangeColor}
              isPremium={isPremium}
              colorSaving={colorSavingId === todo.id}
            />
          ))}
        </div>
      )}
      {isFreeLimitReached && !adding && (
        <div className="todo-limit-message">
          <p>
            Free plan limit reached ({freeLimit} items). <br />Upgrade to keep this list growing.
          </p>
          <UpgradeToPremium variant="full" />
        </div>
      )}
    </section>
  );
};

export default TodoSection;
