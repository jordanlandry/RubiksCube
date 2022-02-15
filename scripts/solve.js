// Currently the solve function will only reverse the moves from the scramble
async function solve() {
  
  // Pick which algorithm to solve
  switch (solvingMethod) {
    case 'reverse':
      await solveByReverse();
      break;
    case 'beginner':
      await solveByBeginner();
      break;
    case 'cfop':
      await solveByCFOP();
      break;
    case 'least':
      await solveByLeastMoves();
      break;
    case 'roux':
      await solveByRoux();
      break;
    case 'blindfold':
      await solveByBlindfold();
  }
}


// This will simulate what the cube state will be without actually updating the cube state
function simulateMove(currentState, sequence) {
  let result;
  
  return result;
} 