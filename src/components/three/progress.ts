// ---------------------------------------------------------------------------
// Single source of truth for the scroll-progress → scene mapping.
//
// Every animated property (camera dolly, hologram fade, name fade, screen
// fill, and the WebGL→DOM crossfade) is derived from ONE normalized value
// `progress` (0 at the top of the pinned intro, 1 at the end). Tweak the
// numbers below to change *when* each beat happens and *how fast* it moves —
// you should never need to touch the components themselves.
// ---------------------------------------------------------------------------

export const clamp = (x: number, min: number, max: number): number =>
  Math.min(Math.max(x, min), max);

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

/** Hermite smoothstep in [edge0, edge1]. */
export const smoothstep = (edge0: number, edge1: number, x: number): number => {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

/** Ease in/out cubic — gives the dolly a natural "settle" feel. */
export const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// ---------------------------------------------------------------------------
// Beat thresholds (all in normalized progress space, 0 → 1).
// ---------------------------------------------------------------------------
export const PROGRESS = {
  /**
   * The camera dolly completes at 85% of the pin. The remaining 15% is the
   * "screen fills the frame + crossfade" transition, so the camera has fully
   * settled before the WebGL→DOM handoff.
   */
  dollyEnd: 0.85,

  /** Hologram fades/shrinks out of frame over this window. */
  hologramFadeOut: [0.35, 0.62] as const,

  /** The glowing name text fades out slightly earlier than the hologram. */
  nameFadeOut: [0.22, 0.5] as const,

  /** The monitor screen scales up to fill the viewport over this window. */
  screenFill: [0.82, 0.97] as const,

  /** WebGL canvas → DOM homepage crossfade over this window. */
  crossfade: [0.85, 0.995] as const,
};

// ---------------------------------------------------------------------------
// Camera path (dolly). Tune `start`/`end` to change the framing.
// ---------------------------------------------------------------------------
export const CAMERA = {
  // Wide establishing shot — frames the whole desk setup.
  start: {
    position: [0.4, 1.7, 6.5] as [number, number, number],
    lookAt: [0, 1.0, -0.2] as [number, number, number],
    fov: 52,
  },
  // Tight shot — camera pressed up against the monitor screen.
  end: {
    position: [0, 1.15, 0.85] as [number, number, number],
    lookAt: [0, 1.15, -0.35] as [number, number, number],
    fov: 74,
  },
};

// ---------------------------------------------------------------------------
// Monitor screen geometry — shared so the camera can aim at the same point the
// screen plane occupies (keeps the "fill" perfectly centered on the lens).
// ---------------------------------------------------------------------------
export const MONITOR_SCREEN_POSITION: [number, number, number] = [0, 1.15, -0.35];

/** World-space size of the monitor screen when it's at rest (before filling). */
export const SCREEN_SIZE = { width: 1.7, height: 0.96 };

// ---------------------------------------------------------------------------
// Hologram + name placement / sizing (tune here, not in JSX).
// ---------------------------------------------------------------------------
export const HOLOGRAM = {
  position: [2.05, 2.05, 0.1] as [number, number, number],
  /** Height of the portrait plane (width is derived from the 4:5 aspect). */
  height: 1.35,
};

export const NAME_TEXT = {
  position: [2.05, 1.15, 0.1] as [number, number, number],
};
