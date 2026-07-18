import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import fs from 'fs';

async function inspect(path) {
  const loader = new GLTFLoader();
  const data = fs.readFileSync(path);
  const gltf = await new Promise((resolve, reject) => {
    loader.parse(data.buffer, '', resolve, reject);
  });
  
  const scene = gltf.scene;
  console.log('Root nodes:', scene.children.length);
  
  let meshCount = 0;
  let lightCount = 0;
  let cameraCount = 0;
  scene.traverse((obj) => {
    if (obj.isMesh) meshCount++;
    if (obj.isLight) lightCount++;
    if (obj.isCamera) cameraCount++;
  });
  console.log('Meshes:', meshCount, 'Lights:', lightCount, 'Cameras:', cameraCount);
  
  const box = new THREE.Box3().setFromObject(scene);
  const size = new THREE.Vector3();
  box.getSize(size);
  console.log('Bounding box size:', size.x.toFixed(4), size.y.toFixed(4), size.z.toFixed(4));
  
  function printNode(obj, indent = 0) {
    const prefix = '  '.repeat(indent);
    let info = `${prefix}- ${obj.name || '(unnamed)'}`;
    if (obj.isMesh) info += ` [Mesh]`;
    if (obj.isLight) info += ` [Light]`;
    if (obj.isCamera) info += ` [Camera]`;
    console.log(info);
    console.log(`${prefix}  pos: [${obj.position.x.toFixed(3)}, ${obj.position.y.toFixed(3)}, ${obj.position.z.toFixed(3)}]`);
    console.log(`${prefix}  rot: [${obj.rotation.x.toFixed(3)}, ${obj.rotation.y.toFixed(3)}, ${obj.rotation.z.toFixed(3)}]`);
    console.log(`${prefix}  scl: [${obj.scale.x.toFixed(3)}, ${obj.scale.y.toFixed(3)}, ${obj.scale.z.toFixed(3)}]`);
    obj.children.forEach(c => printNode(c, indent + 1));
  }
  
  scene.children.forEach(c => printNode(c));
}

await inspect('/dev-server/public/models/AppleWatchUltra3.gltf');
