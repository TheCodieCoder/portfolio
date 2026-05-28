import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { education } from '../../data/portfolioData';
import { revealOnScroll } from '../../animations/gsapReveal';

const TimelineItem = ({ item, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`relative flex gap-6 md:gap-10 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      <div className="hidden md:flex flex-1" />
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          className={`w-5 h-5 rounded-full border-2 ${item.current
            ? 'border-accent bg-accent shadow-glow scale-125'
            : 'border-ink-muted/40 bg-surface-elevated'
            }`}
          animate={item.current ? { boxShadow: ['0 0 0 0 rgba(167,139,250,0.4)', '0 0 0 12px rgba(167,139,250,0)'] } : {}}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        {index < education.length - 1 && (
          <div className="w-px flex-1 min-h-[80px] bg-gradient-to-b from-accent/50 to-transparent mt-2" />
        )}
      </div>
      <div className="flex-1 pb-12 md:pb-16">
        <article
          className={`glass-panel rounded-2xl p-6 md:p-8 transition-all duration-500 ${item.current ? 'ring-2 ring-accent/40 shadow-glow' : 'hover:shadow-glass'
            }`}
          data-reveal
        >
          {item.current && (
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent mb-2">
              Current
            </span>
          )}
          <h3 className="font-display text-xl md:text-2xl font-semibold text-ink">{item.title}</h3>
          <p className="mt-2 text-accent font-medium">{item.institution}</p>
          <p className="mt-2 text-ink-muted text-sm">{item.period}</p>
          {item.detail && (
            <div
              className={`relative group/cgpa inline-block mt-3 px-3 py-1 rounded-full bg-accent-soft text-accent text-sm font-semibold ${item.id === 'jamia-hamdard'
                ? 'group/cgpa'
                : ''
                }`}
            >
              {item.detail}
              {item.id === 'btech' && (
                <div
                  className="
  absolute

  left-1/2
  -top-12
  -translate-x-1/2

  px-3
  py-2

  rounded-xl

  text-xs
  font-medium

  whitespace-nowrap

  opacity-0
  group-hover/cgpa:opacity-100

  translate-y-2
  group-hover/cgpa:translate-y-0

  transition-all
  duration-300

  bg-white
  dark:bg-[#111827]

  text-gray-700
  dark:text-gray-200

  border
  border-violet-200
  dark:border-violet-500/20

  shadow-[0_8px_30px_rgba(139,92,246,0.15)]
  dark:shadow-[0_8px_30px_rgba(139,92,246,0.25)]

  backdrop-blur-xl

  pointer-events-none

  z-30
  "
                >
                  CGPA updated through Semester V
                </div>
              )}
            </div>
          )}
        </article>
      </div>
    </motion.li>
  );
};

const Education = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    revealOnScroll('[data-reveal]', { y: 32 });
  }, []);

  return (
    <section id="education" ref={sectionRef} className="section-padding">
      <SectionHeading
        label="Education"
        title="Academic Journey"
        subtitle="A vertical timeline of my academic path — from school foundations to engineering excellence."
      />
      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-accent/30 via-accent/10 to-transparent hidden md:block" />
        <ol className="relative space-y-0">
          {education.map((item, index) => (
            <TimelineItem key={item.id} item={item} index={index} />
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Education;
