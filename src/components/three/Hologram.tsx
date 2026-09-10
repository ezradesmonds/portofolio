import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture, Billboard } from "@react-three/drei";
import { createHologramMaterial } from "./hologramShader";

export type ProgressRef = React.RefObject<number>;

// Tuning: the scroll-progress window over which the hologram + name fade and
// shrink out of frame as the camera closes in on the monitor. Everything
// between FADE_START and FADE_END disappears; before FADE_START it is fully
// visible. (Phase 1 of the sequence runs 0 -> ~0.85.)
const FADE_START = 0.55;
const FADE_END = 0.82;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const clamp01 = (t: number) => Math.min(Math.max(t, 0), 1);

/**
 * Renders a name as a billboarded, glowing canvas texture (thin geometric
 * type). This avoids runtime font-fetching from troika-three-text so the
 * build stays fully offline-capable. Swap for drei `<Text>` + a .ttf/.glb if
 * you want real 3D extruded glyphs instead.
 */
function useNameTexture(name: string): THREE.Texture | null {
  return useMemo(() => {
    if (typeof document === "undefined") return null;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const font = (px: number, weight: number) =>
      `${weight} ${px}px "JetBrains Mono", "Bricolage Grotesque", monospace`;

    // Measure at the largest size, then size the canvas to fit with padding
    // for the glow blur.
    const fontSize = 96;
    ctx.font = font(fontSize, 700);
    const metrics = ctx.measureText(name);
    const textWidth = metrics.width;
    const textHeight = fontSize * 1.3;
    const pad = fontSize * 0.6;

    canvas.width = Math.ceil((textWidth + pad * 2) * dpr);
    canvas.height = Math.ceil((textHeight + pad * 2) * dpr);
    ctx.scale(dpr, dpr);

    const cx = canvas.width / dpr / 2;
    const cy = canvas.height / dpr / 2;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Layered glow (Bloom also catches this, but a soft canvas halo keeps it
    // readable even if post-processing is disabled on low-end devices).
    const glow = "#3F8EFF";
    const fill = "#dff2ff";
    for (let i = 5; i > 0; i--) {
      ctx.font = font(fontSize, 700);
      ctx.shadowColor = glow;
      ctx.shadowBlur = i * 10;
      ctx.fillStyle = i === 1 ? fill : glow;
      ctx.fillText(name, cx, cy);
    }
    ctx.shadowBlur = 0;

    // Thin geometric under/over lines to sell the "wireframe" label look.
    ctx.strokeStyle = "rgba(244, 255, 114, 0.55)";
    ctx.lineWidth = 2;
    const w = textWidth * 0.9;
    ctx.beginPath();
    ctx.moveTo(cx - w / 2, cy - textHeight * 0.5);
    ctx.lineTo(cx + w / 2, cy - textHeight * 0.5);
    ctx.moveTo(cx - w / 2, cy + textHeight * 0.42);
    ctx.lineTo(cx + w / 2, cy + textHeight * 0.42);
    ctx.stroke();

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    tex.minFilter = THREE.LinearFilter;
    return tex;
  }, [name]);
}

interface HologramProps {
  portraitUrl: string;
  name: string;
  progress: ProgressRef;
}

export function Hologram({ portraitUrl, name, progress }: HologramProps) {
  const texture = useTexture(portraitUrl);
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const material = useMemo(() => createHologramMaterial(texture), [texture]);
  const nameTexture = useNameTexture(name);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = t;
    }

    const p = progress.current;
    // 1 -> 0 over [FADE_START, FADE_END], so the hologram/name melt away as
    // attention funnels onto the monitor screen.
    const fade = 1 - easeInOutCubic(clamp01((p - FADE_START) / (FADE_END - FADE_START)));
    if (matRef.current) {
      matRef.current.uniforms.uOpacity.value = fade;
    }
    if (groupRef.current) {
      // Shrink slightly and pull up/away so it reads as "leaving the frame".
      groupRef.current.scale.setScalar(0.92 + fade * 0.08);
      groupRef.current.position.y = 0.0 - (1 - fade) * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={[0, 3.05, -0.5]}>
      {/* Portrait hologram — vertical plane with the custom shader. */}
      <mesh material={material} ref={(m) => (matRef.current = m ? (m.material as THREE.ShaderMaterial) : null)}>
        <planeGeometry args={[1.25, 1.56]} />
      </mesh>

      {/* Name billboard below the hologram. */}
      <Billboard position={[0, -1.12, 0.02]}>
        <mesh>
          <planeGeometry args={[2.6, 0.72]} />
          <meshBasicMaterial
            map={nameTexture}
            transparent
            opacity={1}
            toneMapped={false}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </Billboard>
    </group>
  );
}
