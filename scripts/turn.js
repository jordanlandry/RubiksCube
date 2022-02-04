// Sleep Function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function turn(sequence) {
  for (let i = 0; i < sequence.length; i++) {
    let move = sequence[i];
    let isClockwise = true;

    if (i !== sequence.length -1) {
      if (sequence[i + 1] === 'i') isClockwise = false;
    }

    let row;


    switch (move) {
      case 'l':
        turnRight(0, isClockwise);
        break;

      case 'm':
        if (cube.dim > 3 && i < sequence.length - 1) row = sequence[i + 1];
        else row = 1;

        turnRight(row, isClockwise);
        break;

      case 'r':
        turnRight(cube.dim - 1, isClockwise);
        break;

      case 'f':
        turnFront(0, isClockwise);
        break;

      case 's':
        if (cube.dim > 3 && i < sequence.length - 1) row = sequence[i + 1];
        else row = 1;

        turnFront(row, isClockwise);
        break;

      case 'b':
        turnFront(cube.dim - 1, isClockwise);
        break;

      case 'u':
        turnTop(cube.dim - 1, isClockwise);
        break;

      case 'e':
        if (cube.dim > 3 && i < sequence.length - 1) row = sequence[i + 1];
        else row = 1;

        turnTop(row, isClockwise);
        break;

      case 'd':
        turnTop(0, isClockwise);
        break;

      default:
        break;
    }
  }

  cube.show();
}

function turnRight(row, isClockwise) {

  let max = cube.dim - 1;

  let turnCount = 1;

  if (!isClockwise) turnCount = 3;
  
  for (let t = 0; t < turnCount; t++) {
    for (let i = 0; i < cube.dim; i++) {
      let opp = cube.dim - 1 - i;
      let temp = cube.state[0][row][i];
      cube.state[0][row][i] = cube.state[5][row][i];
      cube.state[5][row][i] = cube.state[3][row][opp];
      cube.state[3][row][opp] = cube.state[4][row][opp];
      cube.state[4][row][opp] = temp;
    }
  }

  let side;
  if (row === cube.dim - 1) side = 1;
  else if (row === 0) side = 2;

  rotateMatrix(cube.state[side]);
}

function turnTop(row, isClockwise) {
  let max = cube.dim - 1;
  let opp = max - row;

  let turnCount = 1;

  if (!isClockwise) turnCount = 3;
  
  for (let t = 0; t < turnCount; t++) {
    for (let i = 0; i < cube.dim; i++) {
      let temp = cube.state[0][i][row];
      cube.state[0][i][row] = cube.state[2][i][row];
      cube.state[2][i][row] = cube.state[3][i][row];
      cube.state[3][i][row] = cube.state[1][i][row];
      cube.state[1][i][row] = temp;
    }
  }
}


function turnFront(row, isClockwise) {

}



function rotateMatrix(matrix) {
  console.log(matrix);
  let mat = [];

  let top = 0;
  let bottom = cube.dim - 1;
  let left = 0;
  let right = cube.dim - 1;

  let dir = 1;

  while (top <= bottom && left <= right) {
    if (dir === 1) {
      for (let i = left; i <= right; i++) {
        mat.push(matrix[top][i]);
      }

      top++;
      dir = 2;
    }

    else if (dir === 2) {
      for (let i = top; i <= bottom; i++) {
        mat.push(matrix[i][right]);
      }

      right--;
      dir = 3;
    }

    else if (dir === 3) {
      for (let i = right; i >= left; i--) {
        mat.push(matrix[bottom][i]);
      }

      bottom--;
      dir = 4;
    }

    else if (dir === 4) {
      for (let i = bottom; i >= top; i--) {
        mat.push(matrix[i][left]);
      }
    }

    left++;
    dir = 1;
  }

  console.log(mat);
}