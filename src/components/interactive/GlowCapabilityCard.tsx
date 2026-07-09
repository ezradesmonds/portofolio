import BorderGlow from "./BorderGlow";

interface Capability {
  name: string;
  items: { name: string }[];
}

export default function GlowCapabilityCard({ group }: { group: Capability }) {
  return (
    <BorderGlow
      backgroundColor="#0A1324"
      borderRadius={16}
      glowColor="195 100 50"
      colors={["#F4FF72", "#FF6B35", "#3F8EFF"]}
      edgeSensitivity={30}
      glowRadius={25}
      glowIntensity={0.5}
      coneSpread={18}
    >
      <div className="p-4 sm:p-6">
        <h3 className="text-xs sm:text-sm font-mono font-bold text-accent-cyan uppercase tracking-wider mb-3 sm:mb-4">
          {group.name}
        </h3>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {group.items.map((item) => (
            <span key={item.name} className="text-[10px] sm:text-xs font-mono text-text-secondary bg-white/5 border border-white/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded">
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </BorderGlow>
  );
}
