function start() {
  cube = new Cube(cubeDimensions, 5);
  cube.makeCube();
  cube.test();
  cube.show();
  cube.addCube();
  
}

// Begin the animation function once everything has loaded
animate();
start();

