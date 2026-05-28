import SkillIcon from '../ui/SkillIcon';

const SkillCard = ({ item }) => (
  <article
    className="flex-shrink-0 w-[280px] sm:w-[300px] rounded-2xl p-6 mx-3 group relative overflow-hidden bg-white/80 dark:bg-[#070B14]/80 transition-all duration-500 hover:-translate-y-2 "
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
    <div className="flex items-center justify-between gap-3 relative">

      <h3
        className="
font-display
text-lg
font-semibold
text-gray-900 dark:text-white
"
      >
        {item.name}
      </h3>

      <div
        className="
px-3
py-1

rounded-full

text-[11px]
font-semibold
tracking-wide
text-gray-900 dark:text-white

backdrop-blur-xl

border

transition-all
duration-300

group-hover:scale-105
group-hover:shadow-lg
"
        style={{
          background:
            `linear-gradient(
135deg,
${item.color}18,
${item.color}08
)`,

          border:
            `1px solid ${item.color}55`,

          boxShadow:
            `0 0 18px ${item.color}20`,

          backdropFilter: "blur(12px)",
        }}
      >
        {item.proficiency}
      </div>

    </div>
    <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 relative">Used in:</p>
    <ul className="mt-2 space-y-1 relative">
      {item.projects.map((p) => (
        <li key={p} className="text-sm text-gray-700 dark:text-gray-300 truncate">
          • {p}
        </li>
      ))}
    </ul>

    <div
      className="
  absolute
  inset-0

  opacity-0
  group-hover:opacity-100
  group-focus:opacity-100

  translate-y-6
  group-hover:translate-y-0
  group-focus:translate-y-0

  transition-all
  duration-500

  bg-white
  dark:bg-black/85
  text-gray-900
  dark:text-white

  backdrop-blur-2xl

  border
  border-black/5
  dark:border-white/10

  p-5

  overflow-y-auto custom-scrollbar

  z-20
  pointer-events-none
  "
    >

      <div className="flex items-center gap-3 mb-4">

        <div
          className="
      w-2
      h-2
      rounded-full
      "
          style={{
            background: item.color,
            boxShadow: `0 0 12px ${item.color}`
          }}
        />

        <h4
          className="
      text-sm
      font-semibold
      tracking-wide

      text-gray-900
      dark:text-white
      "
        >
          Comfortable With
        </h4>

      </div>

      <div className="flex flex-wrap gap-2">

        {item.concepts?.map(
          (concept, index) => (

            <div
              key={index}

              className="
          px-3
          py-1.5

          rounded-full

          text-xs
          font-medium

          text-gray-800
          dark:text-white

          backdrop-blur-md

          transition-all
          duration-300

          hover:scale-105
          "
              style={{
                background:
                  `linear-gradient(
                135deg,
                ${item.color}15,
                ${item.color}08
              )`,

                border:
                  `1px solid ${item.color}33`,

                boxShadow:
                  `0 0 12px ${item.color}15`
              }}
            >
              {concept}
            </div>

          )
        )}

      </div>

    </div>
    <div
      className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
      style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }}
    />
  </article>
);

export default SkillCard;
