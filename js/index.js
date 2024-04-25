var camera, scene, renderer;
var geometry, material, mesh;
var initialCameraPosition = new THREE.Vector3();
var initialCameraDirection = new THREE.Vector3();
var qWorld;
var controls;

var objects = [];
var targets = { table: [], sphere: [], helix: [], grid: [], random: [] };

init();
animate();

//функция настраивает сцену, камеру, объекты и добавляет их в сцену

function init() {
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    5000
  );
  camera.position.z = 1800;
  initialCameraPosition.copy(camera.position);
  console.log(camera);
  // initialCameraDirection.copy(camera.getWorldDirection());
  scene = new THREE.Scene();

  for (let i = 0; i < table.length; i++) {
    const item = table[i];

    const [symbol, name, weight, index, index2, desc, group] = item;
    console.log(group);

    var element = document.createElement("div");
    element.className = `element js-element ${group}`;
    element.dataset.id = i;
    element.dataset.symbol = symbol;
    element.style.backgroundColor =
      "rgba(0,127,127," + (Math.random() * 0.5 + 0.25) + ")";

    var numberElem = document.createElement("div");
    numberElem.className = "number";
    numberElem.textContent = i + 1;
    element.appendChild(numberElem);

    var symbolElem = document.createElement("div");
    symbolElem.className = "symbol";
    symbolElem.textContent = symbol;
    element.appendChild(symbolElem);

    var detailsElem = document.createElement("div");
    detailsElem.className = "details";
    detailsElem.innerHTML = name + "<br>" + weight;
    element.appendChild(detailsElem);

    var object = new THREE.CSS3DObject(element);
    object.position.x = Math.random() * 4000 - 2000;
    object.position.y = Math.random() * 4000 - 2000;
    object.position.z = Math.random() * 4000 - 2000;
    scene.add(object);

    objects.push(object);
  }

  // -------  table  sphere   helix   grid ------- //

  // random

  for (var i = 0; i < objects.length; i++) {
    var item = table[i];
    var object = objects[i];

    var object = new THREE.Object3D();
    object.position.x = Math.random() * 4000 - 2000;
    object.position.y = Math.random() * 4000 - 2000;
    object.position.z = Math.random() * 4000 - 2000;

    targets.random.push(object);
  }

  // table

  for (var i = 0; i < objects.length; i++) {
    var item = table[i];
    var object = objects[i];

    var object = new THREE.Object3D();
    object.position.x = item[3] * 160 - 1540;
    object.position.y = -(item[4] * 200) + 1100;

    targets.table.push(object);
  }

  // sphere

  var vector = new THREE.Vector3();

  for (var i = 0, l = objects.length; i < l; i++) {
    var object = objects[i];

    var phi = Math.acos(-1 + (2 * i) / l);
    var theta = Math.sqrt(l * Math.PI) * phi;

    var object = new THREE.Object3D();

    object.position.x = 1000 * Math.cos(theta) * Math.sin(phi);
    object.position.y = 1000 * Math.sin(theta) * Math.sin(phi);
    object.position.z = 1000 * Math.cos(phi);

    vector.copy(object.position).multiplyScalar(2);

    object.lookAt(vector);

    targets.sphere.push(object);
  }

  // helix

  var vector = new THREE.Vector3();

  for (var i = 0, l = objects.length; i < l; i++) {
    var object = objects[i];

    var phi = i * 0.175 + Math.PI;

    var object = new THREE.Object3D();

    object.position.x = 1100 * Math.sin(phi);
    object.position.y = -(i * 8) + 450;
    object.position.z = 1100 * Math.cos(phi);

    vector.copy(object.position);
    vector.x *= 2;
    vector.z *= 2;

    object.lookAt(vector);

    targets.helix.push(object);
  }

  // grid

  for (var i = 0; i < objects.length; i++) {
    var object = objects[i];

    var object = new THREE.Object3D();

    object.position.x = (i % 5) * 400 - 800;
    object.position.y = -(Math.floor(i / 5) % 5) * 400 + 800;
    object.position.z = Math.floor(i / 25) * 1000 - 2000;

    targets.grid.push(object);
  }

  // -------  table  sphere   helix   grid ------- //

  //

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.style.position = "absolute";
  renderer.domElement.style.top = 0;
  document.getElementById("container").appendChild(renderer.domElement);

  //

  controls = new THREE.TrackballControls(camera, renderer.domElement);
  controls.rotateSpeed = 0.5;
  controls.addEventListener("change", render);

  // qWorld = controls.getWorldQuaternion();
  const randomBtn = document.getElementById("random");
  randomBtn.addEventListener("click", () => {
    resetCameraPosition();
  });

  var button = document.getElementById("table");
  button.addEventListener(
    "click",
    function (event) {
      transform(targets.table, 2000);
    },
    false
  );

  var button = document.getElementById("sphere");
  button.addEventListener(
    "click",
    function (event) {
      transform(targets.sphere, 2000);
    },
    false
  );

  var button = document.getElementById("helix");
  button.addEventListener(
    "click",
    function (event) {
      transform(targets.helix, 2000);
    },
    false
  );

  var button = document.getElementById("grid");
  button.addEventListener(
    "click",
    function (event) {
      transform(targets.grid, 2000);
    },
    false
  );

  transform(targets.table, 5000);

  //

  window.addEventListener("resize", onWindowResize, false);
}

function transform(targets, duration) {
  TWEEN.removeAll();

  for (var i = 0; i < objects.length; i++) {
    var object = objects[i];
    var target = targets[i];

    new TWEEN.Tween(object.position)
      .to(
        {
          x: target.position.x,
          y: target.position.y,
          z: target.position.z,
        },
        Math.random() * duration + duration
      )
      .easing(TWEEN.Easing.Exponential.InOut)
      .start();

    new TWEEN.Tween(object.rotation)
      .to(
        {
          x: target.rotation.x,
          y: target.rotation.y,
          z: target.rotation.z,
        },
        Math.random() * duration + duration
      )
      .easing(TWEEN.Easing.Exponential.InOut)
      .start();
  }

  new TWEEN.Tween(this)
    .to({}, duration * 2)
    .onUpdate(render)
    .start();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  TWEEN.update();
  controls.update();
}

function render() {
  renderer.render(scene, camera);
}
var isTableTransformed = false;
var isSphereTransformed = false;
var isHelixTransformed = false;
var isGridTransformed = false;

// Функция для сброса элементов в исходное состояние
function resetElements() {
  resetCameraPosition();
  if (isTableTransformed) {
    transform(targets.table, 2000);
    isTableTransformed = false;
  }
  if (isSphereTransformed) {
    transform(targets.sphere, 2000);
    isSphereTransformed = false;
  }
  if (isHelixTransformed) {
    transform(targets.helix, 2000);
    isHelixTransformed = false;
  }
  if (isGridTransformed) {
    transform(targets.grid, 2000);
    isGridTransformed = false;
  }
}

var lastState = "table";

// Обработчики событий для кнопок
var tableButton = document.getElementById("table");
tableButton.addEventListener(
  "click",
  function (event) {
    resetCameraPosition();
    if (lastState !== "table") {
      transform(targets.table, 2000);
      lastState = "table";
    }
  },
  false
);

var sphereButton = document.getElementById("sphere");
sphereButton.addEventListener(
  "click",
  function (event) {
    resetCameraPosition();
    if (lastState !== "sphere") {
      transform(targets.sphere, 2000);
      lastState = "sphere";
    }
  },
  false
);

var helixButton = document.getElementById("helix");
helixButton.addEventListener(
  "click",
  function (event) {
    resetCameraPosition();
    if (lastState !== "helix") {
      transform(targets.helix, 2000);
      lastState = "helix";
    }
  },
  false
);

var gridButton = document.getElementById("grid");
gridButton.addEventListener(
  "click",
  function (event) {
    resetCameraPosition();
    if (lastState !== "grid") {
      transform(targets.grid, 2000);
      lastState = "grid";
    }
  },
  false
);

function copyObj(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function resetCameraPosition() {
  new TWEEN.Tween(camera.position)
    .to(
      {
        x: initialCameraPosition.x,
        y: initialCameraPosition.y,
        z: initialCameraPosition.z,
      },
      1000
    )
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start();

  resetRotation();
}

function resetRotation() {
  var upVec = new THREE.Vector3(0, 1, 0);
  camera.up = upVec;
  controls.update();
}
