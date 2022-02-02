const colors = [0xFF0000, 0x00FF00, 0x0000FF, 0xFFA500, 0xFFFF00, 0xFFFFFF];
let sideMeshes = [new THREE.Mesh(), new THREE.Mesh(), new THREE.Mesh(), new THREE.Mesh(), new THREE.Mesh(), new THREE.Mesh()];
class Cube {
  constructor(dim = 3, cubeSize) {
    this.dim = dim;
    this.cubeSize = cubeSize;
    this.w = this.cubeSize / this.dim;
    this.qbSize = this.w - 0.02;
    this.state = [];
  }

  // Init the cube array
  makeCube() {
    for (let s = 0; s < 6; s++) {       // Number of sides
      this.state.push([]);

      for (let i = 0; i < this.dim; i++) {
        this.state[s].push([]);

        for (let j = 0; j < this.dim; j++) {
          this.state[s][i].push(new Piece(i, j, s, colors[s]))

        }
      }
    }
  } 

  show() {

    for (let s = 0; s < 6; s++) {
      for (let i = 0; i < this.dim; i++) {
        for (let j = 0; j < this.dim; j++) {
          let piece = this.state[s][i][j];

          
          // Create Mesh
          const g = new THREE.PlaneGeometry(this.qbSize, this.qbSize, this.qbSize);
          const m = new THREE.MeshBasicMaterial({color: piece.color});
          const c = new THREE.Mesh(g, m);
          
          // Order the pieces
          c.translateX(piece.x * this.w - this.cubeSize / 2 + this.w / 2);
          c.translateY(piece.y * this.w - this.cubeSize / 2 + this.w / 2);
          c.translateZ(this.cubeSize / 2);
          
          // Add to each side 
          sideMeshes[s].add(c);

        }
      }
    }

    for (let i = 0; i < 6; i++) {
      cubeMesh.add(sideMeshes[i]);
    }

    // Adjust rotation for each side
    sideMeshes[1].rotation.y = Math.PI / 2;
    sideMeshes[2].rotation.y = -Math.PI / 2;
    sideMeshes[3].rotation.y = Math.PI;
    sideMeshes[4].rotation.x = -Math.PI / 2;
    sideMeshes[5].rotation.x = Math.PI / 2;

    // Add cube mesh to the scene to display
    cubeMesh.position.z = -10;
    scene.add(cubeMesh);
  }

  reset() {
    scene.remove(cubeMesh);
    sideMeshes = [new THREE.Mesh(), new THREE.Mesh(), new THREE.Mesh(), new THREE.Mesh(), new THREE.Mesh(), new THREE.Mesh()];
    cubeMesh = new THREE.Mesh();
  }
}