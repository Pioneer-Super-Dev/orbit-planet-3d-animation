import * as THREE from "./build/three.module.js";
import { OrbitControls } from "./jsm/controls/OrbitControls.js";
import { GLTFLoader } from "./jsm/loaders/GLTFLoader.js";

let scene,
  camera,
  renderer,
  torus1,
  torus2,
  sphere1,
  sphere2,
  sphere3,
  model,
  group,
  controls;

let mouseX = 0,
  mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

init();

function deg2rad(degrees) {
  return degrees * (Math.PI / 180);
}

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.rotation.set(deg2rad(0), deg2rad(0), deg2rad(0));

  camera.position.set(0, 0, 4.5);

  // LIGHTS
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
  hemiLight.color.setHSL(0.6, 1, 0.6);
  hemiLight.groundColor.setHSL(0.095, 1, 0.75);
  hemiLight.position.set(0, 0, 0);
  scene.add(hemiLight);
  const color = 0xffffff;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(10, 10, 15);
  light.target.position.set(0, 0, 0);
  scene.add(light);
  scene.add(light.target);

  //Create Renderer and Append Canvas to body
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

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
  // window.addEventListener("pointermove", onPointerMove);
}

function moveHandler(evt) {
  evt.preventDefault();
  deltaX = evt.clientX;
  deltaY = evt.clientY;

  if (Math.abs(deltaX) === 1) deltaX = 0;
  if (Math.abs(deltaY) === 1) deltaY = 0;

  if (evt.clientX > 1000) evt.PageX = 0;
}

function initTorus1() {
  const geometry = new THREE.TorusGeometry(3.5, 0.02, 500, 500);
  // var material = new THREE.ShaderMaterial({
  //   uniforms: {
  //     color1: {
  //       value: new THREE.Color(0xa8f4da),
  //     },
  //     color2: {
  //       value: new THREE.Color(0xd7cceb),
  //     },
  //   },
  //   vertexShader: `
  //   varying vec2 vUv;

  //   void main() {
  //     vUv = uv;
  //     gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  //   }
  // `,
  //   fragmentShader: `
  //   uniform vec3 color1;
  //   uniform vec3 color2;

  //   varying vec2 vUv;

  //   void main() {

  //     gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
  //   }
  // `,
  // });

  const texture = new THREE.TextureLoader().load("texture2.png");
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  const material = new THREE.MeshBasicMaterial({
    map: texture,
  });

  torus1 = new THREE.Mesh(geometry, material);
  group.add(torus1);
}

function initTorus2() {
  const geometry = new THREE.TorusGeometry(3.2, 0.02, 500, 500);
  // var material = new THREE.ShaderMaterial({
  //   uniforms: {
  //     color1: {
  //       value: new THREE.Color(0x77c8db),
  //     },
  //     color2: {
  //       value: new THREE.Color(0xeeeeee),
  //     },
  //   },
  //   vertexShader: `
  //   varying vec2 vUv;

  //   void main() {
  //     vUv = uv;
  //     gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  //   }
  // `,
  //   fragmentShader: `
  //   uniform vec3 color1;
  //   uniform vec3 color2;

  //   varying vec2 vUv;

  //   void main() {

  //     gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
  //   }
  // `,
  // });

  const texture = new THREE.TextureLoader().load("texture1.png");
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  const material = new THREE.MeshBasicMaterial({ map: texture });

  torus2 = new THREE.Mesh(geometry, material);
  group.add(torus2);
}

function initSphere1() {
  const geometry = new THREE.SphereGeometry(0.1, 32, 16);
  const material = new THREE.MeshPhongMaterial({ color: 0xd7cceb });
  sphere1 = new THREE.Mesh(geometry, material);
  sphere1.position.z = 0.11;
  group.add(sphere1);
}

function initSphere2() {
  const geometry = new THREE.SphereGeometry(0.1, 32, 16);
  const material = new THREE.MeshPhongMaterial({ color: 0x99c5f0 });
  sphere2 = new THREE.Mesh(geometry, material);
  sphere2.position.z = 0.11;
  group.add(sphere2);
}

function initSphere3() {
  const geometry = new THREE.SphereGeometry(0.1, 32, 16);
  const material = new THREE.MeshPhongMaterial({ color: 0x73efd1 });
  sphere3 = new THREE.Mesh(geometry, material);
  sphere3.position.z = 0.11;
  group.add(sphere3);
}

function initModel() {
  const loader = new GLTFLoader();
  loader.load(
    "logo.glb",
    function (gltf) {
      model = gltf.scene;
      model.scale.set(0.03, 0.03, 0.03);
      model.position.set(-0.5, -1.5, 0);
      scene.add(model);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

function groupRotate() {
  const X = -60 + deltaX / 200;
  const Y = 20 + deltaY / 200;
  group.rotation.set(deg2rad(X), deg2rad(Y), 0);
}

function groupRotate1() {
  // group.rotation.x += (mouseX - group.rotation.x) * 0.000002;
  group.rotation.y += (mouseY - group.rotation.y) * 0.00001;

  // if (group.rotation.x <= 1 && group.rotation.x >= -1) {
  //   group.rotation.x += finalRotationY * 0.1;
  // }
  // if (group.rotation.x > 1) {
  //   group.rotation.x = 1;
  // }

  // if (group.rotation.x < -1) {
  //   group.rotation.x = -1;
  // }
}

function onPointerMove(event) {
  if (event.isPrimary === false) return;

  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

//Animate
function animate() {
  //Call animate function frequently
  requestAnimationFrame(animate);
  const timer = 0.0005 * Date.now();

  // groupRotate();

  sphere1.position.x = Math.cos(timer) * 3.21;
  sphere1.position.y = Math.sin(timer) * 3.21;

  sphere2.position.x = Math.cos(timer + 90) * 3.21;
  sphere2.position.y = Math.sin(timer + 90) * 3.21;

  sphere3.position.x = Math.cos(timer + 180) * 3.51;
  sphere3.position.y = Math.sin(timer + 180) * 3.51;

  if (model) model.rotation.y += 0.02;

  groupRotate1();
  // camera.position.x += (mouseX - camera.position.x) * 0.000005;
  // camera.position.y += (-mouseY - camera.position.y) * 0.000005;

  // camera.lookAt(scene.position);

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
