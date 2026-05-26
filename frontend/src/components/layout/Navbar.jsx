import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ThemeToggle from '../ui/ThemeToggle';
import { useMagnetic } from '../../hooks/useMagnetic';

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/contact', label: 'Contact Me', end: false },
];

const NavItem = ({ to, label, end }) => {
  const magnetic = useMagnetic(0.25);

  return (
    <NavLink to={to} end={end} className="relative group">
      {({ isActive }) => (
        <motion.span
          ref={magnetic.ref}
          onMouseMove={magnetic.onMouseMove}
          onMouseLeave={magnetic.onMouseLeave}
          className="magnetic-target inline-block px-4 py-2 text-sm font-medium text-ink-muted hover:text-ink transition-colors"
          data-cursor="hover"
        >
          {label}
          {isActive && (
            <motion.span
              layoutId="nav-indicator"
              className="absolute -bottom-0.5 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
        </motion.span>
      )}
    </NavLink>
  );
};

const Navbar = () => {
  const location = useLocation();

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4"
    >
      <nav
        className="max-w-7xl mx-auto glass-panel rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between shadow-glass"
        aria-label="Main navigation"
      >
        <NavLink
          to="/"
          className="font-display font-bold text-lg tracking-tight text-gradient"
          data-cursor="hover"
        >
          MR
        </NavLink>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center" key={location.pathname}>
            {navItems.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
          </div>
          <ThemeToggle />
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
