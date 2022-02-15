async function solveByBeginner() {
  let s = solveWhiteCross();
  await turn(s);
  solveWhiteCorners();
  solveSecondLayer();
  solveYellowCross();
  permuteYellowEdges();
  permuteYellowCorners();
  orientYellowCorners();
}


function solveWhiteCross() {
  let currentSequence = [];

  let crossIsOriented, crossIsPositioned;

  let s = 5;    // Side index

  // First Check if the white cross is solved
  
  // Check if the the edges line up with the correct sides
  // White edge locations: [0][1] [1][0] [1][2] [2][1]
  // Red [0][1][0]    Green [1][1][0]    Blue [2][1][0]     Orange [3][1][0]
  crossIsOriented = (cube.state[s][0][1].color === 'w' && cube.state[s][1][0].color === 'w' && cube.state[s][1][2].color === 'w' && cube.state[s][2][1].color === 'w');
  crossIsPositioned = (cube.state[0][1][0].color === 'r' && cube.state[1][1][0].color === 'g' && cube.state[2][1][0].color === 'b' && cube.state[3][1][0].color === 'r');
  
  while ( !(crossIsOriented && crossIsPositioned) ) {
    // Look for a piece that can be solved in 1 move
    // Pieces that can be solved in 1 move are in the middle row on the left or right
    // Middle row indexes would be Sides: 0, 1, 2, 3    edges [0][1] or [2][1]
    for (let s = 0; s < 4; s++) {
      // If there is a piece on the top, it could be moved along the top side to make it be affected by the piece being solved, this will turn a 2 move piece into a 1 move piece
      // This is how real speed solvers will solve the cross due to conveinent finger tricks and ability to look ahead further, since this is a computer that doesn't really matter

      if (cube.state[s][0][1].color === 'w') {
        if (s === 0) {
          currentSequence.push( { move: 'm', row: 0, isClockwise: false } );

        }
        else if (s === 1) currentSequence.push( { move: 's', row: 0, isClockwise: true } );
        else if (s === 2) currentSequence.push( { move: 's', row: 2, isClockwise: false } );
        else if (s === 3) currentSequence.push( { move: 'm', row: 0, isClockwise: true } );
      }

      if (cube.state[s][2][1].color === 'w') {
        if (s === 0) currentSequence.push( { move: 'm', row: 2, isClockwise: false } );
        else if (s === 1) currentSequence.push( { move: 's', row: 2, isClockwise: true } );
        else if (s === 2) currentSequence.push( { move: 's', row: 0, isClockwise: false } );
        else if (s === 3) currentSequence.push( { move: 'm', row: 2, isClockwise: true } );
      }
    }


    // cube.state[3][2][1].color = 'w';
    // cube.show();


    // If multiple, check if any of them will move another white piece in the process, making it more efficient
    
    // *Note* I need to make sure when I turn, I don't mess up what is already solved
  
    // Find white edges that need 2 moves to solve only if there are no 1 move edges available
  
    // Turn them into a 1 move edge
    
    // Rerun the whole solveWhiteCross function and it should fully complete


    // Temprorary return
    return currentSequence;
  }
  
}

function solveWhiteCorners() {

}

function solveSecondLayer() {

}

function solveYellowCross() {

}

function permuteYellowEdges() {

}

function permuteYellowCorners() {

}

function orientYellowCorners() {
  
}