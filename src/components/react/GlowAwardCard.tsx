import BorderGlow from "./BorderGlow";

interface Award {
  title: string;
  event: string;
  year: string;
  description: string;
}

export default function GlowAwardCard({ award }: { award: Award }) {
  return (
    <BorderGlow
      backgroundColor="#0A1324"
      borderRadius={16}
      glowColor="195 100 50"
      colors={["#F4FF72", "#FF6B35", "#3F8EFF"]}
      edgeSensitivity={30}
      glowRadius={25}
      glowIntensity={0.6}
      coneSpread={20}
    >
      <div className="p-4 sm:p-6">
        <div className="text-2xl sm:text-3xl font-bold text-accent-cyan font-mono mb-1 sm:mb-2">{award.title}</div>
        <div className="text-[10px] sm:text-xs font-mono text-text-muted uppercase tracking-wider mb-1">{award.year}</div>
        <h3 className="text-xs sm:text-sm font-semibold text-white mb-2 sm:mb-3">{award.event}</h3>
        <p className="text-[11px] sm:text-xs text-text-secondary leading-relaxed">{award.description}</p>
      </div>
    </BorderGlow>
  );
}
