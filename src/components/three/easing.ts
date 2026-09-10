// Small math helpers shared across the hero scene. Keeping these in one place
// makes the scroll→visual mappings easier to read and tune.

export const clamp01 = (x: number): number => (x < 0 ? 0 : x > 1 ? 1 : x);

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

/**
 * Standard smoothstep (Hermite). Used to shape every scroll-driven ramp so
 * fades/dollies ease in and out instead of snapping.
 */
export const smoothstep = (edge0: number, edge1: number, x: number): number => {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};
