let scene,
  camera,
  renderer,
  torus1,
  torus2,
  sphere1,
  sphere2,
  sphere3,
  plane,
  group;

let deltaX, deltaY;

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
  initPlane();

  scene.add(group);

  group.rotation.set(deg2rad(-60), deg2rad(20), deg2rad(0));
  group.position.y = 1;

  animate();

  window.addEventListener("resize", onWindowResize);
  window.addEventListener("mousemove", moveHandler);
}

function moveHandler(evt) {
  evt.preventDefault();
  deltaX = evt.clientX;
  deltaY = evt.clientY;

  if (Math.abs(deltaX) === 1) deltaX = 0;
  if (Math.abs(deltaY) === 1) deltaY = 0;

  if (evt.clientX > 1000) evt.PageX = 0;

  console.log(deltaX, deltaY);
}

function initTorus1() {
  const geometry = new THREE.RingGeometry(3.5, 3.55, 500);
  var material = new THREE.ShaderMaterial({
    uniforms: {
      color1: {
        value: new THREE.Color(0xa8f4da),
      },
      color2: {
        value: new THREE.Color(0xd7cceb),
      },
    },
    vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
    fragmentShader: `
    uniform vec3 color1;
    uniform vec3 color2;
  
    varying vec2 vUv;
    
    void main() {
      
      gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
    }
  `,
  });
  torus1 = new THREE.Mesh(geometry, material);
  group.add(torus1);
  group.position.y = 0.7;
}

function initTorus2() {
  const geometry = new THREE.RingGeometry(3, 3.05, 500);
  var rev = true;
  var cols = [
    {
      stop: 0,
      color: new THREE.Color(0xeeeeee),
    },
    {
      stop: 1,
      color: new THREE.Color(0x77c8db),
    },
  ];

  setGradient(geometry, cols, "x", rev);

  var material = new THREE.MeshBasicMaterial({
    vertexColors: THREE.VertexColors,
  });

  torus2 = new THREE.Mesh(geometry, material);
  group.add(torus2);
}

function setGradient(geometry, colors, axis, reverse) {
  geometry.computeBoundingBox();

  var bbox = geometry.boundingBox;
  var size = new THREE.Vector3().subVectors(bbox.max, bbox.min);

  var vertexIndices = ["a", "b", "c"];
  var face,
    vertex,
    normalized = new THREE.Vector3(),
    normalizedAxis = 0;

  for (var c = 0; c < colors.length - 1; c++) {
    var colorDiff = colors[c + 1].stop - colors[c].stop;

    for (var i = 0; i < geometry.faces.length; i++) {
      face = geometry.faces[i];
      for (var v = 0; v < 3; v++) {
        vertex = geometry.vertices[face[vertexIndices[v]]];
        normalizedAxis = normalized.subVectors(vertex, bbox.min).divide(size)[
          axis
        ];
        if (reverse) {
          normalizedAxis = 1 - normalizedAxis;
        }
        if (
          normalizedAxis >= colors[c].stop &&
          normalizedAxis <= colors[c + 1].stop
        ) {
          var localNormalizedAxis =
            (normalizedAxis - colors[c].stop) / colorDiff;
          face.vertexColors[v] = colors[c].color
            .clone()
            .lerp(colors[c + 1].color, localNormalizedAxis);
        }
      }
    }
  }
}

function initSphere1() {
  const geometry = new THREE.SphereGeometry(0.1, 32, 16);
  const material = new THREE.MeshPhongMaterial({ color: 0xd7cceb });
  sphere1 = new THREE.Mesh(geometry, material);
  group.add(sphere1);
}

function initSphere2() {
  const geometry = new THREE.SphereGeometry(0.1, 32, 16);
  const material = new THREE.MeshPhongMaterial({ color: 0x99c5f0 });
  sphere2 = new THREE.Mesh(geometry, material);
  group.add(sphere2);
}

function initSphere3() {
  const geometry = new THREE.SphereGeometry(0.1, 32, 16);
  const material = new THREE.MeshPhongMaterial({ color: 0x73efd1 });
  sphere3 = new THREE.Mesh(geometry, material);
  group.add(sphere3);
}

function initPlane() {
  const texture = new THREE.TextureLoader().load("logo.png");
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  const geometry = new THREE.PlaneGeometry(2, 4);
  const material = new THREE.MeshStandardMaterial({ map: texture });
  material.side = THREE.DoubleSide;
  material.transparent = true;
  plane = new THREE.Mesh(geometry, material);
  scene.add(plane);
}

function groupRotate() {
  const X = -60 + deltaX / 200;
  const Y = 20 + deltaY / 200;
  group.rotation.set(deg2rad(X), deg2rad(Y), 0);
}

//Animate
function animate() {
  //Call animate function frequently
  requestAnimationFrame(animate);

  const timer = 0.0005 * Date.now();

  groupRotate();

  sphere1.position.x = Math.cos(timer) * 3.025;
  sphere1.position.y = Math.sin(timer) * 3.025;

  sphere2.position.x = Math.cos(timer + 90) * 3.025;
  sphere2.position.y = Math.sin(timer + 90) * 3.025;

  sphere3.position.x = Math.cos(timer + 180) * 3.525;
  sphere3.position.y = Math.sin(timer + 180) * 3.525;

  //Render Scene and Camera
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
