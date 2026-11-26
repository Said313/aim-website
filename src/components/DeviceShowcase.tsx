import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  Environment,
  ContactShadows,
  Float,
  PresentationControls,
} from "@react-three/drei";
import * as THREE from "three";

const models = {
  laptop: `${import.meta.env.BASE_URL}models/MacBookPro.glb`,
  phone: `${import.meta.env.BASE_URL}models/iPhone16.glb`,
  watch: `${import.meta.env.BASE_URL}models/AppleWatchUltra3.gltf`,
};

Object.values(models).forEach((model) => useGLTF.preload(model));

/**
 * Clone a loaded GLTF scene and normalize it:
 *  - optionally prune nodes by name predicate BEFORE measuring
 *  - fix negative/mirrored scales so normals render correctly
 *  - center on origin (XZ centered, base on Y=0)
 *  - uniformly scale so the largest bbox dimension === targetSize (meters)
 */
function useNormalizedScene(
  url: string,
  targetSize: number,
  options?: {
    prune?: (name: string) => boolean;
    baseOnGround?: boolean;
  },
) {
  const { scene } = useGLTF(url);

  return useMemo(() => {
    const root = scene.clone(true);

    // 1. Prune unwanted nodes (Blender cameras, area lights, duplicate watch, etc.)
    if (options?.prune) {
      const toRemove: THREE.Object3D[] = [];
      root.traverse((obj) => {
        if (options.prune!(obj.name)) toRemove.push(obj);
      });
      for (const obj of toRemove) obj.parent?.remove(obj);
    }

    // Also strip any lights/cameras that slipped through by type.
    const typeStrip: THREE.Object3D[] = [];
    root.traverse((obj) => {
      if ((obj as THREE.Light).isLight || (obj as THREE.Camera).isCamera) {
        typeStrip.push(obj);
      }
    });
    for (const obj of typeStrip) obj.parent?.remove(obj);

    // 2. Bake current transforms so we can safely fix mirroring / recenter.
    root.updateMatrixWorld(true);

    // 3. Fix mirrored / negative-scale meshes: flip normals and winding.
    root.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      const s = new THREE.Vector3();
      mesh.getWorldScale(s);
      const det = s.x * s.y * s.z;
      if (det < 0) {
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((m) => {
          if (!m) return;
          (m as THREE.Material).side = THREE.DoubleSide;
          (m as THREE.MeshStandardMaterial).needsUpdate = true;
        });
        const geom = mesh.geometry as THREE.BufferGeometry;
        if (geom) {
          geom.computeVertexNormals();
        }
      }
    });

    // 4. Measure bounding box and normalize to target size + center.
    const box = new THREE.Box3().setFromObject(root);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = targetSize / maxDim;

    // Wrap in a container so we don't fight the source node's own transform.
    const container = new THREE.Group();
    root.position.sub(center); // center at origin
    if (options?.baseOnGround) {
      // After centering, lowest Y is -size.y/2 * (unscaled). Lift so base = 0.
      root.position.y += (size.y / 2);
    }
    container.add(root);
    container.scale.setScalar(scale);

    return container;
  }, [scene, targetSize, options?.prune, options?.baseOnGround]);
}

function MacBook() {
  // Real MacBook Pro ~ 0.35m wide. Give it the largest footprint.
  const obj = useNormalizedScene(models.laptop, 1.8, {
    baseOnGround: true,
  });
  return (
    <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.2}>
      <primitive object={obj} position={[0, -0.55, -0.6]} />
    </Float>
  );
}

function IPhone() {
  const obj = useNormalizedScene(models.phone, 0.9, {
    baseOnGround: true,
  });
  return (
    <Float speed={1.4} rotationIntensity={0.18} floatIntensity={0.3}>
      <primitive
        object={obj}
        position={[-1.1, -0.55, 0.9]}
        rotation={[0, 0.4, 0]}
      />
    </Float>
  );
}

function AppleWatch() {
  const obj = useNormalizedScene(models.watch, 0.6, {
    baseOnGround: true,
    prune: (name) => {
      if (!name) return false;
      // Blender helpers exported as root nodes.
      if (name === "Camera") return true;
      if (/^Area(\.\d+)?$/.test(name)) return true;
      // Duplicated second watch instance and its children.
      if (name === "apple watch.001") return true;
      if (/\.001$/.test(name) && /^(button|kordon|speaker protection|ı dunno what is this)/i.test(name)) {
        return true;
      }
      return false;
    },
  });
  return (
    <Float speed={1.6} rotationIntensity={0.22} floatIntensity={0.35}>
      <primitive
        object={obj}
        position={[-0.65, -0.45, 1.35]}
        rotation={[0.35, -0.3, 0]}
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
        camera={{ position: [0, 1.1, 5.2], fov: 35 }}
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
          >
            <group>
              <MacBook />
              <IPhone />
              <AppleWatch />
            </group>
          </PresentationControls>
          <ContactShadows
            position={[0, -0.55, 0]}
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
