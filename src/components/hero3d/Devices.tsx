import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * Photorealistic device set for Hero3D.
 *
 * - Bodies use `meshPhysicalMaterial` (PBR) with clearcoat + anisotropy for
 *   brushed aluminum / titanium.
 * - Screens are two-layer: a self-illuminated UI plane (React-driven vector
 *   content) + a thin `MeshTransmissionMaterial` glass slab on top for real
 *   refraction and reflections.
 * - All meshes cast + receive shadows so ContactShadows + SoftShadows read
 *   correctly. Ambient occlusion is contributed by the AO map from the HDRI
 *   environment and the contact-shadow pass in Hero3D.
 */

const ACCENT = "#7AF4CF";
const PERIWINKLE = "#9B8CFF";
const SCREEN_BG = "#0A100F";

/* ---------- Shared materials ---------- */

function AluminumMaterial({ color = "#C9CDCB" }: { color?: string }) {
  return (
    <meshPhysicalMaterial
      color={color}
      metalness={1}
      roughness={0.32}
      clearcoat={0.6}
      clearcoatRoughness={0.35}
      envMapIntensity={1.1}
      anisotropy={0.4}
    />
  );
}

function SpaceBlackMaterial() {
  return (
    <meshPhysicalMaterial
      color="#1B2321"
      metalness={1}
      roughness={0.38}
      clearcoat={0.5}
      clearcoatRoughness={0.4}
      envMapIntensity={0.9}
    />
  );
}

function TitaniumMaterial() {
  return (
    <meshPhysicalMaterial
      color="#3A4442"
      metalness={1}
      roughness={0.28}
      clearcoat={0.7}
      clearcoatRoughness={0.25}
      envMapIntensity={1.15}
    />
  );
}

function GlassOverlay({ width, height, radius }: { width: number; height: number; radius: number }) {
  // Thin refractive slab that sits ~1mm above the UI plane.
  return (
    <RoundedBox args={[width, height, 0.012]} radius={radius} smoothness={6}>
      <MeshTransmissionMaterial
        thickness={0.15}
        roughness={0.05}
        transmission={1}
        ior={1.45}
        chromaticAberration={0.02}
        anisotropy={0.1}
        distortion={0.0}
        distortionScale={0.1}
        temporalDistortion={0.0}
        backside={false}
        samples={6}
        resolution={256}
        color="#EAF7F2"
        attenuationColor="#DFF6EC"
        attenuationDistance={2.5}
      />
    </RoundedBox>
  );
}

/* =========================================================
   MacBook Pro
   ========================================================= */

function LaptopUI() {
  const barsRef = useRef<THREE.Group>(null);
  const lineRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (barsRef.current) {
      barsRef.current.children.forEach((bar, i) => {
        const target = 0.2 + Math.abs(Math.sin(t * 0.65 + i * 0.6)) * 0.55;
        bar.scale.y = THREE.MathUtils.lerp(bar.scale.y, target, 0.08);
        bar.position.y = -0.3 + bar.scale.y * 0.5;
      });
    }
    if (lineRef.current) lineRef.current.rotation.z = Math.sin(t * 0.35) * 0.02;
  });
  return (
    <group>
      <mesh>
        <planeGeometry args={[2.34, 1.34]} />
        <meshBasicMaterial color={SCREEN_BG} />
      </mesh>
      {/* Ambient tinted wash so the emissive UI looks lit from within */}
      <mesh position={[-0.55, 0.3, 0.001]}>
        <planeGeometry args={[1.2, 0.9]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.05} />
      </mesh>

      {/* Sidebar */}
      <mesh position={[-0.95, 0, 0.002]}>
        <planeGeometry args={[0.38, 1.2]} />
        <meshBasicMaterial color={"#101B19"} />
      </mesh>
      {[0.4, 0.2, 0, -0.2, -0.4].map((y, i) => (
        <mesh key={i} position={[-0.95, y, 0.003]}>
          <planeGeometry args={[0.28, 0.05]} />
          <meshBasicMaterial color={i === 0 ? ACCENT : "#2A3B37"} />
        </mesh>
      ))}

      {/* Header */}
      <mesh position={[0.15, 0.55, 0.002]}>
        <planeGeometry args={[1.55, 0.1]} />
        <meshBasicMaterial color={"#101B19"} />
      </mesh>

      {/* Line chart card */}
      <mesh position={[0.15, 0.28, 0.002]}>
        <planeGeometry args={[1.55, 0.42]} />
        <meshBasicMaterial color={"#0F1817"} />
      </mesh>
      <mesh ref={lineRef} position={[0.15, 0.28, 0.003]}>
        <planeGeometry args={[1.4, 0.006]} />
        <meshBasicMaterial color={ACCENT} />
      </mesh>

      {/* Bars card */}
      <mesh position={[-0.3, -0.25, 0.002]}>
        <planeGeometry args={[0.85, 0.5]} />
        <meshBasicMaterial color={"#0F1817"} />
      </mesh>
      <group ref={barsRef} position={[-0.3, -0.25, 0.003]}>
        {Array.from({ length: 7 }).map((_, i) => (
          <mesh key={i} position={[-0.3 + i * 0.1, 0, 0]}>
            <planeGeometry args={[0.06, 0.5]} />
            <meshBasicMaterial color={i % 3 === 0 ? PERIWINKLE : ACCENT} />
          </mesh>
        ))}
      </group>

      {/* Stats card */}
      <mesh position={[0.6, -0.25, 0.002]}>
        <planeGeometry args={[0.6, 0.5]} />
        <meshBasicMaterial color={"#0F1817"} />
      </mesh>
      <mesh position={[0.6, -0.12, 0.003]}>
        <planeGeometry args={[0.45, 0.05]} />
        <meshBasicMaterial color={ACCENT} />
      </mesh>
      <mesh position={[0.6, -0.28, 0.003]}>
        <planeGeometry args={[0.4, 0.025]} />
        <meshBasicMaterial color={"#354B45"} />
      </mesh>
      <mesh position={[0.6, -0.36, 0.003]}>
        <planeGeometry args={[0.32, 0.025]} />
        <meshBasicMaterial color={"#354B45"} />
      </mesh>
    </group>
  );
}

export function MacBook() {
  return (
    <Float speed={1.05} rotationIntensity={0.12} floatIntensity={0.28}>
      {/* Sit slightly recessed and turned toward camera */}
      <group position={[0, -0.05, -0.2]} rotation={[-0.12, -0.28, 0]}>
        {/* Base */}
        <RoundedBox
          args={[2.75, 0.095, 1.9]}
          radius={0.035}
          smoothness={6}
          position={[0, -0.6, 0]}
          castShadow
          receiveShadow
        >
          <AluminumMaterial color="#BFC5C3" />
        </RoundedBox>

        {/* Keyboard well */}
        <mesh position={[0, -0.548, 0.08]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[2.35, 1.2]} />
          <meshPhysicalMaterial color="#0C1211" roughness={0.85} metalness={0.1} />
        </mesh>

        {/* Trackpad */}
        <mesh position={[0, -0.547, 0.68]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[0.95, 0.58]} />
          <meshPhysicalMaterial
            color="#1A2322"
            roughness={0.35}
            metalness={0.2}
            clearcoat={0.3}
          />
        </mesh>

        {/* Individual keys as a subtle grid */}
        <group position={[0, -0.541, 0.02]}>
          {Array.from({ length: 5 }).map((_, r) =>
            Array.from({ length: 14 }).map((_, c) => (
              <mesh
                key={`${r}-${c}`}
                position={[-1.08 + c * 0.165, 0, -0.4 + r * 0.19]}
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <planeGeometry args={[0.14, 0.16]} />
                <meshPhysicalMaterial color="#161F1D" roughness={0.6} metalness={0.3} />
              </mesh>
            ))
          )}
        </group>

        {/* Lid */}
        <group position={[0, 0.2, -0.92]} rotation={[-0.32, 0, 0]}>
          <RoundedBox args={[2.75, 1.65, 0.055]} radius={0.04} smoothness={6} castShadow>
            <AluminumMaterial color="#BFC5C3" />
          </RoundedBox>
          {/* Black bezel */}
          <mesh position={[0, 0, 0.031]}>
            <planeGeometry args={[2.55, 1.48]} />
            <meshPhysicalMaterial color="#050807" roughness={0.35} />
          </mesh>
          {/* UI plane */}
          <group position={[0, 0, 0.038]}>
            <LaptopUI />
          </group>
          {/* Glass slab */}
          <group position={[0, 0, 0.048]}>
            <GlassOverlay width={2.5} height={1.44} radius={0.02} />
          </group>
          {/* Notch */}
          <mesh position={[0, 0.68, 0.04]}>
            <planeGeometry args={[0.32, 0.05]} />
            <meshBasicMaterial color="#000" />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

/* =========================================================
   iPhone Pro
   ========================================================= */

function PhoneUI() {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ringRef.current) return;
    const s = 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.04;
    ringRef.current.scale.set(s, s, 1);
  });
  return (
    <group>
      <mesh>
        <planeGeometry args={[0.72, 1.58]} />
        <meshBasicMaterial color={SCREEN_BG} />
      </mesh>
      {/* Dynamic island */}
      <mesh position={[0, 0.68, 0.001]}>
        <planeGeometry args={[0.22, 0.05]} />
        <meshBasicMaterial color="#000" />
      </mesh>
      {/* Balance ring */}
      <mesh ref={ringRef} position={[0, 0.28, 0.001]}>
        <ringGeometry args={[0.18, 0.22, 48]} />
        <meshBasicMaterial color={ACCENT} />
      </mesh>
      <mesh position={[0, 0.28, 0.002]}>
        <circleGeometry args={[0.165, 32]} />
        <meshBasicMaterial color="#0F1817" />
      </mesh>
      {/* Rows */}
      {[0, 1, 2, 3].map((i) => (
        <group key={i} position={[0, -0.12 - i * 0.16, 0.001]}>
          <mesh>
            <planeGeometry args={[0.62, 0.12]} />
            <meshBasicMaterial color="#111C1B" />
          </mesh>
          <mesh position={[-0.24, 0, 0.001]}>
            <circleGeometry args={[0.035, 20]} />
            <meshBasicMaterial color={i % 2 === 0 ? ACCENT : PERIWINKLE} />
          </mesh>
          <mesh position={[0.05, 0.015, 0.001]}>
            <planeGeometry args={[0.28, 0.02]} />
            <meshBasicMaterial color="#465B56" />
          </mesh>
          <mesh position={[0.05, -0.02, 0.001]}>
            <planeGeometry args={[0.18, 0.015]} />
            <meshBasicMaterial color="#2B3B37" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function IPhone() {
  return (
    <Float speed={1.6} rotationIntensity={0.28} floatIntensity={0.5}>
      {/* Front-right, tilted toward camera, slightly overlapping MacBook */}
      <group position={[1.85, -0.55, 1.1]} rotation={[0.05, -0.42, 0.06]}>
        {/* Titanium body */}
        <RoundedBox args={[0.88, 1.78, 0.095]} radius={0.14} smoothness={8} castShadow receiveShadow>
          <TitaniumMaterial />
        </RoundedBox>
        {/* Front glass base */}
        <RoundedBox args={[0.82, 1.7, 0.02]} radius={0.12} smoothness={6} position={[0, 0, 0.048]}>
          <meshPhysicalMaterial color="#050807" roughness={0.15} metalness={0.1} clearcoat={1} />
        </RoundedBox>
        {/* UI */}
        <group position={[0, 0, 0.062]}>
          <PhoneUI />
        </group>
        {/* Refractive glass overlay */}
        <group position={[0, 0, 0.072]}>
          <GlassOverlay width={0.78} height={1.66} radius={0.1} />
        </group>
        {/* Camera plateau */}
        <group position={[-0.24, 0.62, -0.06]}>
          <RoundedBox args={[0.34, 0.34, 0.03]} radius={0.06} smoothness={6}>
            <TitaniumMaterial />
          </RoundedBox>
          {[
            [-0.07, 0.07],
            [0.07, 0.07],
            [0, -0.07],
          ].map(([x, y], i) => (
            <group key={i} position={[x, y, -0.02]}>
              <mesh>
                <cylinderGeometry args={[0.06, 0.06, 0.05, 24]} />
                <meshPhysicalMaterial color="#0A0F0E" metalness={0.9} roughness={0.3} />
              </mesh>
              <mesh position={[0, 0.026, 0]}>
                <cylinderGeometry args={[0.038, 0.038, 0.005, 24]} />
                <meshPhysicalMaterial color="#050807" roughness={0.05} metalness={0.4} clearcoat={1} />
              </mesh>
            </group>
          ))}
        </group>
      </group>
    </Float>
  );
}

/* =========================================================
   Apple Watch Ultra
   ========================================================= */

function WatchUI() {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ringRef.current) ringRef.current.rotation.z = -state.clock.elapsedTime * 0.55;
  });
  return (
    <group>
      <mesh>
        <planeGeometry args={[0.6, 0.7]} />
        <meshBasicMaterial color="#000" />
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[0.2, 0.028, 20, 96, Math.PI * 1.6]} />
        <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={1.7} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0.001]}>
        <torusGeometry args={[0.14, 0.02, 16, 64, Math.PI * 1.2]} />
        <meshStandardMaterial
          color={PERIWINKLE}
          emissive={PERIWINKLE}
          emissiveIntensity={1.3}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0, -0.28, 0.001]}>
        <planeGeometry args={[0.36, 0.03]} />
        <meshBasicMaterial color="#405854" />
      </mesh>
    </group>
  );
}

export function AppleWatch() {
  return (
    <Float speed={2} rotationIntensity={0.32} floatIntensity={0.55}>
      {/* Front-left, tilted for depth */}
      <group position={[-1.9, -0.7, 1.1]} rotation={[0.1, 0.5, -0.05]}>
        {/* Titanium case */}
        <RoundedBox args={[0.82, 0.96, 0.22]} radius={0.19} smoothness={8} castShadow receiveShadow>
          <TitaniumMaterial />
        </RoundedBox>
        {/* Digital crown */}
        <group position={[0.42, 0.15, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.06, 0.06, 0.07, 32]} />
            <meshPhysicalMaterial color="#8A9591" metalness={1} roughness={0.28} clearcoat={0.6} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} position={[0.04, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.02, 24]} />
            <meshPhysicalMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.35} metalness={1} roughness={0.3} />
          </mesh>
        </group>
        {/* Side button */}
        <mesh position={[0.42, -0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.028, 0.028, 0.14, 24]} />
          <meshPhysicalMaterial color="#8A9591" metalness={1} roughness={0.3} />
        </mesh>
        {/* Curved sapphire glass slab */}
        <RoundedBox args={[0.7, 0.82, 0.02]} radius={0.15} smoothness={8} position={[0, 0, 0.11]}>
          <meshPhysicalMaterial color="#050807" roughness={0.08} metalness={0.15} clearcoat={1} clearcoatRoughness={0.05} />
        </RoundedBox>
        <group position={[0, 0, 0.122]}>
          <WatchUI />
        </group>
        <group position={[0, 0, 0.132]}>
          <GlassOverlay width={0.66} height={0.78} radius={0.14} />
        </group>
        {/* Bands */}
        <RoundedBox args={[0.58, 0.42, 0.11]} radius={0.06} smoothness={6} position={[0, 0.65, -0.02]} castShadow>
          <meshPhysicalMaterial color="#0F1615" roughness={0.9} metalness={0.05} />
        </RoundedBox>
        <RoundedBox args={[0.58, 0.42, 0.11]} radius={0.06} smoothness={6} position={[0, -0.65, -0.02]} castShadow>
          <meshPhysicalMaterial color="#0F1615" roughness={0.9} metalness={0.05} />
        </RoundedBox>
      </group>
    </Float>
  );
}
