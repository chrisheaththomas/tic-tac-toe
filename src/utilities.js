export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares && squares[a] && squares[a] === squares[b] && squares[a]
        === squares[c]) {
      return {winner: squares[a], line: lines[i]};
    }
  }
  return null;
}

export function isDraw(squares, nextPlayer) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  if (calculateWinner(squares)) {
    return false;
  }


  if (squares.filter((s) => {
    return s === null
  }).length === 2) {
    let isGameDrawn = true;
    for (let i = 0; i < lines.length; i++) {
      const line = Array(3).fill(null);

      for (let j = 0; j < 3; j++) {
        line[j] = squares[lines[i][j]]
      }
      if (line.filter((s) => {
        return s === null
      }).length === 1 && line.filter(onlyUnique).length === 2) {
        isGameDrawn = false;
      }
    }
    if(isGameDrawn) return true;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = Array(3).fill(null);

    for (let j = 0; j < 3; j++) {
      line[j] = squares[lines[i][j]]
    }

    //Not draw if moves left on line and only one side has placed on the line
    if (line.includes(null) && line.filter(onlyUnique).length < 3) {
      //Except if there is only 1 move left on the board and it is not the
      // players turn that previously placed on the line
      return (squares.filter((s) => {
            return s === null
          }).length === 1 &&
          !line.includes(nextPlayer));
    }
  }
  return true;
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
