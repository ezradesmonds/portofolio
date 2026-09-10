import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { createHologramMaterial } from "./hologramShader";
import { smoothstep } from "./easing";
import type { ScrollState } from "./useScrollProgress";

/**
 * Vertical plane showing the portrait as a projected hologram.
 *
 * Scroll mapping (tune these edges to change WHEN it appears/disappears):
 *   appear  0.05 → 0.25   fade + grow in
 *   vanish  0.72 → 0.85   fade + shrink out of frame as the camera approaches
 *
 * `useTexture` suspends; parent wraps this in <Suspense> so the rest of the
 * desk renders immediately while the portrait streams in.
 */
export function HologramPlane({
  progressRef,
  portraitUrl,
}: {
  progressRef: React.RefObject<ScrollState>;
  portraitUrl: string;
}) {
  const texture = useTexture(portraitUrl);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;

  const material = useMemo(() => createHologramMaterial(texture), [texture]);
  const group = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const p = progressRef.current.progress;
    const appear = smoothstep(0.05, 0.25, p);
    const vanish = 1 - smoothstep(0.72, 0.85, p);
    const visible = appear * vanish;

    const uniforms = material.uniforms as unknown as {
      uTime: { value: number };
      uOpacity: { value: number };
    };
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uOpacity.value = visible;

    // Subtle idle float + a gentle rise/shrink as it funnels away.
    const t = state.clock.elapsedTime;
    const scale = 0.92 + 0.08 * appear - 0.22 * (1 - vanish);
    group.current.scale.setScalar(scale);
    group.current.position.y = 1.85 + Math.sin(t * 0.8) * 0.06 + (1 - vanish) * 0.5;
  });

  return (
    <group ref={group} position={[0.2, 1.85, 0.35]} renderOrder={5}>
      <mesh material={material} renderOrder={5}>
        <planeGeometry args={[1.15, 1.4]} />
      </mesh>
    </group>
  );
}
