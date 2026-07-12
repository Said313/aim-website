import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  PerspectiveCamera,
  Environment,
  ContactShadows,
  Preload,
  AdaptiveDpr,
  AdaptiveEvents,
} from "@react-three/drei";
import { MacBook, IPhone, AppleWatch } from "./hero3d/Devices";

/**
 * Hero3D
 * Self-contained R3F scene for the landing hero. Renders three real 3D
 * devices (no PNGs) with HDRI environment reflections, contact shadows,
 * floating animation, and responsive/optimized rendering.
 *
 * Orbit controls are intentionally disabled — this is a decorative scene.
 */

function Scene() {
  return (
    <>
      {/* Explicit perspective camera */}
      <PerspectiveCamera makeDefault position={[0, 0.4, 5.4]} fov={38} near={0.1} far={50} />

      {/* Base lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[3.5, 4, 2]}
        intensity={1.1}
        color={"#EAF7F2"}
        castShadow={false}
      />
      <pointLight position={[-3, -1, 2]} intensity={1.1} color={"#7AF4CF"} />
      <pointLight position={[2.5, 2, -2]} intensity={0.7} color={"#9B8CFF"} />

      {/* HDRI reflections (Environment loads an HDR preset from drei's CDN) */}
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>

      {/* Devices */}
      <MacBook />
      <IPhone />
      <AppleWatch />

      {/* Soft grounding */}
      <ContactShadows
        position={[0, -1.4, 0]}
        opacity={0.55}
        scale={9}
        blur={2.8}
        far={3.5}
        color="#000000"
      />

      {/* Perf helpers */}
      <AdaptiveDpr pixelated={false} />
      <AdaptiveEvents />
      <Preload all />
    </>
  );
}

export function Hero3D() {
  // R3F needs the DOM — guard SSR.
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
          dpr={[1, 1.75]}
          frameloop="always"
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
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
