// Center of rotation for animation
const centerG = new THREE.PlaneGeometry(0.1, 0.1, 0.1);
const centerM = new THREE.MeshBasicMaterial( {color: 0x000000} );
const centerMesh = new THREE.Mesh(centerG, centerM);

let animationTimeInMs = 500;
let piInterval = 144;   // Frame rate

async function animateTurn(side, row, isClockwise) {
  cubeMesh.add(centerMesh);
  if (!cube.doAnimation) return;
  
  // Turning the front Side
  for (let s = 0; s < 6; s++) {
    for (let i = 0; i < cube.dim; i++) {
      for (let j = 0; j < cube.dim; j++) {
        let mesh = cube.state[s][i][j].mesh;
        if (s === side) {
          console.table(cube.state[s]);
          centerMesh.add(mesh);
        }
      }
    }
  }
  let dir = isClockwise ? -1 : 1;
  await rotate(dir);

  // Set the children of the centerMesh back to the cube mesh
  for (let i = centerMesh.children.length - 1; i >= 0; i--) {
    cubeMesh.add(centerMesh.children[i]);
  }

  cubeMesh.remove(centerMesh);
}


async function rotate(dir) {
  for (let i = 0; i < Math.PI / 2; i += Math.PI / piInterval) {
    centerMesh.rotation.z += (Math.PI / piInterval) * dir ;
    await sleep(animationTimeInMs / piInterval / 2);
  }
}
