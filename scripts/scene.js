let scene, camera, renderer, cube, cubeMesh;

// Initialize
function init() {

  // Three JS Canvas Setup
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Add to HTML
  document.body.appendChild(renderer.domElement);

  // Move the camera back
  camera.position.z = 5;
  cubeMesh = new THREE.Mesh();

  // Temp
  cubeMesh.rotation.x = Math.PI / 6;
}

// Update Function
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  // cubeMesh.rotation.z -= 0.01;

  let fps = getFPS();
  // console.log(fps);
}

var lastLoop
function getFPS() {
  var thisLoop = new Date();
  var fps = 1000 / (thisLoop - lastLoop);
  lastLoop = thisLoop;
  return fps;
}

// Resize scene 
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Resize listener
window.addEventListener('resize', onWindowResize, false);

// Initialize everything
init();

