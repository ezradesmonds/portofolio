import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { smoothstep } from "./easing";
import type { ScrollState } from "./useScrollProgress";

/**
 * Glowing 3D name, rendered with drei's troika <Text>. Bright lime fill +
 * white wireframe-style outline; the Bloom pass turns the bright pixels into
 * the soft glow. Fades/shrinks with the same funnel curve as the hologram.
 */
export function NameBillboard({ progressRef }: { progressRef: React.RefObject<ScrollState> }) {
  const group = useRef<THREE.Group>(null!);
  const textRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const p = progressRef.current.progress;
    const appear = smoothstep(0.1, 0.28, p);
    const vanish = 1 - smoothstep(0.74, 0.85, p);
    const visible = appear * vanish;

    group.current.visible = visible > 0.001;
    group.current.scale.setScalar(0.94 + 0.06 * appear - 0.16 * (1 - vanish));
    group.current.position.y = 2.75 + Math.sin(state.clock.elapsedTime * 0.6) * 0.05;

    // troika creates its material asynchronously; keep opacity/toneMapped synced
    // each frame (cheap, and safe to set before the material exists).
    const material = textRef.current?.material as THREE.MeshBasicMaterial | undefined;
    if (material) {
      material.opacity = visible;
      material.transparent = true;
      material.depthWrite = false;
      material.toneMapped = false;
    }
  });

  return (
    <group ref={group} position={[0, 2.75, 0.2]}>
      <Text
        ref={textRef}
        text="Ezra Desmond"
        fontSize={0.46}
        letterSpacing={0.05}
        color="#F4FF72"
        outlineWidth={0.014}
        outlineColor="#ffffff"
        outlineBlur={0.03}
        anchorX="center"
        anchorY="middle"
        textAlign="center"
      />
    </group>
  );
}
