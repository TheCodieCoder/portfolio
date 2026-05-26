import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { projects } from '../../data/portfolioData';

const ProjectPanel = ({ project, index, isActive, onSelect }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className={`relative cursor-pointer transition-all duration-500 ${isActive ? 'z-20 scale-[1.02]' : 'z-10 hover:scale-[1.01]'
        }`}
      onClick={() => onSelect(project.id)}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(project.id)}
      role="button"
      tabIndex={0}
      data-cursor="hover"
    >
      <div
        className={`glass-panel rounded-3xl p-6 md:p-8 overflow-hidden border transition-all duration-500 ${isActive ? 'border-accent/50 shadow-glow' : 'border-transparent'
          }`}
        style={{
          transform: `perspective(1200px) rotateY(${isActive ? 0 : index % 2 === 0 ? -2 : 2}deg)`,
        }}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-40 pointer-events-none`}
        />
        <div className="relative">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <span className="text-xs font-medium text-ink-muted uppercase tracking-wider">
                {project.period}
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-ink mt-1">
                {project.title}
              </h3>
            </div>
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-display font-bold"
              style={{ background: `${project.accent}22`, color: project.accent }}
            >
              {String(index + 1).padStart(2, '0')}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {isActive ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-ink-muted leading-relaxed mb-6">{project.description}</p>
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-sm font-semibold text-ink mb-2">Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full text-xs font-medium glass-panel"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-ink mb-2">Features</h4>
                    <ul className="space-y-1 text-sm text-ink-muted">
                      {project.features.map((f) => (
                        <li key={f}>• {f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm py-2 px-4"
                    onClick={(e) => e.stopPropagation()}
                    data-cursor="hover"
                  >
                    GitHub Repo
                  </a>
                  {
                    project.live ? (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost text-sm py-2 px-4"

                      >
                        Live Demo
                      </a>
                    ) : (
                      <span className="text-gray-400 cursor-not-allowed">
                        Live Demo Unavailable
                      </span>
                    )
                  }
                </div>
              </motion.div>
            ) : (
              <motion.p
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-ink-muted line-clamp-2"
              >
                {project.description}
              </motion.p>
            )}
          </AnimatePresence>

          <div
            className="mt-6 h-1 rounded-full overflow-hidden"
            style={{ background: `${project.accent}22` }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: project.accent }}
              initial={{ width: 0 }}
              animate={{ width: isActive ? '100%' : '30%' }}
              transition={{ duration: 0.6 }}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const Projects = () => {
  const [activeId, setActiveId] = useState(projects[0]?.id);

  return (
    <section id="projects" className="section-padding">
      <SectionHeading
        label="Projects"
        title="Featured Work"
        subtitle="Interactive timeline with floating glass panels — click to expand each project."
      />

      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/40 via-cyan-500/30 to-transparent md:-translate-x-1/2" />

        <div className="space-y-8 md:space-y-12 pl-4 md:pl-0">
          {projects.map((project, index) => (
            <div key={project.id} className="relative md:pl-12">
              <div
                className="absolute left-0 md:left-[calc(50%-6px)] top-8 w-3 h-3 rounded-full border-2 border-accent bg-surface z-10"
                style={{ boxShadow: `0 0 12px ${project.accent}` }}
              />
              <ProjectPanel
                project={project}
                index={index}
                isActive={activeId === project.id}
                onSelect={setActiveId}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
