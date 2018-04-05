import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
  );
}

class Board extends React.Component {

  static boardLength() {
    return 3;
  }

  renderSquare(i) {
    return (
        <Square value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}/>
    );
  }

  renderRow(row) {
    return (
        <div className="board-row">
          {this.renderRowOfSquares(row)}
        </div>
    );
  }

  renderRowOfSquares(row) {

    var squares = [];
    for (var col = 0; col < Board.boardLength(); col++) {
      squares.push(this.renderSquare(row * Board.boardLength() + col));
    }
    return squares;
  }

  renderSquares() {
    var squares = [];
    for (var row = 0; row < Board.boardLength(); row++) {
      squares.push(this.renderRow(row));
    }
    return squares;
  }

  render() {
    return (
        <div>
          {this.renderSquares()}
        </div>
    );
  }
}

function column(index, rowLength) {
  return index % rowLength;
}

function row(index, rowLength) {
  return (index - column(index, rowLength)) / rowLength;
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        index: undefined,
        move: undefined,
      }],
      xIsNext: true,
      stepNumber: 0,
      isReversed: false,
    };
    this.reverse = this.reverse.bind(this);
  }

  handleMoveClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = this.current(history);
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    function unshift() {
      history.unshift({
        squares: squares,
        index: i,
        move: history.length
      })
      return history;
    }

    this.setState({
      history: this.state.isReversed ? unshift()
          : history.concat([{
            squares: squares,
            index: i,
            move: history.length
          }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: this.state.isReversed? history.length -1 : history.length,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = this.current(history);
    const winner = calculateWinner(current.squares);

    const moves = this.moves(history);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
        <div className="game">
          <div className="game-board">
            <Board
                squares={current.squares}
                onClick={(i) => this.handleMoveClick(i)}
            />
          </div>
          <div className="game-info">
            <button onClick={this.reverse}>Reverse</button>
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
    );
  }

  moves(history) {
    return history.map((step, index) => {
      const desc = step.move ? 'Go to move #' + step.move + ' at row ' + row(
          step.index, 3) + ' col ' + column(step.index, 3) : 'Go to game start';
      const fontWeight = step.move === this.state.stepNumber
          ? {fontWeight: 'bold'} : {fontWeight: 'normal'}
      return (
          <li key={index}>
            <button style={fontWeight}
                    onClick={() => this.jumpTo(step.move)}>{desc}</button>
          </li>
      );
    });
  }

  current(history) {
    const index = history.findIndex((period) => {
      return period.move === this.state.stepNumber;
    });
    const current = index !== -1 ? history[index] : history[0];
    return current;
  }

  reverse() {
    this.setState({
      history: this.state.history.reverse(),
      isReversed: !this.state.isReversed
    })
  }
}

function calculateWinner(squares) {
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
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);


