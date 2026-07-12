import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  PerspectiveCamera,
  Environment,
  ContactShadows,
  SoftShadows,
  Preload,
  AdaptiveDpr,
  AdaptiveEvents,
  BakeShadows,
} from "@react-three/drei";
import * as THREE from "three";
import { MacBook, IPhone, AppleWatch } from "./hero3d/Devices";

/**
 * Hero3D — self-contained R3F scene.
 * PerspectiveCamera + HDRI Environment + ContactShadows + SoftShadows
 * for PBR-friendly lighting and realistic contact AO. Orbit disabled.
 */

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.55, 5.6]} fov={36} near={0.1} far={50} />

      {/* Soft area-light shadows (screen-space) */}
      <SoftShadows size={28} samples={12} focus={0.9} />

      {/* Key + fill + rim lighting */}
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[3.5, 5, 3]}
        intensity={1.15}
        color="#EAF7F2"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0005}
      />
      <pointLight position={[-3, -0.5, 2.5]} intensity={1.2} color="#7AF4CF" />
      <pointLight position={[2.5, 2.5, -2]} intensity={0.8} color="#9B8CFF" />
      <pointLight position={[0, 1.5, 4]} intensity={0.35} color="#EAF7F2" />

      {/* HDRI reflections + image-based lighting (contributes AO cues) */}
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>

      {/* Devices */}
      <MacBook />
      <IPhone />
      <AppleWatch />

      {/* Invisible ground for shadow catchers */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.4, 0]} receiveShadow>
        <planeGeometry args={[14, 14]} />
        <shadowMaterial opacity={0.35} />
      </mesh>

      {/* Contact shadows — grounds the composition */}
      <ContactShadows
        position={[0, -1.395, 0.3]}
        opacity={0.6}
        scale={10}
        blur={2.6}
        far={3.5}
        resolution={1024}
        color="#000000"
      />

      <AdaptiveDpr pixelated={false} />
      <AdaptiveEvents />
      <BakeShadows />
      <Preload all />
    </>
  );
}

export function Hero3D() {
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
        width: "min(760px, 54vw)",
        height: "min(660px, 48vw)",
      }}
    >
      {mounted && (
        <Canvas
          shadows="soft"
          dpr={[1, 1.75]}
          frameloop="always"
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            outputColorSpace: THREE.SRGBColorSpace,
          }}
          style={{ background: "transparent" }}
        >
          <Scene />
        </Canvas>
      )}
    </div>
  );
}

export default Hero3D;
