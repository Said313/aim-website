import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  Environment,
  ContactShadows,
  Float,
  PresentationControls,
} from "@react-three/drei";

useGLTF.preload("/models/MacBookPro.glb");
useGLTF.preload("/models/iPhone16.glb");
useGLTF.preload("/models/AppleWatch.glb");

function MacBook() {
  const { scene } = useGLTF("/models/MacBookPro.glb");
  return (
    <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.25}>
      <primitive
        object={scene}
        position={[0, -0.2, -0.4]}
        scale={1}
        castShadow
        receiveShadow
      />
    </Float>
  );
}

function IPhone() {
  const { scene } = useGLTF("/models/iPhone16.glb");
  return (
    <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.35}>
      <primitive
        object={scene}
        position={[-1.4, -0.35, 1.1]}
        rotation={[0, 0.35, 0]}
        scale={1}
        castShadow
        receiveShadow
      />
    </Float>
  );
}

function AppleWatch() {
  const { scene } = useGLTF("/models/AppleWatch.glb");
  return (
    <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.4}>
      <primitive
        object={scene}
        position={[-0.5, -0.5, 1.8]}
        rotation={[0, -0.25, 0]}
        scale={1}
        castShadow
        receiveShadow
      />
    </Float>
  );
}

export function DeviceShowcase() {
  return (
    <div className="relative w-full h-full">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        camera={{ position: [0, 1.3, 6], fov: 35 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <directionalLight
            position={[5, 6, 5]}
            intensity={1.1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <PresentationControls
            global
            snap
            polar={[-0.15, 0.2]}
            azimuth={[-0.5, 0.5]}
            config={{ mass: 1, tension: 170, friction: 26 }}
          >
            <group>
              <MacBook />
              <IPhone />
              <AppleWatch />
            </group>
          </PresentationControls>
          <ContactShadows
            position={[0, -0.9, 0]}
            opacity={0.55}
            scale={12}
            blur={2.6}
            far={3}
          />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default DeviceShowcase;
