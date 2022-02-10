async function solveByReverse() {
  let sequence = getSequence();
  console.log(sequence);
  await turn(sequence);
}

function getSequence() {
  let sequence = [];

  // Traverse backwards through the scramble sequence
  for (let i = scrambleSequence.length - 1; i >= 0; i--) {
    // The first index of the new sequence needs to be the last index of the scramble sequence
    let opp = scrambleSequence.length - i - 1;

    // Push to the sequence array
    sequence.push({move: '', row: '', isClockwise: false});

    // The move and row is the same as the scramble sequence
    sequence[opp].move = scrambleSequence[i].move;
    sequence[opp].row = scrambleSequence[i].row;

    // The direction is reverse
    sequence[opp].isClockwise = !scrambleSequence[i].isClockwise;
  }

  return sequence;
}