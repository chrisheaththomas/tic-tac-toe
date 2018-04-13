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

  let nullFilter = (s) => {
    return s === null
  }

  function isDrawItr(squares, nextPlayer) {
    if (calculateWinner(squares)) {
      return false;
    } else if (squares.filter(nullFilter).length === 0) {
      return true;
    } else {
      return squares.map((s, i) => {
        return {square: s, index: i}
      }).filter((s) => {
        return s.square === null;
      }).every((s) => {
        if (!nullFilter(s.square)) {
          return false;
        } else {
          const nextState = squares.slice();
          nextState[s.index] = nextPlayer;
          return isDraw(nextState, nextPlayer === 'O' ? 'X' : 'O');
        }
      });
    }
  }

  return isDrawItr(squares, nextPlayer);

}

