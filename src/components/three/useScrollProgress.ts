import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface ScrollState {
  progress: number;
}

export interface UseScrollProgressOptions {
  /**
   * Scroll distance for the whole sequence, measured from the top of the
   * pinned section. Defaults to `+=300%` => a 300vh "wrapper" while a 100vh
   * section stays pinned. This is the single knob for how long the dolly
   * takes.
   */
  end?: string;
  /** Pin the trigger for the duration (fixed while scrolling). */
  pin?: boolean;
  /** When true, no trigger is created and progress stays at its initial. */
  disabled?: boolean;
  /** Called every scrub tick with the normalized 0..1 progress. */
  onUpdate?: (progress: number) => void;
  /** Called when scrolling leaves the pinned section (progress reaches 1). */
  onLeave?: () => void;
  /** Called when scrolling back up into the pinned section. */
  onEnterBack?: () => void;
}

/**
 * Single source of truth for the hero sequence.
 *
 * Exactly ONE ScrollTrigger (`scrub: true`, so it tracks scroll 1:1 with no
 * smoothing lag) drives camera position/FOV, hologram opacity/scale, the
 * monitor screen-fill scale and the WebGL -> DOM cross-fade. The normalized
 * value is written into `progressRef` each tick so the render loop can read it
 * without creating any competing scroll listener, and the same value is
 * mirrored through `onUpdate` for DOM-side work (the cross-fade overlay).
 */
export function useScrollProgress(
  triggerRef: React.RefObject<HTMLElement | null>,
  options: UseScrollProgressOptions = {},
) {
  const { end = "+=300%", pin = true, disabled = false, onUpdate, onLeave, onEnterBack } = options;
  const progressRef = useRef(0);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger || disabled) {
      progressRef.current = 0;
      return;
    }

    // Sync with the Lenis instance created by SmoothScroll.astro so
    // ScrollTrigger repaints on Lenis's smoothed scroll rather than waiting
    // for the native scroll event (avoids one-frame lag / rubber-banding).
    const lenis = (window as unknown as {
      __lenis?: { on: (e: string, cb: () => void) => void; off?: (e: string, cb: () => void) => void };
    }).__lenis;
    const onLenisScroll = () => ScrollTrigger.update();
    if (lenis) lenis.on("scroll", onLenisScroll);

    const st = ScrollTrigger.create({
      trigger,
      start: "top top",
      end,
      pin,
      pinType: "fixed" as const,
      scrub: true, // 1:1 track — no scroll-jacking
      onUpdate: (self) => {
        progressRef.current = self.progress;
        onUpdate?.(self.progress);
      },
      onLeave: () => onLeave?.(),
      onEnterBack: () => onEnterBack?.(),
    });

    // Prime the first value so the render loop has a reading before scroll.
    st.update();

    return () => {
      st.kill();
      lenis?.off?.("scroll", onLenisScroll);
    };
  }, [triggerRef, end, pin, disabled, onUpdate, onLeave, onEnterBack]);

  return progressRef;
}
