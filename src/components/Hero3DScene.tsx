import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshTransmissionMaterial, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

/**
 * Interactive 3D hero — an emerald glass "aim" crystal orbited by soft
 * satellite spheres. Fully client-side (loaded via React.lazy behind
 * ClientOnly wrapper in Hero3D.tsx to avoid SSR/window issues).
 */

function Crystal() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (mesh.current) mesh.current.rotation.y += dt * 0.25;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={mesh} castShadow>
        <icosahedronGeometry args={[1.15, 1]} />
        <MeshTransmissionMaterial
          thickness={0.9}
          roughness={0.05}
          transmission={1}
          ior={1.4}
          chromaticAberration={0.06}
          backside
          color="#7AF4CF"
          attenuationColor="#2E8B57"
          attenuationDistance={1.2}
        />
      </mesh>
    </Float>
  );
}

function Satellite({
  radius,
  speed,
  offset,
  size,
  color,
}: {
  radius: number;
  speed: number;
  offset: number;
  size: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset;
    if (ref.current) {
      ref.current.position.set(
        Math.cos(t) * radius,
        Math.sin(t * 0.7) * radius * 0.35,
        Math.sin(t) * radius,
      );
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.4}
        roughness={0.3}
      />
    </mesh>
  );
}

export default function Hero3DScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.4, 4.2], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#0F1815"]} />
      <fog attach="fog" args={["#0F1815", 6, 12]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 2]} intensity={1.2} color="#7AF4CF" />
      <pointLight position={[-3, -1, 2]} intensity={0.8} color="#2E8B57" />

      <Suspense fallback={null}>
        <Crystal />
        <Satellite radius={2.1} speed={0.6} offset={0} size={0.08} color="#7AF4CF" />
        <Satellite radius={2.4} speed={0.4} offset={2.1} size={0.06} color="#62F4C4" />
        <Satellite radius={1.9} speed={0.8} offset={4.2} size={0.05} color="#F5F6F2" />
        <Satellite radius={2.6} speed={0.35} offset={1.0} size={0.07} color="#2E8B57" />

        <ContactShadows
          position={[0, -1.4, 0]}
          opacity={0.5}
          scale={6}
          blur={2.6}
          far={3}
          color="#000000"
        />
        <Environment preset="forest" />
      </Suspense>

      <EffectComposer>
        <Bloom intensity={0.9} luminanceThreshold={0.4} luminanceSmoothing={0.2} mipmapBlur />
        <Vignette eskil={false} offset={0.2} darkness={0.75} />
      </EffectComposer>
    </Canvas>
  );
}
