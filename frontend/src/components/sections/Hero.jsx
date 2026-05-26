import { lazy, Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { profile, heroRoles } from '../../data/portfolioData';

const HeroScene = lazy(() => import('../hero/HeroScene'));

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = heroRoles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          const next = current.slice(0, displayText.length + 1);
          setDisplayText(next);
          if (next === current) {
            setTimeout(() => setDeleting(true), 1800);
          }
        } else {
          const next = current.slice(0, displayText.length - 1);
          setDisplayText(next);
          if (next === '') {
            setDeleting(false);
            setRoleIndex((i) => (i + 1) % heroRoles.length);
          }
        }
      },
      deleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [displayText, deleting, roleIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-16 section-padding overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full relative z-10 lg:translate-x-12">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-4">
            {profile.role}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
            Hi, I&apos;m{' '}
            <span className="text-gradient block sm:inline">{profile.name}</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-ink-muted max-w-xl leading-relaxed">
            {profile.tagline}
          </p>
          <div className="mt-6 h-8 font-display text-xl text-ink">
            <span className="text-accent">{displayText}</span>
            <span className="animate-pulse text-accent">|</span>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/contact" className="btn-primary" data-cursor="hover">
              Contact Me
            </Link>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              data-cursor="hover"
            >
              View GitHub
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          // className="lg:pl-20"
          className="relative"
        >
          <Suspense
            fallback={
              <div className="w-full h-[400px] flex items-center justify-center glass-panel rounded-3xl">
                <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              </div>
            }
          >
            <HeroScene />
          </Suspense>
        </motion.div>
      </div>

      <motion.a
        href="#education"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-muted hover:text-accent transition-colors"
        aria-label="Scroll to education"
        data-cursor="hover"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 rounded-full border-2 border-current flex justify-center pt-1.5"
        >
          <span className="w-1 h-2 rounded-full bg-current" />
        </motion.span>
      </motion.a>
    </section>
  );
};

export default Hero;
