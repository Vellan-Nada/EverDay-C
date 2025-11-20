import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../lib/supabaseClient.js';
import { useAuth } from '../../hooks/useAuth.js';
import TodoSection from '../../components/Todos/TodoSection.jsx';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';
import '../../styles/Todos.css';

const SECTION_CONFIG = [
  { type: 'task', label: 'To Do', limit: 30 },
  { type: 'yearly', label: 'Yearly Goals', limit: 6 },
  { type: 'monthly', label: 'Monthly Goals', limit: 6 },
];

const TodoPage = () => {
  const { user, profile, authLoading, profileLoading } = useAuth();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [colorSavingId, setColorSavingId] = useState(null);

  const isPremium = Boolean(profile?.is_premium) || ['plus', 'pro'].includes(profile?.plan);
  const isFree = !isPremium;

  const grouped = useMemo(() => {
    return SECTION_CONFIG.reduce((acc, section) => {
      acc[section.type] = todos.filter((todo) => todo.type === section.type);
      return acc;
    }, {});
  }, [todos]);

  const counts = useMemo(() => {
    return SECTION_CONFIG.reduce((acc, section) => {
      acc[section.type] = grouped[section.type]?.length || 0;
      return acc;
    }, {});
  }, [grouped]);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setTodos([]);
      setLoading(false);
      return;
    }

    const fetchTodos = async () => {
      setLoading(true);
      try {
        const { data, error: fetchError } = await supabase
          .from('todos')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true });
        if (fetchError) throw fetchError;
        setTodos(data || []);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Unable to load your to-do list.');
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [authLoading, user]);

  const handleAdd = async (type, title) => {
    if (!user) throw new Error('Please sign in to add items.');
    const payload = {
      user_id: user.id,
      type,
      title,
    };
    const { data, error: insertError } = await supabase.from('todos').insert(payload).select().single();
    if (insertError) throw insertError;
    setTodos((prev) => [...prev, data]);
  };

  const handleToggleComplete = async (todo) => {
    const { data, error: updateError } = await supabase
      .from('todos')
      .update({ is_completed: !todo.is_completed, updated_at: new Date().toISOString() })
      .eq('id', todo.id)
      .select()
      .single();
    if (updateError) {
      console.error(updateError);
      return;
    }
    setTodos((prev) => prev.map((row) => (row.id === todo.id ? data : row)));
  };

  const handleDelete = async (todo) => {
    if (!window.confirm('Delete this item?')) return;
    const { error: deleteError } = await supabase.from('todos').delete().eq('id', todo.id);
    if (deleteError) {
      alert('Unable to delete item.');
      return;
    }
    setTodos((prev) => prev.filter((row) => row.id !== todo.id));
  };

  const handleUpdateTitle = async (todo, title) => {
    const { data, error: updateError } = await supabase
      .from('todos')
      .update({ title, updated_at: new Date().toISOString() })
      .eq('id', todo.id)
      .select()
      .single();
    if (updateError) throw updateError;
    setTodos((prev) => prev.map((row) => (row.id === todo.id ? data : row)));
  };

  const handleColorChange = async (todo, color) => {
    if (!isPremium) {
      return Promise.reject(new Error('Upgrade to change background color.'));
    }
    setColorSavingId(todo.id);
    try {
      const { data, error: updateError } = await supabase
        .from('todos')
        .update({ background_color: color, updated_at: new Date().toISOString() })
        .eq('id', todo.id)
        .select()
        .single();
      if (updateError) throw updateError;
      setTodos((prev) => prev.map((row) => (row.id === todo.id ? data : row)));
    } finally {
      setColorSavingId(null);
    }
  };

  if (authLoading || profileLoading) {
    return <LoadingSpinner label="Loading workspace…" />;
  }

  if (!user) {
    return <div className="todo-empty-state">Please sign in to manage your tasks.</div>;
  }

  return (
    <section className="todo-page">
      <header className="todo-page-header">
        <div>
          <p className="todo-subtitle">Plan the work. Crush the goals.</p>
          <h1>To-Do & Goals</h1>
        </div>
      </header>
      {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
      {loading ? (
        <LoadingSpinner label="Syncing your items…" />
      ) : (
        <div className="todo-panels">
          <div className="todo-panel">
            <TodoSection
              label="To Do"
              type="task"
              items={grouped.task || []}
              isPremium={isPremium}
              freeLimit={SECTION_CONFIG[0].limit}
              isFreeLimitReached={isFree && counts.task >= SECTION_CONFIG[0].limit}
              onAddItem={handleAdd}
              onToggleComplete={handleToggleComplete}
              onDeleteItem={handleDelete}
              onUpdateTitle={handleUpdateTitle}
              onChangeColor={handleColorChange}
              colorSavingId={colorSavingId}
            />
          </div>
          <div className="todo-panel goals">
            <TodoSection
              label="Yearly Goals"
              type="yearly"
              items={grouped.yearly || []}
              isPremium={isPremium}
              freeLimit={SECTION_CONFIG[1].limit}
              isFreeLimitReached={isFree && counts.yearly >= SECTION_CONFIG[1].limit}
              onAddItem={handleAdd}
              onToggleComplete={handleToggleComplete}
              onDeleteItem={handleDelete}
              onUpdateTitle={handleUpdateTitle}
              onChangeColor={handleColorChange}
              colorSavingId={colorSavingId}
            />
            <TodoSection
              label="Monthly Goals"
              type="monthly"
              items={grouped.monthly || []}
              isPremium={isPremium}
              freeLimit={SECTION_CONFIG[2].limit}
              isFreeLimitReached={isFree && counts.monthly >= SECTION_CONFIG[2].limit}
              onAddItem={handleAdd}
              onToggleComplete={handleToggleComplete}
              onDeleteItem={handleDelete}
              onUpdateTitle={handleUpdateTitle}
              onChangeColor={handleColorChange}
              colorSavingId={colorSavingId}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default TodoPage;
