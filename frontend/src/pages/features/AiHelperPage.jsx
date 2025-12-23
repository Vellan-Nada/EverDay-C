import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import { sendAiPrompt } from '../../api/aiApi.js';
import styles from '../../styles/AiHelper.module.css';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';

const starterMessages = [
  {
    role: 'assistant',
    content: 'Hey! I am your Zenit AI helper. Ask about focus, planning, learning, or anything productivity related.',
    id: 'welcome',
  },
];

const examplePrompts = [
  'Design a weekly schedule that balances learning + health',
  'Break down a big habit into smaller wins',
  'Prep a Pomodoro plan for deep work',
];

const AiHelperPage = () => {
  const { token, user, planTier } = useAuth();
  const isPro = planTier === 'pro';
  const canUseAi = Boolean(user && token && isPro);
  const [messages, setMessages] = useState(starterMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendPrompt = async (prompt) => {
    if (!prompt.trim()) return;
    if (!canUseAi) {
      setError('Zenit Pro is required to use the AI helper.');
      return;
    }
    const userMessage = { role: 'user', content: prompt.trim(), id: `user-${Date.now()}` };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setError(null);
    try {
      setLoading(true);
      const { reply } = await sendAiPrompt(prompt.trim(), token);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply, id: `ai-${Date.now()}` }]);
    } catch (err) {
      console.error('AI helper error', err);
      setError(err.message || 'AI helper is unavailable right now.');
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'I had trouble replying. Please try again shortly.', id: `ai-error-${Date.now()}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendPrompt(input);
  };

  const handleExample = (text) => {
    sendPrompt(text);
  };

  return (
    <section className={styles.chatShell}>
      {!user && (
        <div className="info-toast">
          Responses stay in this tab only. Create an account to sync prompts and get priority processing.
        </div>
      )}
      {!isPro && (
        <div className="info-toast" style={{ background: 'rgba(249, 115, 22, 0.15)', color: '#b45309' }}>
          Zenit Pro unlocks the AI helper. Upgrade to Pro to access this space.
        </div>
      )}
      <div className={styles.messageList}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${message.role === 'user' ? styles.messageUser : styles.messageAi}`}
          >
            {message.content}
          </div>
        ))}
        {loading && <LoadingSpinner label="Thinking..." />}
        <div ref={endRef} />
      </div>
      <form className={styles.composer} onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask Zenit AI anything about productivity, habits, or learning..."
          disabled={!canUseAi}
        />
        <div className={styles.composerActions}>
          <button type="submit" className={styles.primary} disabled={loading || !canUseAi}>
            {loading ? 'Sending…' : 'Ask AI'}
          </button>
          <button type="button" className={styles.ghost} disabled={loading} onClick={() => setInput('')}>
            Clear
          </button>
          {error && <span style={{ color: 'var(--danger)' }}>{error}</span>}
        </div>
        <div className={styles.examples}>
          {examplePrompts.map((prompt) => (
            <button key={prompt} type="button" onClick={() => handleExample(prompt)} disabled={loading || !canUseAi}>
              {prompt}
            </button>
          ))}
        </div>
      </form>
    </section>
  );
};

export default AiHelperPage;
