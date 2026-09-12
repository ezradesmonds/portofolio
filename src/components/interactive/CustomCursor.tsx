import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import "./CustomCursor.css";

/**
 * Custom cursor that follows the pointer and rotates to point in the direction
 * of travel (so it "spins" smoothly when you move in circles).
 *
 * - A small dot tracks the pointer tightly.
 * - A ring lags behind with a spring.
 * - An arrow inside the ring rotates continuously toward the movement vector.
 * - The ring scales up when hovering interactive elements.
 *
 * Only enabled on fine-pointer devices and when reduced motion is not set.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Dot follows tightly, ring lags.
  const dotX = useSpring(cursorX, { stiffness: 1300, damping: 60, mass: 0.4 });
  const dotY = useSpring(cursorY, { stiffness: 1300, damping: 60, mass: 0.4 });
  const ringX = useSpring(cursorX, { stiffness: 220, damping: 26, mass: 0.8 });
  const ringY = useSpring(cursorY, { stiffness: 220, damping: 26, mass: 0.8 });

  // Continuous, unwrapped rotation so the arrow spins smoothly (no ±180° snap).
  const rotation = useMotionValue(0);
  const smoothRotation = useSpring(rotation, { stiffness: 260, damping: 30 });

  // Ring scale on hover.
  const hoverScale = useSpring(1, { stiffness: 300, damping: 24 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    let prevX = 0;
    let prevY = 0;
    let hasPrev = false;
    let lastRaw = 0;
    let accumulated = 0;

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (hasPrev) {
        const dx = e.clientX - prevX;
        const dy = e.clientY - prevY;
        if (Math.hypot(dx, dy) > 1.5) {
          const raw = Math.atan2(dy, dx) * (180 / Math.PI);
          let diff = raw - lastRaw;
          while (diff > 180) diff -= 360;
          while (diff < -180) diff += 360;
          lastRaw = raw;
          accumulated += diff;
          rotation.set(accumulated);
        }
      }
      prevX = e.clientX;
      prevY = e.clientY;
      hasPrev = true;
    };

    const isInteractive = (target: EventTarget | null): boolean =>
      target instanceof Element &&
      !!target.closest("a, button, input, textarea, select, [role='button'], [data-cursor-hover]");

    const onOver = (e: MouseEvent) => {
      if (isInteractive(e.target)) hoverScale.set(1.6);
    };
    const onOut = (e: MouseEvent) => {
      if (isInteractive(e.target)) hoverScale.set(1);
    };
    const onLeave = () => document.documentElement.classList.add("cursor-out");
    const onEnter = () => document.documentElement.classList.remove("cursor-out");

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor", "cursor-out");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [cursorX, cursorY, rotation, hoverScale]);

  if (!enabled) return null;

  return (
    <>
      <motion.div className="cur-dot" style={{ x: dotX, y: dotY }} aria-hidden="true" />
      <motion.div className="cur-ring" style={{ x: ringX, y: ringY, scale: hoverScale }} aria-hidden="true">
        <motion.div className="cur-arrow" style={{ rotate: smoothRotation }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h13" />
            <path d="m12 6 6 6-6 6" />
          </svg>
        </motion.div>
      </motion.div>
    </>
  );
}
