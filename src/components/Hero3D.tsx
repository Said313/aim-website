import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, RoundedBox, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

/**
 * Hero3D
 * Isolated, self-contained 3D hero scene built on react-three-fiber.
 * Renders three abstract "device slabs" (laptop / phone / watch) floating
 * gently under soft emerald lighting — matching the site's Evergreen palette.
 *
 * All layout, sizing and positioning is confined to this file so the rest
 * of the landing page remains untouched.
 */

// Evergreen palette
const COLORS = {
  chassis: "#1E2A28",
  chassisEdge: "#2D3D3A",
  screen: "#0F1817",
  accent: "#7AF4CF",
  accentSoft: "#5FD9B4",
  periwinkle: "#9B8CFF",
};

function ScreenGlow({
  width,
  height,
  radius = 0.04,
}: {
  width: number;
  height: number;
  radius?: number;
}) {
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((state) => {
    if (!mat.current) return;
    const t = state.clock.elapsedTime;
    mat.current.emissiveIntensity = 0.9 + Math.sin(t * 0.9) * 0.15;
  });
  return (
    <RoundedBox args={[width, height, 0.01]} radius={radius} smoothness={4}>
      <meshStandardMaterial
        ref={mat}
        color={COLORS.screen}
        emissive={COLORS.accent}
        emissiveIntensity={0.9}
        roughness={0.25}
        metalness={0.1}
      />
    </RoundedBox>
  );
}

function Laptop() {
  return (
    <Float speed={1.1} rotationIntensity={0.18} floatIntensity={0.35}>
      <group position={[0, 0, 0]} rotation={[-0.18, -0.35, 0]}>
        {/* Base */}
        <RoundedBox args={[2.6, 0.09, 1.8]} radius={0.03} smoothness={4} position={[0, -0.6, 0]}>
          <meshStandardMaterial color={COLORS.chassis} metalness={0.85} roughness={0.35} />
        </RoundedBox>
        {/* Lid + screen */}
        <group position={[0, 0.15, -0.85]} rotation={[-0.35, 0, 0]}>
          <RoundedBox args={[2.6, 1.55, 0.06]} radius={0.04} smoothness={4}>
            <meshStandardMaterial color={COLORS.chassis} metalness={0.85} roughness={0.35} />
          </RoundedBox>
          <group position={[0, 0, 0.035]}>
            <ScreenGlow width={2.44} height={1.4} />
          </group>
        </group>
      </group>
    </Float>
  );
}

function Phone() {
  return (
    <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.55}>
      <group position={[1.9, -0.35, 0.6]} rotation={[0.05, -0.4, 0.08]}>
        <RoundedBox args={[0.85, 1.75, 0.09]} radius={0.11} smoothness={6}>
          <meshStandardMaterial color={COLORS.chassisEdge} metalness={0.9} roughness={0.3} />
        </RoundedBox>
        <group position={[0, 0, 0.05]}>
          <ScreenGlow width={0.75} height={1.62} radius={0.08} />
        </group>
      </group>
    </Float>
  );
}

function Watch() {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.4;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <group position={[-1.9, -0.6, 0.6]} rotation={[0.1, 0.5, -0.05]}>
        <RoundedBox args={[0.75, 0.9, 0.18]} radius={0.16} smoothness={6}>
          <meshStandardMaterial color={COLORS.chassis} metalness={0.9} roughness={0.28} />
        </RoundedBox>
        <group position={[0, 0, 0.1]}>
          <ScreenGlow width={0.62} height={0.72} radius={0.12} />
          <mesh ref={ringRef} position={[0, 0, 0.02]}>
            <torusGeometry args={[0.2, 0.02, 16, 64, Math.PI * 1.4]} />
            <meshStandardMaterial
              color={COLORS.accent}
              emissive={COLORS.accent}
              emissiveIntensity={1.4}
              roughness={0.2}
            />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const [geo] = useState(() => {
    const g = new THREE.BufferGeometry();
    const count = 80;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1;
    }
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  });
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.03}
        color={COLORS.accent}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 2]} intensity={1.1} color={"#EAF7F2"} />
      <pointLight position={[-3, -1, 2]} intensity={1.2} color={COLORS.accent} />
      <pointLight position={[2, 2, -2]} intensity={0.8} color={COLORS.periwinkle} />
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>
      <group scale={1}>
        <Laptop />
        <Phone />
        <Watch />
      </group>
      <Particles />
      <ContactShadows
        position={[0, -1.35, 0]}
        opacity={0.5}
        scale={8}
        blur={2.6}
        far={3}
        color="#000000"
      />
    </>
  );
}

export function Hero3D() {
  // Guard against SSR — @react-three/fiber requires the DOM.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none hidden lg:block absolute z-0"
      style={{
        top: "50%",
        right: "max(40px, 4vw)",
        transform: "translateY(-50%)",
        width: "min(720px, 52vw)",
        height: "min(640px, 46vw)",
      }}
    >
      {mounted && (
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0.4, 5.2], fov: 38 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <Scene />
        </Canvas>
      )}
    </div>
  );
}

export default Hero3D;
