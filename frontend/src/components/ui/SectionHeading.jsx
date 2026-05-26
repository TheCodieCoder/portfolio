import { motion } from 'framer-motion';

const SectionHeading = ({ label, title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.6 }}
    className="text-center mb-14 md:mb-16"
  >
    {label && (
      <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
        {label}
      </span>
    )}
    <h2 className="heading-display">{title}</h2>
    {subtitle && <p className="mt-4 text-ink-muted max-w-2xl mx-auto text-lg">{subtitle}</p>}
  </motion.div>
);

export default SectionHeading;
