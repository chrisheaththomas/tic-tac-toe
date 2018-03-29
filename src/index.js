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

  static boardLength(){return 3;}

  renderSquare(i) {
    return (
        <Square value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}/>
    );
  }

  renderRow(row){
    return(
        <div className="board-row">
          {this.renderRowOfSquares(row)}
        </div>
    );
  }
  renderRowOfSquares(row){

    var squares = [];
    for(var col = 0; col < Board.boardLength(); col++){
      squares.push(this.renderSquare(row*Board.boardLength()+col));
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
      }],
      xIsNext: true,
      stepNumber: 0,
    };
  }


  handleMoveClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        index: i
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
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
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
    const desc = move ?
        'Go to index #' + move + ' at row ' + row(step.index, 3) + ' col ' + column(step.index, 3):
        'Go to game start';
    const fontWeight = move === this.state.stepNumber ? {fontWeight: 'bold'} : {fontWeight: 'normal'}
    return (
        <li key={move}>
          <button style={fontWeight} onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
    );
    });

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
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
    );
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);


