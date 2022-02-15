let turnSpeed, cubeDimensions, solvingMethod;
let scrambleSequence = [];
let index = ['r','g','b','o','y','w'];
let colors = {
  'r' : 0xFF0000,
  'g' : 0x00FF00,
  'b' : 0x0000FF,
  'o' : 0xFFA500,
  'y' : 0xFFFF00,
  'w' : 0xFFFFFF
};

let ui = document.getElementById('properties-ui');
let sizeProperty = document.getElementById('size');
let speedProperty = document.getElementById('speed');
let solvingMethodProperty = document.getElementById('method');

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
  turnSpeed = speedProperty.value;
  solvingMethod = solvingMethodProperty.value;

  start();
  hideUI();
}

function generateScramble(len = 25 + parseInt(cube.dim)) {
  scramble = [];

  // Need a random move and direction
  let possibleMoves = 'mse';
  let max = possibleMoves.length;
  
  for (let i = 0; i < len; i++) {
    // Create the scramble array
    scramble.push( { move: '', row: '', isClockwise: false } );

    // Generate move
    let moveIndex = Math.floor(Math.random() * max);
    let row = Math.floor(Math.random(cube.dim) * cube.dim);

    // Make sure the middle doesn't move on odd dimensioned cube
    if ( cube.dim % 2 !== 0 && row === Math.floor( cube.dim / 2 ) ) row += Math.random < 0.5 ? -1 : 1;

    // Set array to generated move
    scramble[i].move = possibleMoves[moveIndex];
    scramble[i].row = row;
  
    // Direction
    if (Math.random() < 0.5) scramble[i].isClockwise = true;
  }

  return scramble;
}