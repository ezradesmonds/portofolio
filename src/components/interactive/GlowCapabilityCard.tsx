import { useEffect, useRef, useState, type CSSProperties } from "react";
import BorderGlow from "./BorderGlow";

interface Capability {
  name: string;
  items: { name: string; icon?: string }[];
}

export default function GlowCapabilityCard({ group }: { group: Capability }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(true);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isOutsideViewport = card.getBoundingClientRect().top > window.innerHeight;
    if (isOutsideViewport) setIsRevealed(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsRevealed(true);
        observer.unobserve(entry.target);
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

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
      <div ref={cardRef} className={`capability-card ${isRevealed ? "is-revealed" : "is-pending"} p-4 sm:p-6`}>
        <h3 className="text-xs sm:text-sm font-mono font-bold text-accent-cyan uppercase tracking-wider mb-3 sm:mb-4">
          {group.name}
        </h3>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {group.items.map((item, index) => (
            <span
              key={item.name}
              className="capability-chip group inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-text-secondary bg-white/5 border border-white/10 px-2 sm:px-2.5 py-1 rounded"
              style={{ "--chip-index": index } as CSSProperties}
            >
              {item.icon && (
                <img
                  src={`https://cdn.simpleicons.org/${item.icon}/F4FF72`}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="capability-logo h-3 w-3 sm:h-3.5 sm:w-3.5 object-contain"
                />
              )}
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </BorderGlow>
  );
}
