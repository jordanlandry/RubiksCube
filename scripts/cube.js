let pieceMeshes = [];
class Cube {
  constructor(dim = 3, size) {
    this.dim = dim;
    this.size = size;

    this.state = [];
    this.w = this.size / this.dim;
    this.qbSize = this.w - 0.02;


    this.doAnimation = false;
  }

  makeCube() {
    let col;
    for (let s = 0; s < 6; s++) {
      this.state.push([]);

      for (let i = 0; i < this.dim; i++) {
        this.state[s].push([]);

        for (let j = 0; j < this.dim; j++) {
          this.state[s][i].push(index[s]);
        }
      }
    }
  }

  getMesh(s, i, j) {
    let col = colors[this.state[s][i][j]];
    const g = new THREE.PlaneGeometry(this.qbSize, this.qbSize, this.qbSize);
    const m = new THREE.MeshBasicMaterial({color: col});
    g.center();
    const c = new THREE.Mesh(g, m);
    return c;
  }

  show() {
    // Reset the children of the cube mesh
    cubeMesh.children = [];

    // Reset the meshes array
    pieceMeshes = [];

    // Create Meshes 
    for (let s = 0; s < 6; s++) {
      pieceMeshes.push([]);

      for (let i = 0; i < this.dim; i++) {
        pieceMeshes[s].push([]);
        
        for (let j = 0; j < this.dim; j++) {
          pieceMeshes[s][i].push();

          let c = this.getMesh(s, i, j);
          
          let x = (i * this.w);
          let y = (j * this.w);

          c.translateX(-this.size / 2 + this.w / 2);
          c.translateY(-this.size / 2 + this.w / 2);
          c.translateZ(this.size / 2);

          // Adjust position and rotation for each side

          // RED
          if (s === 0) {
            c.translateX(x);
            c.translateY(y);
          }

          // GREEN
          if (s === 1) {
            c.translateY(y);
            c.translateZ(-x - this.w / 2);

            c.translateX(this.size - this.w / 2);
            c.rotation.y = Math.PI / 2;
          }

          // BLUE
          if (s === 2) {
            c.translateZ(x - this.size + this.w / 2);
            c.translateY(y);

            c.translateX(-this.w / 2);
            c.rotation.y = -Math.PI / 2;
          }

          // ORANGE
          if (s === 3) {
            c.translateX(x);
            c.translateY(y);
            c.translateZ(-this.size);
            c.rotation.y = Math.PI;
          }

          // YELLOW
          if (s === 4) {
            c.translateX(x);
            c.translateZ(y);

            c.translateZ(-this.size + this.w / 2);
            c.translateY(this.size - this.w / 2);
            c.rotation.x = -Math.PI / 2;
          }

          // WHITE
          if (s === 5) {
            c.translateX(x);
            c.translateZ(-y - this.w / 2);

            c.translateY(-this.w / 2);
            c.rotation.x = Math.PI / 2;
          }
          
          // Add the meshes to the array
          pieceMeshes[s][i][j] = c;

          // Append the meshes of the pieces to the cube Mesh
          cubeMesh.add(c);
        }
      }
    }
  }

  // Add the cube mesh to the scene
  addCube() {
    scene.add(cubeMesh);
  }

  // Reset the cube
  reset() {
    let position = cubeMesh.position;
    let rotation = cubeMesh.rotation;
    
    // Remove the cubemesh and make a new one
    scene.remove(cubeMesh);
    cubeMesh = new THREE.Mesh();
    
    // Keep the same position and rotation of the current cube
    // Position
    cubeMesh.position.x = position.x;
    cubeMesh.position.y = position.y;
    cubeMesh.position.z = position.z;

    // Rotation
    cubeMesh.rotation.x = rotation.x;
    cubeMesh.rotation.y = rotation.y;
    cubeMesh.rotation.z = rotation.z;

    // Make another cube
    this.makeCube();
  }


  // For testing certain positions
  test() {
    // cube.state[1][0][0] = 'r';
    // cube.state[1][0][1] = 'r';
    // cube.state[1][0][2] = 'r';
  }
}

cubeMesh.position.z = -10;
