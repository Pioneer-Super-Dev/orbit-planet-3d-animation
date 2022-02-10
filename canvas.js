import * as THREE from "./build/three.module.js";
import { GLTFLoader } from "./jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "./jsm/environments/RoomEnvironment.js";

let scene,
  camera,
  renderer,
  torus1,
  torus2,
  sphere1,
  sphere2,
  sphere3,
  model,
  group;

let mouseX = 0;
let mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

init();

function deg2rad(degrees) {
  return degrees * (Math.PI / 180);
}

function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  document.body.appendChild(renderer.domElement);

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x444444);
  scene.environment = pmremGenerator.fromScene(
    new RoomEnvironment(),
    0.04
  ).texture;

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.rotation.set(deg2rad(0), deg2rad(0), deg2rad(0));

  camera.position.set(0, 0, 4.5);

  const ambientLight = new THREE.AmbientLight(0x000000);
  scene.add(ambientLight);

  group = new THREE.Group();

  initTorus1();
  initTorus2();
  initSphere1();
  initSphere2();
  initSphere3();
  initModel();

  scene.add(group);

  group.rotation.set(deg2rad(-60), deg2rad(20), deg2rad(0));
  group.position.y = 1;

  animate();

  window.addEventListener("resize", onWindowResize);
  // window.addEventListener("mousemove", moveHandler);
  document.addEventListener("pointermove", onPointerMove);
}

function onPointerMove(event) {
  if (event.isPrimary === false) return;

  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
  console.log(mouseX, mouseY);
}

function generateVertexColors(geometry) {
  const positionAttribute = geometry.attributes.position;

  const colors = [];
  const color = new THREE.Color();

  for (let i = 0, il = positionAttribute.count; i < il; i++) {
    color.setHSL((i / il) * Math.random(), 0.5, 0.5);
    colors.push(color.r, color.g, color.b);
  }

  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
}

function initTorus1() {
  const geometry = new THREE.TorusGeometry(3.5, 0.02, 1000, 1000);

  generateVertexColors(geometry);
  torus1 = new THREE.Mesh(geometry);
  torus1.material = new THREE.MeshPhysicalMaterial({ color: 0x4dffbe });
  // Material
  torus1.material.transparent = false;
  torus1.material.opacity = 1;
  torus1.material.depthTest = true;
  torus1.material.depthWrite = true;
  torus1.material.alphaTest = 0;
  torus1.material.visible = true;
  torus1.material.side = THREE.FrontSide;
  torus1.material.emissive = 0x000000;
  torus1.material.roughness = 1;
  torus1.material.metalness = 1;
  torus1.material.reflectivity = 0.5;
  torus1.material.clearcoat = 1;
  torus1.material.clearcoatRoughtness = 0;
  torus1.material.flatShading = false;
  torus1.material.wireframe = false;
  torus1.material.vertexColors = false;
  torus1.material.fog = false;

  group.add(torus1);
}

function initTorus2() {
  const geometry = new THREE.TorusGeometry(3.2, 0.02, 500, 500);

  generateVertexColors(geometry);
  torus2 = new THREE.Mesh(geometry);
  torus2.material = new THREE.MeshPhysicalMaterial({ color: 0x77c8db });
  // Material
  torus2.material.transparent = false;
  torus2.material.opacity = 1;
  torus2.material.depthTest = true;
  torus2.material.depthWrite = true;
  torus2.material.alphaTest = 0;
  torus2.material.visible = true;
  torus2.material.side = THREE.FrontSide;
  torus2.material.emissive = 0x000000;
  torus2.material.roughness = 1;
  torus2.material.metalness = 1;
  torus2.material.reflectivity = 0.5;
  torus2.material.clearcoat = 1;
  torus2.material.clearcoatRoughtness = 0;
  torus2.material.flatShading = false;
  torus2.material.wireframe = false;
  torus2.material.vertexColors = false;
  torus2.material.fog = false;

  group.add(torus2);
}

function initSphere1() {
  const geometry = new THREE.SphereGeometry(0.1, 32, 16);
  generateVertexColors(geometry);
  sphere1 = new THREE.Mesh(geometry);
  sphere1.material = new THREE.MeshPhysicalMaterial({ color: 0x9853a2 });
  // Material
  sphere1.material.transparent = false;
  sphere1.material.opacity = 1;
  sphere1.material.depthTest = true;
  sphere1.material.depthWrite = true;
  sphere1.material.alphaTest = 0;
  sphere1.material.visible = true;
  sphere1.material.side = THREE.FrontSide;
  sphere1.material.emissive = 0x000000;
  sphere1.material.roughness = 1;
  sphere1.material.metalness = 1;
  sphere1.material.reflectivity = 0.5;
  sphere1.material.clearcoat = 1;
  sphere1.material.clearcoatRoughtness = 0;
  sphere1.material.flatShading = false;
  sphere1.material.wireframe = false;
  sphere1.material.vertexColors = false;
  sphere1.material.fog = false;

  sphere1.position.z = 0.11;
  group.add(sphere1);
}

function initSphere2() {
  const geometry = new THREE.SphereGeometry(0.1, 32, 16);
  generateVertexColors(geometry);
  sphere2 = new THREE.Mesh(geometry);
  sphere2.material = new THREE.MeshPhysicalMaterial({ color: 0x1564cb });
  // Material
  sphere2.material.transparent = false;
  sphere2.material.opacity = 1;
  sphere2.material.depthTest = true;
  sphere2.material.depthWrite = true;
  sphere2.material.alphaTest = 0;
  sphere2.material.visible = true;
  sphere2.material.side = THREE.FrontSide;
  sphere2.material.emissive = 0x000000;
  sphere2.material.roughness = 1;
  sphere2.material.metalness = 1;
  sphere2.material.reflectivity = 0.5;
  sphere2.material.clearcoat = 1;
  sphere2.material.clearcoatRoughtness = 0;
  sphere2.material.flatShading = false;
  sphere2.material.wireframe = false;
  sphere2.material.vertexColors = false;
  sphere2.material.fog = false;

  sphere2.position.z = 0.11;
  group.add(sphere2);
}

function initSphere3() {
  const geometry = new THREE.SphereGeometry(0.1, 32, 16);
  generateVertexColors(geometry);
  sphere3 = new THREE.Mesh(geometry);
  sphere3.material = new THREE.MeshPhysicalMaterial({ color: 0x00ffa3 });
  // Material
  sphere3.material.transparent = false;
  sphere3.material.opacity = 1;
  sphere3.material.depthTest = true;
  sphere3.material.depthWrite = true;
  sphere3.material.alphaTest = 0;
  sphere3.material.visible = true;
  sphere3.material.side = THREE.FrontSide;
  sphere3.material.emissive = 0x000000;
  sphere3.material.roughness = 1;
  sphere3.material.metalness = 1;
  sphere3.material.reflectivity = 0.5;
  sphere3.material.clearcoat = 1;
  sphere3.material.clearcoatRoughtness = 0;
  sphere3.material.flatShading = false;
  sphere3.material.wireframe = false;
  sphere3.material.vertexColors = false;
  sphere3.material.fog = false;

  sphere3.position.z = 0.11;
  group.add(sphere3);
}

function initModel() {
  const loader = new GLTFLoader();
  loader.load(
    "model.glb",
    function (gltf) {
      model = gltf.scene;
      model.scale.set(8, 8, 8);
      // model.scale.set(0.03, 0.03, 0.03);
      model.position.y = -1;
      scene.add(model);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

function groupRotate() {
  group.rotation.x +=
    (deg2rad(-60 + mouseX / (window.innerWidth / 20)) - group.rotation.x) *
    0.05;
  group.rotation.y +=
    (deg2rad(20 - mouseY / (window.innerHeight / 20)) - group.rotation.y) *
    0.05;
}

//Animate
function animate() {
  //Call animate function frequently
  requestAnimationFrame(animate);
  const timer = 0.0005 * Date.now();

  sphere1.position.x = Math.cos(timer) * 3.21;
  sphere1.position.y = Math.sin(timer) * 3.21;

  sphere2.position.x = Math.cos(timer + 90) * 3.21;
  sphere2.position.y = Math.sin(timer + 90) * 3.21;

  sphere3.position.x = Math.cos(timer + 180) * 3.51;
  sphere3.position.y = Math.sin(timer + 180) * 3.51;

  if (model) model.rotation.y += 0.02;

  if (group) groupRotate();
  //Render Scene and Camera
  renderer.render(scene, camera);
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
