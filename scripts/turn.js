function turnRight(row, isClockwise) {
  for (let s = 0; s < 6; s++) {
    for (let i = 0; i < cube.dim; i++) {
      for (let j = 0; j < cube.dim; j++) {

        if (row > cube.dim - 1) { console.log('turn index too high'); return; }
        if (row < 0) { console.log('turn index too low'); return; }
        let x = row;
        let y = j;

        if (isClockwise) {
          let temp = cube.state[0][x][y];
          cube.state[0][x][y] = cube.state[5][x][y];
          cube.state[5][x][y] = cube.state[2][x][y];
          cube.state[2][x][y] = cube.state[4][x][y];
          cube.state[4][x][y] = temp;
        }
      }
    }
  }
  cube.show();
}

function turnTop(row, isClockwise) {

}


function turnFront(row, isClockwise) {

}



function rotateMatrix(matrix) {

}