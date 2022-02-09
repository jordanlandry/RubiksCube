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
    cubeMesh.children = [];   // Reset the children of the cube mesh
    pieceMeshes = [];         // Reset the meshes array
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

          if (s === 0) {
            c.translateX(x);
            c.translateY(y);
          }

          if (s === 1) {
            c.translateY(y);
            c.translateZ(-x - this.w / 2);

            c.translateX(this.size - this.w / 2);
            c.rotation.y = Math.PI / 2;
          }

          if (s === 2) {
            c.translateZ(x - this.size + this.w / 2);
            c.translateY(y);

            c.translateX(-this.w / 2);
            c.rotation.y = -Math.PI / 2;
          }

          if (s === 3) {
            c.translateX(x);
            c.translateY(y);
            c.translateZ(-this.size);
            c.rotation.y = Math.PI;
          }

          if (s === 4) {
            c.translateX(x);
            c.translateZ(y);

            c.translateZ(-this.size + this.w / 2);
            c.translateY(this.size - this.w / 2);
            c.rotation.x = -Math.PI / 2;
          }

          if (s === 5) {
            c.translateX(x);
            c.translateZ(-y - this.w / 2);

            c.translateY(-this.w / 2);
            c.rotation.x = Math.PI / 2;
          }
          
          pieceMeshes[s][i][j] = (c);

          cubeMesh.add(c);
        }
      }
    }

    cubeMesh.position.z = -15;
    cubeMesh.position.y = -this.size / 2;
  }

  addCube() {
    scene.add(cubeMesh);
  }



  reset() {
    scene.remove(cubeMesh);
    cubeMesh = new THREE.Mesh();
    this.makeCube();
  }

  test() {
    // cube.state[1][0][0] = 'r';
    // cube.state[1][0][1] = 'r';
    // cube.state[1][0][2] = 'r';
  }
}

scene.add(cubeMesh);

