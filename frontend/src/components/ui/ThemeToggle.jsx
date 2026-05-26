import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { useMagnetic } from '../../hooks/useMagnetic';

const ThemeToggle = () => {
  const { resolvedTheme, toggleTheme } = useTheme();
  const magnetic = useMagnetic(0.2);

  const isDark = resolvedTheme === 'dark';

  return (
    <motion.button
      ref={magnetic.ref}
      onMouseMove={magnetic.onMouseMove}
      onMouseLeave={magnetic.onMouseLeave}
      type="button"
      onClick={toggleTheme}
      className="magnetic-target relative w-11 h-11 rounded-full glass-panel flex items-center justify-center text-ink"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      data-cursor="hover"
      whileTap={{ scale: 0.92 }}
    >
      <motion.span
        key={isDark ? 'moon' : 'sun'}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="text-lg"
      >
        {isDark ? '🌙' : '☀️'}
      </motion.span>
    </motion.button>
  );
};

export default ThemeToggle;