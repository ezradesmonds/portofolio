import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import {
  MONITOR_SCREEN_POSITION,
  SCREEN_SIZE,
  PROGRESS,
  lerp,
  smoothstep,
} from "./progress";
import type { ScrollProgressHandle } from "../../hooks/useScrollProgress";

/**
 * Low-poly desk scene built entirely from primitives so it stays light and
 * can be swapped for a custom `.glb` later (see the note in HeroSceneCanvas).
 *
 * The monitor *screen* plane is animated here: as scroll progress approaches
 * the end it scales up to exactly cover the camera frustum, so the last ~15%
 * of the intro reads as "the camera passed through the glass".
 */

interface DeskSetupProps {
  progressRef: React.RefObject<ScrollProgressHandle>;
}

// Shared palette (matches the site's dark base + neon accents).
const COLORS = {
  deskTop: "#12150c",
  deskEdge: "#0b0d08",
  metal: "#2a2f1e",
  dark: "#1a1d12",
  monitorBody: "#0d0f09",
  screen: "#06080c",
  screenGlow: "#123a5c",
  pcBody: "#181b10",
  accentBlue: "#3f8eff",
  accentCyan: "#f4ff72",
  plant: "#3c5a34",
  pot: "#2b2417",
};

function Desk({ children }: { children?: React.ReactNode }) {
  return (
    <group>
      {/* Desktop surface */}
      <RoundedBox args={[4.4, 0.14, 2.0]} radius={0.03} position={[0, 0.72, 0]}>
        <meshStandardMaterial color={COLORS.deskTop} roughness={0.6} metalness={0.15} />
      </RoundedBox>
      {/* Legs */}
      {[
        [-2.0, -1.75],
        [2.0, -1.75],
        [-2.0, 1.75],
        [2.0, 1.75],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.36, z]}>
          <boxGeometry args={[0.08, 0.72, 0.08]} />
          <meshStandardMaterial color={COLORS.metal} roughness={0.5} metalness={0.6} />
        </mesh>
      ))}
      {children}
    </group>
  );
}

function PCTower() {
  return (
    <group position={[-1.85, 0, -0.35]}>
      <RoundedBox args={[0.55, 1.1, 1.4]} radius={0.03} position={[0, 0.55, 0]}>
        <meshStandardMaterial color={COLORS.pcBody} roughness={0.7} metalness={0.3} />
      </RoundedBox>
      {/* Front LED strip */}
      <mesh position={[0.285, 0.72, 0]}>
        <boxGeometry args={[0.02, 0.5, 0.04]} />
        <meshBasicMaterial color={COLORS.accentBlue} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Keyboard() {
  return (
    <group position={[0.35, 0.8, 0.55]}>
      <RoundedBox args={[1.1, 0.06, 0.36]} radius={0.02}>
        <meshStandardMaterial color={COLORS.dark} roughness={0.8} />
      </RoundedBox>
      {/* key caps (thin grid) */}
      {[-0.4, -0.13, 0.13, 0.4].map((x) => (
        <mesh key={x} position={[x, 0.045, 0]}>
          <boxGeometry args={[0.2, 0.03, 0.3]} />
          <meshStandardMaterial color="#232618" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function Mouse() {
  return (
    <group position={[1.15, 0.72, 0.55]}>
      <RoundedBox args={[0.18, 0.05, 0.28]} radius={0.05}>
        <meshStandardMaterial color={COLORS.dark} roughness={0.7} />
      </RoundedBox>
    </group>
  );
}

function Lamp() {
  return (
    <group position={[-1.6, 0, 0.7]}>
      {/* base + arm */}
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.16, 0.18, 0.04, 20]} />
        <meshStandardMaterial color={COLORS.metal} roughness={0.4} metalness={0.7} />
      </mesh>
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.85, 12]} />
        <meshStandardMaterial color={COLORS.metal} roughness={0.4} metalness={0.7} />
      </mesh>
      {/* head */}
      <group position={[0, 0.95, 0.1]} rotation={[0.6, 0, 0]}>
        <mesh>
          <coneGeometry args={[0.22, 0.3, 20]} />
          <meshStandardMaterial color="#d9a441" roughness={0.5} emissive="#ff9a3c" emissiveIntensity={0.4} />
        </mesh>
        <pointLight color="#ffcf7a" intensity={8} distance={4} decay={2} />
      </group>
    </group>
  );
}

function Plant() {
  return (
    <group position={[1.95, 0, 0.35]}>
      {/* pot */}
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.2, 0.16, 0.44, 16]} />
        <meshStandardMaterial color={COLORS.pot} roughness={0.9} />
      </mesh>
      {/* leaves (low-poly blobs) */}
      {[
        [0, 0.7, 0],
        [-0.12, 0.55, 0.05],
        [0.12, 0.6, -0.04],
        [0.02, 0.5, -0.12],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <icosahedronGeometry args={[0.18, 1]} />
          <meshStandardMaterial color={COLORS.plant} roughness={0.9} flatShading />
        </mesh>
      ))}
    </group>
  );
}

/** The monitor — static bezel + stand, and the animated screen plane. */
function Monitor({ progressRef }: DeskSetupProps) {
  const screenRef = useRef<THREE.Mesh>(null);
  const camera = useThree((state) => state.camera);

  useFrame(() => {
    const screen = screenRef.current;
    if (!screen) return;

    const progress = progressRef.current.value;
    // Screen fills the viewport over the final stretch (see PROGRESS.screenFill).
    const fill = smoothstep(PROGRESS.screenFill[0], PROGRESS.screenFill[1], progress);

    // Compute the exact world-space size needed to cover the camera frustum at
    // the screen's distance, so the fill is pixel-perfect on any viewport.
    const cam = camera as THREE.PerspectiveCamera;
    const screenPos = new THREE.Vector3();
    screen.getWorldPosition(screenPos);
    const dist = cam.position.distanceTo(screenPos);
    const halfH = Math.tan(THREE.MathUtils.degToRad(cam.fov) / 2) * dist;
    const fullH = halfH * 2;
    const fullW = fullH * cam.aspect;

    // 1.05 margin so the plane slightly overshoots the frame (no edge gap).
    const targetX = (fullW / SCREEN_SIZE.width) * 1.05;
    const targetY = (fullH / SCREEN_SIZE.height) * 1.05;

    screen.scale.set(lerp(1, targetX, fill), lerp(1, targetY, fill), 1);
  });

  return (
    <group>
      {/* Bezel frame (sits behind the screen) */}
      <RoundedBox args={[1.86, 1.1, 0.06]} radius={0.02} position={[0, 1.15, -0.38]}>
        <meshStandardMaterial color={COLORS.monitorBody} roughness={0.5} metalness={0.3} />
      </RoundedBox>

      {/* Screen plane — the "portal" that fills the frame */}
      <mesh
        ref={screenRef}
        position={MONITOR_SCREEN_POSITION}
        scale={[SCREEN_SIZE.width, SCREEN_SIZE.height, 1]}
      >
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={COLORS.screen}
          emissive={COLORS.screenGlow}
          emissiveIntensity={0.5}
          roughness={0.2}
        />
      </mesh>

      {/* Stand */}
      <mesh position={[0, 0.82, -0.38]}>
        <boxGeometry args={[0.08, 0.32, 0.08]} />
        <meshStandardMaterial color={COLORS.metal} roughness={0.5} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0.67, -0.38]}>
        <boxGeometry args={[0.5, 0.04, 0.34]} />
        <meshStandardMaterial color={COLORS.monitorBody} roughness={0.6} />
      </mesh>
    </group>
  );
}

export function DeskSetup({ progressRef }: DeskSetupProps) {
  const floorRef = useRef<THREE.Mesh>(null);

  // Soft contact shadows ground the desk without the cost of shadow-mapping.
  const contactShadows = useMemo(() => null, []);

  return (
    <group>
      {/* Floor */}
      <mesh ref={floorRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -0.2]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#080a07" roughness={1} />
      </mesh>

      <Desk>
        <PCTower />
        <Keyboard />
        <Mouse />
      </Desk>
      <Lamp />
      <Plant />
      <Monitor progressRef={progressRef} />

      <ContactShadows
        position={[0, 0.001, 0]}
        opacity={0.5}
        scale={14}
        blur={2.4}
        far={3}
        resolution={256}
        color="#000000"
      />
      {contactShadows}
    </group>
  );
}
