import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The one object every animated system reads from. It is deliberately a
 * mutable object (not React state) so that the R3F `useFrame` loop can sample
 * it at 60fps without triggering a single React re-render.
 */
export interface ScrollProgressHandle {
  /** Normalized scroll progress, 0 (top) → 1 (end of the pinned intro). */
  value: number;
}

export interface UseScrollProgressOptions {
  /** If false the intro is skipped entirely (reduced-motion / mobile / no WebGL). */
  enabled: boolean;
  /** Pin length as a percentage of the viewport (defaults to 300% = 3 screens). */
  end?: string;
  /** Fires every scroll tick with the current normalized progress (used for the crossfade). */
  onProgress?: (progress: number) => void;
  /** Fires once when the intro reaches the end (unmount the WebGL canvas). */
  onComplete?: () => void;
  /** Fires once if the user scrolls back before the end (re-mount the canvas). */
  onUncomplete?: () => void;
}

/**
 * Single scroll listener driving the entire intro.
 *
 * It pins `triggerRef`'s element in place, scrubs a 0→1 proxy tween 1:1 with
 * scroll, and exposes that value through the returned ref. There is exactly
 * ONE ScrollTrigger here — no competing `window.scroll` listeners anywhere.
 */
export function useScrollProgress(
  triggerRef: React.RefObject<HTMLElement | null>,
  options: UseScrollProgressOptions,
) {
  const { enabled, end = "+=300%", onProgress, onComplete, onUncomplete } = options;

  const progressRef = useRef<ScrollProgressHandle>({ value: 0 });

  // Keep the latest callbacks in refs so the effect doesn't need to resubscribe
  // when the parent re-renders with new inline callbacks.
  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const onUncompleteRef = useRef(onUncomplete);
  onUncompleteRef.current = onUncomplete;

  useEffect(() => {
    if (!enabled) return;
    const trigger = triggerRef.current;
    if (!trigger) return;

    const progress = progressRef.current;
    let completed = false;

    // The tween is only a carrier for ScrollTrigger; `self.progress` (linear,
    // 1:1 with scroll) is the authoritative value read by everything else.
    const tween = gsap.to(progress, {
      value: 1,
      ease: "none",
      scrollTrigger: {
        trigger,
        start: "top top",
        end,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          onProgressRef.current?.(self.progress);
          if (self.progress >= 0.999) {
            if (!completed) {
              completed = true;
              onCompleteRef.current?.();
            }
          } else if (completed) {
            completed = false;
            onUncompleteRef.current?.();
          }
        },
      },
    });

    // Keep ScrollTrigger in sync with Lenis smooth scrolling (installed by
    // SmoothScroll.astro and exposed as window.__lenis).
    const lenis = (window as unknown as {
      __lenis?: { on: (event: string, fn: () => void) => void };
    }).__lenis;
    if (lenis) {
      lenis.on("scroll", () => ScrollTrigger.update());
    }

    // Recalculate pin distances once fonts/layout have settled.
    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 250);

    return () => {
      window.clearTimeout(refreshId);
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [enabled, end, triggerRef]);

  return progressRef;
}
