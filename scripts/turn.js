// Sleep Function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ------------------------------------
async function turn(sequence) {
  for (let i = 0; i < sequence.length; i++) {
    let move = sequence[i].move;
    let row = sequence[i].row;
    let isClockwise = sequence[i].isClockwise;
    
    switch (move) {
      case 'l':
        cube.state = await turnRight(0, isClockwise);
        break;

      case 'm':
        cube.state = await turnRight(row, isClockwise);
        break;

      case 'r':
        cube.state = await turnRight(cube.dim - 1, isClockwise);
        break;

      case 'f':
        await turnFront(0, isClockwise);
        break;

      case 's':
        await turnFront(row, isClockwise);
        break;

      case 'b':
        await turnFront(cube.dim - 1, isClockwise);
        break;

      case 'u':
        await turnTop(cube.dim - 1, isClockwise);
        break;
        
      case 'e':
        await turnTop(row, isClockwise);
        break;

      case 'd':
        await turnTop(0, isClockwise);
        break;

      default:
        break;
    }

    // await animateTurn(0, row, true);
    cube.show();
    await sleep(10);
  }

  
}

// ------------------------------------
async function turnRight(row, isClockwise, state = cube.state) {
  let max = cube.dim - 1;
  let turnCount = isClockwise ? 1 : 3;

  for (let t = 0; t < turnCount; t++) {
    for (let i = 0; i < cube.dim; i++) {
      let opp = cube.dim - 1 - i;
      let temp = state[0][row][i];
      
      state[0][row][i] = state[5][row][opp];
      state[5][row][opp] = state[3][row][opp];
      state[3][row][opp] = state[4][row][opp];
      state[4][row][opp] = temp;
    }
  }

  let side;
  if (row === cube.dim - 1) side = 1;
  else if (row === 0) {
    side = 2;
    isClockwise = !isClockwise
  }
  else return state;

  rotateMatrix(state[side], isClockwise, side);
  return state;
}

// ------------------------------------
async function turnTop(row, isClockwise) {
  // Turning it clockwise 3 times is the same as turning it counter-clockwise once
  let turnCount = isClockwise ? 1 : 3;
  
  for (let t = 0; t < turnCount; t++) {
    for (let i = 0; i < cube.dim; i++) {
      let opp = cube.dim - i - 1;
      let temp = cube.state[0][i][row];

      cube.state[0][i][row] = cube.state[2][i][row];
      cube.state[2][i][row] = cube.state[3][opp][row];
      cube.state[3][opp][row] = cube.state[1][i][row];
      cube.state[1][i][row] = temp;
    }
  }

  let side;
  if (row === cube.dim - 1) side = 4;
  else if (row === 0) {
    side = 5;
    isClockwise = !isClockwise;
  }

  else return;

  rotateMatrix(cube.state[side], isClockwise, side);
  cube.show();
}

// ------------------------------------
async function turnFront(row, isClockwise) {
  let oppRow = cube.dim - 1 - row;
  let turnCount = isClockwise ? 1 : 3;

  for (let t = 0; t < turnCount; t++) {
    for (let i = 0; i < cube.dim; i++) {
      let opp = cube.dim - i - 1;
      let temp = cube.state[1][row][i];

      cube.state[1][row][i] = cube.state[4][opp][oppRow];
      cube.state[4][opp][oppRow] = cube.state[2][oppRow][opp];
      cube.state[2][oppRow][opp] = cube.state[5][i][row];
      cube.state[5][i][row] = temp;
    }
  }

  
  
  // If the row is the last row it will rotate the back side (Orange = side #3)
  let side;
  if (row === cube.dim - 1) side = 3;
  else if (row === 0) side = 0;
  await animateTurn(side, row, isClockwise);

  if (side === undefined) return;
  
  rotateMatrix(cube.state[side], isClockwise, side);
  cube.show();
}


// ------------------------------------
function rotateMatrix(matrix, isClockwise, side) {
  let newMatrix = [], n = cube.dim;

  // Initialize the new matrix with the size of the given matrix
  for (let i = 0; i < n; i++) { 

    newMatrix.push([]); 
    
    for (let j = 0; j < n; j++) { 
      
      newMatrix[i].push(''); 
    
    }
  }

  if (!isClockwise) {
    for (let x = 0; x < n / 2; x++) {
      for (let y = x; y < n - x - 1; y++) {
        // Set center if the cube size is not an even number
        if (n % 2 !== 0) {
          newMatrix[Math.floor(n / 2)][Math.floor(n / 2)] = matrix[Math.floor(n / 2)][Math.floor(n / 2)];
        }
        
        // Rotate
        newMatrix[ n - y - 1 ][ x ] = matrix[ x ][ y ];
        newMatrix[ x ][ y ] = matrix[ y ][ n - x - 1 ];
        newMatrix[ y ][ n - x - 1 ] = matrix[ n - x - 1 ][ n - y - 1 ];
        newMatrix[ n - x - 1 ][ n - y - 1 ] = matrix[ n - y - 1 ][ x ];
      }
    }
  }

  // Rotate matrix counter-clockwise
  else {
    for (let x = 0; x < n / 2; x++) {
      for (let y = x; y < n - x - 1; y++) {
        if (n % 2 !== 0) {
          newMatrix[Math.floor(n / 2)][Math.floor(n / 2)] = matrix[Math.floor(n / 2)][Math.floor(n / 2)];
        }

        // Rotate
        newMatrix[n - y - 1][x] = matrix[n - x - 1][n - y - 1];
        newMatrix[n - x - 1][n - y - 1] = matrix[y][n - x - 1];
        newMatrix[y][n - x - 1] = matrix[x][y];
        newMatrix[x][y] = matrix[n - y - 1][x];
      }
    }
  }

  cube.state[side] = newMatrix;
}