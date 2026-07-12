import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const CHASSIS = "#1C2624";
const EDGE = "#2E3A37";
const SCREEN_BG = "#0C1413";
const ACCENT = "#7AF4CF";
const PERIWINKLE = "#9B8CFF";

/**
 * Live vector "dashboard" rendered directly into the MacBook screen
 * using three.js primitives — no textures, no PNGs.
 */
function LaptopScreenContent() {
  const barsRef = useRef<THREE.Group>(null);
  const lineRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (barsRef.current) {
      barsRef.current.children.forEach((bar, i) => {
        const target = 0.15 + Math.abs(Math.sin(t * 0.6 + i * 0.7)) * 0.55;
        bar.scale.y = THREE.MathUtils.lerp(bar.scale.y, target, 0.08);
        bar.position.y = -0.35 + (bar.scale.y * 0.5);
      });
    }
    if (lineRef.current) {
      lineRef.current.rotation.z = Math.sin(t * 0.3) * 0.02;
    }
  });

  const bars = Array.from({ length: 8 });

  return (
    <group position={[0, 0, 0.006]}>
      {/* Screen backdrop */}
      <mesh>
        <planeGeometry args={[2.34, 1.34]} />
        <meshBasicMaterial color={SCREEN_BG} />
      </mesh>

      {/* Emerald ambient glow */}
      <mesh position={[-0.6, 0.35, 0.001]}>
        <planeGeometry args={[1.2, 0.9]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.06} />
      </mesh>

      {/* Header card */}
      <mesh position={[-0.75, 0.5, 0.002]}>
        <planeGeometry args={[0.7, 0.18]} />
        <meshBasicMaterial color={"#1A2624"} />
      </mesh>
      <mesh position={[-0.95, 0.52, 0.003]}>
        <circleGeometry args={[0.035, 24]} />
        <meshBasicMaterial color={ACCENT} />
      </mesh>

      {/* Chart card (line) */}
      <mesh position={[0.35, 0.35, 0.002]}>
        <planeGeometry args={[1.4, 0.55]} />
        <meshBasicMaterial color={"#152020"} />
      </mesh>
      <mesh ref={lineRef} position={[0.35, 0.35, 0.003]}>
        <planeGeometry args={[1.2, 0.008]} />
        <meshBasicMaterial color={ACCENT} />
      </mesh>

      {/* Bars card */}
      <mesh position={[-0.55, -0.25, 0.002]}>
        <planeGeometry args={[0.9, 0.55]} />
        <meshBasicMaterial color={"#152020"} />
      </mesh>
      <group ref={barsRef} position={[-0.55, -0.25, 0.003]}>
        {bars.map((_, i) => (
          <mesh key={i} position={[-0.35 + i * 0.1, 0, 0]}>
            <planeGeometry args={[0.06, 0.5]} />
            <meshBasicMaterial color={i % 3 === 0 ? PERIWINKLE : ACCENT} />
          </mesh>
        ))}
      </group>

      {/* Stats card */}
      <mesh position={[0.55, -0.3, 0.002]}>
        <planeGeometry args={[0.7, 0.45]} />
        <meshBasicMaterial color={"#152020"} />
      </mesh>
      <mesh position={[0.55, -0.15, 0.003]}>
        <planeGeometry args={[0.55, 0.05]} />
        <meshBasicMaterial color={ACCENT} />
      </mesh>
      <mesh position={[0.55, -0.28, 0.003]}>
        <planeGeometry args={[0.4, 0.03]} />
        <meshBasicMaterial color={"#39514B"} />
      </mesh>
      <mesh position={[0.55, -0.38, 0.003]}>
        <planeGeometry args={[0.5, 0.03]} />
        <meshBasicMaterial color={"#39514B"} />
      </mesh>
    </group>
  );
}

export function MacBook() {
  return (
    <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.3}>
      <group rotation={[-0.15, -0.32, 0]}>
        {/* Base */}
        <RoundedBox args={[2.7, 0.1, 1.85]} radius={0.03} smoothness={4} position={[0, -0.6, 0]}>
          <meshStandardMaterial color={CHASSIS} metalness={0.9} roughness={0.32} />
        </RoundedBox>

        {/* Keyboard well hint */}
        <mesh position={[0, -0.549, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.3, 1.2]} />
          <meshStandardMaterial color={"#0F1615"} metalness={0.4} roughness={0.6} />
        </mesh>

        {/* Trackpad */}
        <mesh position={[0, -0.548, 0.65]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.9, 0.55]} />
          <meshStandardMaterial color={"#121B1A"} metalness={0.3} roughness={0.5} />
        </mesh>

        {/* Lid */}
        <group position={[0, 0.15, -0.9]} rotation={[-0.32, 0, 0]}>
          <RoundedBox args={[2.7, 1.6, 0.06]} radius={0.04} smoothness={4}>
            <meshStandardMaterial color={CHASSIS} metalness={0.9} roughness={0.32} />
          </RoundedBox>
          {/* Bezel */}
          <mesh position={[0, 0, 0.032]}>
            <planeGeometry args={[2.5, 1.44]} />
            <meshStandardMaterial color={"#050807"} roughness={0.4} />
          </mesh>
          <LaptopScreenContent />
        </group>
      </group>
    </Float>
  );
}

/* ---------- iPhone ---------- */

function PhoneScreenContent() {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ringRef.current) {
      const t = state.clock.elapsedTime;
      const s = 1 + Math.sin(t * 1.4) * 0.04;
      ringRef.current.scale.set(s, s, 1);
    }
  });
  return (
    <group position={[0, 0, 0.052]}>
      <mesh>
        <planeGeometry args={[0.72, 1.58]} />
        <meshBasicMaterial color={SCREEN_BG} />
      </mesh>
      {/* Dynamic island */}
      <mesh position={[0, 0.68, 0.001]}>
        <planeGeometry args={[0.22, 0.05]} />
        <meshBasicMaterial color={"#000"} />
      </mesh>
      {/* Balance ring */}
      <mesh ref={ringRef} position={[0, 0.25, 0.001]}>
        <ringGeometry args={[0.18, 0.22, 48]} />
        <meshBasicMaterial color={ACCENT} />
      </mesh>
      {/* Balance amount pill */}
      <mesh position={[0, 0.25, 0.002]}>
        <circleGeometry args={[0.16, 32]} />
        <meshBasicMaterial color={"#0F1817"} />
      </mesh>
      {/* Rows */}
      {[0, 1, 2, 3].map((i) => (
        <group key={i} position={[0, -0.15 - i * 0.16, 0.001]}>
          <mesh>
            <planeGeometry args={[0.62, 0.12]} />
            <meshBasicMaterial color={"#132020"} />
          </mesh>
          <mesh position={[-0.24, 0, 0.001]}>
            <circleGeometry args={[0.035, 20]} />
            <meshBasicMaterial color={i % 2 === 0 ? ACCENT : PERIWINKLE} />
          </mesh>
          <mesh position={[0.05, 0.015, 0.001]}>
            <planeGeometry args={[0.28, 0.02]} />
            <meshBasicMaterial color={"#4B605B"} />
          </mesh>
          <mesh position={[0.05, -0.02, 0.001]}>
            <planeGeometry args={[0.18, 0.015]} />
            <meshBasicMaterial color={"#2E3E3A"} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function IPhone() {
  return (
    <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.55}>
      <group position={[2.05, -0.3, 0.7]} rotation={[0.06, -0.38, 0.08]}>
        {/* Body */}
        <RoundedBox args={[0.88, 1.78, 0.1]} radius={0.13} smoothness={6}>
          <meshStandardMaterial color={EDGE} metalness={0.95} roughness={0.28} />
        </RoundedBox>
        {/* Screen glass */}
        <RoundedBox args={[0.78, 1.66, 0.02]} radius={0.1} smoothness={6} position={[0, 0, 0.05]}>
          <meshStandardMaterial color={"#050807"} roughness={0.15} metalness={0.1} />
        </RoundedBox>
        <PhoneScreenContent />
      </group>
    </Float>
  );
}

/* ---------- Apple Watch ---------- */

function WatchScreenContent() {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = -state.clock.elapsedTime * 0.6;
    }
  });
  return (
    <group position={[0, 0, 0.102]}>
      <mesh>
        <planeGeometry args={[0.6, 0.7]} />
        <meshBasicMaterial color={"#000"} />
      </mesh>
      {/* Activity ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.2, 0.028, 16, 64, Math.PI * 1.6]} />
        <meshStandardMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={1.6}
          roughness={0.2}
        />
      </mesh>
      {/* Secondary ring */}
      <mesh position={[0, 0, 0.001]}>
        <torusGeometry args={[0.14, 0.02, 16, 64, Math.PI * 1.2]} />
        <meshStandardMaterial
          color={PERIWINKLE}
          emissive={PERIWINKLE}
          emissiveIntensity={1.2}
          roughness={0.2}
        />
      </mesh>
      {/* Value bar */}
      <mesh position={[0, -0.28, 0.001]}>
        <planeGeometry args={[0.36, 0.03]} />
        <meshBasicMaterial color={"#39514B"} />
      </mesh>
    </group>
  );
}

export function AppleWatch() {
  return (
    <Float speed={2} rotationIntensity={0.35} floatIntensity={0.6}>
      <group position={[-2.05, -0.55, 0.7]} rotation={[0.08, 0.5, -0.04]}>
        {/* Case */}
        <RoundedBox args={[0.78, 0.92, 0.2]} radius={0.18} smoothness={6}>
          <meshStandardMaterial color={CHASSIS} metalness={0.95} roughness={0.25} />
        </RoundedBox>
        {/* Digital crown */}
        <mesh position={[0.4, 0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 0.06, 24]} />
          <meshStandardMaterial color={"#4A5F5A"} metalness={1} roughness={0.35} />
        </mesh>
        {/* Side button */}
        <mesh position={[0.4, -0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.025, 0.025, 0.12, 16]} />
          <meshStandardMaterial color={"#4A5F5A"} metalness={1} roughness={0.35} />
        </mesh>
        {/* Screen glass */}
        <RoundedBox args={[0.66, 0.78, 0.02]} radius={0.14} smoothness={6} position={[0, 0, 0.1]}>
          <meshStandardMaterial color={"#050807"} roughness={0.12} metalness={0.1} />
        </RoundedBox>
        {/* Band (top) */}
        <RoundedBox args={[0.55, 0.4, 0.1]} radius={0.06} smoothness={4} position={[0, 0.62, -0.02]}>
          <meshStandardMaterial color={"#141C1B"} roughness={0.85} metalness={0.05} />
        </RoundedBox>
        {/* Band (bottom) */}
        <RoundedBox args={[0.55, 0.4, 0.1]} radius={0.06} smoothness={4} position={[0, -0.62, -0.02]}>
          <meshStandardMaterial color={"#141C1B"} roughness={0.85} metalness={0.05} />
        </RoundedBox>
        <WatchScreenContent />
      </group>
    </Float>
  );
}
