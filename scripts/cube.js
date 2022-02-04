let sideMeshes = [[],[],[],[],[],[]];
class Cube {
  constructor(dim = 3, size) {
    this.dim = dim;
    this.size = size;

    this.state = [];
    this.w = this.size / this.dim;
    this.qbSize = this.w - 0.02;
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

  show() {
    for (let s = 0; s < 6; s++) {
      for (let i = 0; i < this.dim; i++) {
        for (let j = 0; j < this.dim; j++) {
          let col = colors[this.state[s][i][j]];

          const g = new THREE.PlaneGeometry(this.qbSize, this.qbSize, this.qbSize);
          const m = new THREE.MeshBasicMaterial({color: col});
          const c = new THREE.Mesh(g, m);

          let x = i * this.w;
          let y = j * this.w;

          if (s === 0) {
            c.position.x = x;
            c.position.y = y;
          }

          if (s === 1) {
            c.position.z = x
            c.position.y = y;
            c.rotation.y = Math.PI / 2;

            c.translateZ(this.size - this.w / 2);
            c.translateX(this.size - this.w / 2);
          }

          if (s === 2) {
            c.position.z = x;
            c.position.y = y;
            c.rotation.y = -Math.PI / 2;

            c.translateX(-this.size + this.w / 2);
            c.translateZ(this.w / 2);
          }

          if (s === 3) {
            c.position.x = x;
            c.position.y = y;

            c.rotation.y = Math.PI;
            c.translateZ(this.size);
          }

          if (s === 4) {
            c.position.x = x;
            c.position.z = y;

            c.translateY(this.size - this.w / 2);
            c.translateZ(-this.size + this.w / 2);

            c.rotation.x = -Math.PI / 2;
          }

          if (s === 5) {
            c.position.x = x;
            c.position.z = y;

            c.translateY(-this.w / 2);
            c.translateZ(-this.size + this.w / 2);

            c.rotation.x = Math.PI / 2;
          }

          cubeMesh.add(c);
        }
      }
    }

    cubeMesh.position.z = -15;
    cubeMesh.position.y = -this.size / 2;
    scene.add(cubeMesh);
  }

  reset() {
    scene.remove(cubeMesh);
    cubeMesh = new THREE.Mesh();
    this.makeCube();
  }
}