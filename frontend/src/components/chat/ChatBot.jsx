import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { streamChat, getSessionId } from '../../utils/api';

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm Misbah's Bot. Ask me about my skills, projects, or education.",
    },
  ]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || streaming) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setStreaming(true);
    setTyping(true);

    let assistantText = '';
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    try {
      await streamChat({
        message: text,
        sessionId: getSessionId(),
        onChunk: (chunk) => {
          setTyping(false);
          assistantText += chunk;
          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = { role: 'assistant', content: assistantText };
            return next;
          });
        },
        onDone: () => {
          setStreaming(false);
          setTyping(false);
        },
        onError: (err) => {
          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = {
              role: 'assistant',
              content: err || 'Sorry, I could not respond right now.',
            };
            return next;
          });
          setStreaming(false);
          setTyping(false);
        },
      });
    } catch (err) {
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          role: 'assistant',
          content: err.message || 'Chat service is unavailable.',
        };
        return next;
      });
      setStreaming(false);
      setTyping(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-[60] flex flex-col items-start gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[min(100vw-2rem,380px)] h-[min(70vh,520px)] glass-panel rounded-2xl shadow-glass flex flex-col overflow-hidden"
          >
            <header className="px-4 py-3 border-b border-glass-border flex items-center justify-between bg-accent/5">
              <div>
                <p className="font-display font-semibold text-ink">Misbah&apos;s Bot</p>
                <p className="text-xs text-ink-muted">Powered by Gemini</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-ink-muted hover:text-ink p-1"
                aria-label="Close chat"
              >
                ✕
              </button>
            </header>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={`${msg.role}-${i}`}
                  className={`max-w-[90%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'ml-auto bg-gradient-to-r from-violet-600 to-cyan-600 text-white'
                      : 'glass-panel text-ink'
                  }`}
                >
                  {msg.content || (typing && i === messages.length - 1 ? '...' : '')}
                </div>
              ))}
              {typing && (
                <div className="glass-panel rounded-2xl px-4 py-3 w-16 flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
              <div ref={endRef} />
            </div>
            <form onSubmit={sendMessage} className="p-3 border-t border-glass-border flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my portfolio..."
                className="flex-1 px-3 py-2 rounded-xl bg-surface-elevated text-ink text-sm outline-none focus:ring-2 focus:ring-accent"
                disabled={streaming}
              />
              <button
                type="submit"
                disabled={streaming || !input.trim()}
                className="px-4 py-2 rounded-xl bg-accent text-white text-sm font-medium disabled:opacity-50"
              >
                Send
              </button>
            </form>
</motion.div>
)}
</AnimatePresence>

<motion.button
  type="button"
  onClick={() => setOpen((o) => !o)}
  className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-medium shadow-glow"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  aria-expanded={open}
  aria-label={open ? 'Close Misbah Bot' : 'Open Misbah Bot'}
  data-cursor="hover"
>
  <span className="text-lg">
    {open ? '✕' : '🤖'}
  </span>

  <span className="hidden sm:inline">
    Misbah&apos;s Bot
  </span>
</motion.button>

</div>
);
};

export default ChatBot;