import SectionHeading from '../ui/SectionHeading';
import SkillCard from './SkillCard';
import { developerTools } from '../../data/portfolioData';

const ToolsCarousel = () => {
  const duplicated = [...developerTools, ...developerTools];

  return (
    <section id="tools" className="section-padding overflow-hidden">
      <SectionHeading
        label="Developer Tools"
        title="My Toolkit"
        subtitle="The tools I use daily to design, build, test, and ship software."
      />
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />
        <div className="overflow-hidden py-4">
          <div className="carousel-track" style={{ animationDirection: 'reverse', animationDuration: '45s' }}>
            {duplicated.map((item, i) => (
              <SkillCard key={`${item.id}-${i}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsCarousel;
