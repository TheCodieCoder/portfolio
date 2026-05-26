import SectionHeading from '../ui/SectionHeading';
import SkillCard from './SkillCard';
import { skills } from '../../data/portfolioData';

const SkillsCarousel = () => {
  const duplicated = [...skills, ...skills];

  return (
    <section id="skills" className="section-padding overflow-hidden">
      <SectionHeading
        label="Languages"
        title="Technical Skills"
        subtitle="Languages and databases extracted from my resume — mapped to real projects."
      />
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />
        <div className="overflow-hidden py-4">
          <div className="carousel-track">
            {duplicated.map((item, i) => (
              <SkillCard key={`${item.id}-${i}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsCarousel;
