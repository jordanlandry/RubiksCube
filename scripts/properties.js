let cubeDimensions;
let scrambleSequence;
let index = ['r','g','b','o','y','w'];
let colors = {
  'r' : 0xFF0000,
  'g' : 0x00FF00,
  'b' : 0x0000FF,
  'o' : 0xFFA500,
  'y' : 0xFFFF00,
  'w' : 0xFFFFFF
};

// let colors = [0xFF0000, 0x00FF00, 0x0000FF, 0xFFA500, 0xFFFF00, 0xFFFFFF];

let ui = document.getElementById('properties-ui');
let sizeProperty = document.getElementById('size');

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') hideUI();
});

document.addEventListener('click', (event) => {
  if (event.target === ui) hideUI();
})

function hideUI() {
  ui.style.display = "none";
}

function showUI() {
  ui.style.display = "block";
}

function setProperties() {  
  cube.reset();
  cubeDimensions =  sizeProperty.value;
  start();
  hideUI();
}

function generateScramble(len = cube.dim * cube.dim * cube.dim) {
  // Need a random move and direction
  let possibleMoves = 'rlfbud';
  let max = possibleMoves.length;

  let scramble = '';
  for (let i = 0; i < len; i++) {
    let moveIndex = Math.floor(Math.random() * max);
    scramble += possibleMoves[moveIndex];

    // Direction
    if (Math.random() < 0.5) scramble += 'i';

    // Move certain row if it is a larger than 3x3 cube
    // Only needs to move if the move is some sort of middle move (m, s, e)
    if (moveIndex === 1 || moveIndex === 4 || moveIndex === 7) {
      if (cube.dim > 3) {
        max = cube.dim - 2;
        let sliceIndex = Math.floor(Math.random() * max) + 1;
        scramble += sliceIndex;
      }
    }
  }

  return scramble;
}