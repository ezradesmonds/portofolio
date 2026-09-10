import { useMemo, useRef } from "react";
import * as THREE from "three";
import { ContactShadows } from "@react-three/drei";

/**
 * Low-poly desk setup built entirely from primitives (no external .glb).
 *
 * If you later swap in `/models/desk-setup.glb` via drei's `useGLTF`, this
 * component is the single place to replace. The only thing the rest of the
 * scene depends on is `DESK.screen` — the world-space center + size of the
 * monitor's screen plane — which the camera dolly targets and which the
 * cross-fade must fill. Keep those constants accurate to whatever model you
 * drop in.
 */

export const DESK = {
  /** Center of the monitor screen plane (world space). */
  screenPosition: new THREE.Vector3(0, 1.35, -0.2),
  /** Screen world size (16:9). */
  screenWidth: 2.6,
  screenHeight: 1.4625,
  /** Wide establishing camera. */
  cameraStart: new THREE.Vector3(0.9, 1.9, 7.2),
  /** FOV range used for the subtle dolly-zoom. */
  fovStart: 55,
  fovEnd: 42,
} as const;

// Palette pulled from the site's design tokens (global.css).
const COLORS = {
  deskTop: "#171A10",
  deskEdge: "#10120B",
  leg: "#0e110a",
  monitorBody: "#14160f",
  bezel: "#080a06",
  screen: "#0a1220",
  keyboard: "#1b1e14",
  keycap: "#24281a",
  mouse: "#1b1e14",
  tower: "#14160f",
  towerVent: "#0a0c07",
  ledCyan: "#F4FF72",
  ledBlue: "#3F8EFF",
  lamp: "#20251a",
  lampGlow: "#FF6B35",
  pot: "#2a2417",
  leaf: "#2f5d33",
  leafDark: "#1f4024",
} as const;

function DeskTop() {
  return (
    <group>
      {/* Surface */}
      <mesh position={[0, 0, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[4.4, 0.08, 1.7]} />
        <meshStandardMaterial color={COLORS.deskTop} roughness={0.6} metalness={0.15} />
      </mesh>
      {/* Legs */}
      {[
        [-2.05, -0.4, -0.85],
        [2.05, -0.4, -0.85],
        [-2.05, -0.4, 0.45],
        [2.05, -0.4, 0.45],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <boxGeometry args={[0.08, 0.72, 0.08]} />
          <meshStandardMaterial color={COLORS.leg} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function Monitor({ screenRef }: { screenRef: React.RefObject<THREE.Mesh | null> }) {
  const { screenPosition, screenWidth, screenHeight } = DESK;
  return (
    <group position={screenPosition.toArray() as [number, number, number]}>
      {/* Screen plane — the surface the camera flies into. The cross-fade
          targets this: when the camera reaches fill distance, this quad
          covers the viewport exactly and the DOM hero fades in over it. */}
      <mesh ref={screenRef} name="monitor-screen">
        <planeGeometry args={[screenWidth, screenHeight]} />
        <meshBasicMaterial color={COLORS.screen} toneMapped={false} />
      </mesh>

      {/* Bezel frame around the screen */}
      <mesh position={[0, 0, -0.03]} castShadow>
        <boxGeometry args={[screenWidth + 0.18, screenHeight + 0.18, 0.08]} />
        <meshStandardMaterial color={COLORS.bezel} roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Stand + base */}
      <mesh position={[0, -screenHeight / 2 - 0.18, -0.02]} castShadow>
        <boxGeometry args={[0.12, 0.36, 0.12]} />
        <meshStandardMaterial color={COLORS.monitorBody} roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[0, -screenHeight / 2 - 0.4, 0]} castShadow>
        <boxGeometry args={[0.9, 0.06, 0.45]} />
        <meshStandardMaterial color={COLORS.monitorBody} roughness={0.5} metalness={0.3} />
      </mesh>
    </group>
  );
}

function Keyboard() {
  return (
    <group position={[0, 0.045, 0.62]} rotation={[0, 0, 0]}>
      <mesh castShadow>
        <boxGeometry args={[0.95, 0.05, 0.32]} />
        <meshStandardMaterial color={COLORS.keyboard} roughness={0.7} />
      </mesh>
      {/* A few keycap hints for silhouette interest */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} position={[-0.38 + i * 0.15, 0.035, 0]} castShadow>
          <boxGeometry args={[0.12, 0.02, 0.11]} />
          <meshStandardMaterial color={COLORS.keycap} roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function Mouse() {
  return (
    <mesh position={[0.72, 0.05, 0.55]} rotation={[0, -0.3, 0]} castShadow>
      <boxGeometry args={[0.14, 0.05, 0.2]} />
      <meshStandardMaterial color={COLORS.mouse} roughness={0.5} metalness={0.1} />
    </mesh>
  );
}

function PcTower() {
  return (
    <group position={[1.78, 0, -0.35]}>
      <mesh castShadow position={[0, 0.45, 0]}>
        <boxGeometry args={[0.34, 0.9, 0.9]} />
        <meshStandardMaterial color={COLORS.tower} roughness={0.55} metalness={0.3} />
      </mesh>
      {/* Front vent lines */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} position={[0.175, 0.15 + i * 0.16, 0]} castShadow>
          <boxGeometry args={[0.01, 0.1, 0.5]} />
          <meshStandardMaterial color={COLORS.towerVent} roughness={0.9} />
        </mesh>
      ))}
      {/* Glowing accent strip (cyan/lime) */}
      <mesh position={[0.175, 0.85, 0]}>
        <boxGeometry args={[0.01, 0.04, 0.6]} />
        <meshStandardMaterial
          color={COLORS.ledCyan}
          emissive={COLORS.ledCyan}
          emissiveIntensity={2.4}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function DeskLamp() {
  return (
    <group position={[-1.55, 0.04, 0.15]}>
      {/* Base */}
      <mesh castShadow position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.22, 0.26, 0.06, 24]} />
        <meshStandardMaterial color={COLORS.lamp} roughness={0.5} metalness={0.4} />
      </mesh>
      {/* Arm */}
      <mesh castShadow position={[0, 0.32, 0]} rotation={[0, 0, -0.25]}>
        <cylinderGeometry args={[0.03, 0.03, 0.6, 12]} />
        <meshStandardMaterial color={COLORS.lamp} roughness={0.5} metalness={0.4} />
      </mesh>
      {/* Head */}
      <mesh castShadow position={[0.18, 0.56, 0.05]} rotation={[0.5, 0, -0.35]}>
        <coneGeometry args={[0.16, 0.28, 16]} />
        <meshStandardMaterial color={COLORS.lamp} roughness={0.5} metalness={0.4} />
      </mesh>
      {/* Bulb glow */}
      <mesh position={[0.26, 0.45, 0.12]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial
          color={COLORS.lampGlow}
          emissive={COLORS.lampGlow}
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>
      {/* Point light actually illuminating the desk */}
      <pointLight
        position={[0.26, 0.55, 0.22]}
        color={COLORS.lampGlow}
        intensity={6}
        distance={3}
        decay={2}
      />
    </group>
  );
}

function Plant() {
  const leaves = useMemo(
    () =>
      Array.from({ length: 7 }).map((_, i) => {
        const a = (i / 7) * Math.PI * 2;
        const r = 0.14 + (i % 3) * 0.06;
        return {
          position: [Math.cos(a) * r, 0.5 + (i % 3) * 0.09, Math.sin(a) * r] as [number, number, number],
          scale: 0.8 + (i % 3) * 0.25,
          tilt: (i % 2 === 0 ? 1 : -1) * 0.35,
          tiltZ: (i % 2 === 0 ? 1 : -1) * 0.3,
          color: i % 2 === 0 ? COLORS.leaf : COLORS.leafDark,
        };
      }),
    [],
  );

  return (
    <group position={[2.3, 0, -0.15]}>
      {/* Pot */}
      <mesh castShadow position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.22, 0.18, 0.36, 20]} />
        <meshStandardMaterial color={COLORS.pot} roughness={0.9} />
      </mesh>
      {/* Foliage */}
      {leaves.map((l, i) => (
        <mesh key={i} position={l.position} rotation={[l.tilt, 0, l.tiltZ]} scale={l.scale} castShadow>
          <coneGeometry args={[0.13, 0.5, 6]} />
          <meshStandardMaterial color={l.color} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

export interface DeskSceneProps {
  /** Screen plane mesh, forwarded so HeroScene can drive its fill scale. */
  screenRef: React.RefObject<THREE.Mesh | null>;
}

export function DeskScene({ screenRef }: DeskSceneProps) {
  return (
    <group>
      <DeskTop />
      <Monitor screenRef={screenRef} />
      <Keyboard />
      <Mouse />
      <PcTower />
      <DeskLamp />
      <Plant />

      {/* Cheap, soft contact shadows (no shadow-map tuning required). */}
      <ContactShadows
        position={[0, -0.95, 0]}
        opacity={0.55}
        scale={14}
        blur={2.4}
        far={4}
        resolution={512}
        color="#000000"
      />
    </group>
  );
}
