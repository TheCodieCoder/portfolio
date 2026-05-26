import SkillIcon from '../ui/SkillIcon';

const SkillCard = ({ item }) => (
  <article
    className="flex-shrink-0 w-[280px] sm:w-[300px] glass-panel rounded-2xl p-6 mx-3 group"
    style={{
      boxShadow: `0 0 0 1px ${item.color}22, 0 8px 32px ${item.color}11`,
    }}
    data-cursor="hover"
  >
    <div
      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{
        background: `linear-gradient(135deg, ${item.color}15, transparent)`,
      }}
    />
    <div
      className="relative rounded-xl p-3 mb-4 inline-block"
      style={{ border: `1px solid ${item.color}44`, boxShadow: `0 0 20px ${item.color}22` }}
    >
      <SkillIcon icon={item.icon} color={item.color} />
    </div>
    <h3 className="font-display text-lg font-semibold text-ink relative">{item.name}</h3>
    <p className="mt-3 text-sm text-ink-muted relative">Used in:</p>
    <ul className="mt-2 space-y-1 relative">
      {item.projects.map((p) => (
        <li key={p} className="text-sm text-ink/80 truncate">
          • {p}
        </li>
      ))}
    </ul>
    <div
      className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
      style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }}
    />
  </article>
);

export default SkillCard;
