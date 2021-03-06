import React from 'react';
import './index.css';
import * as ReactDOM from "react-dom";
import {calculateWinner, isDraw} from "./utilities";

function Square(props) {
  return (
      <button className="square" onClick={props.onClick} style={props.style}>
        {props.value}
      </button>
  );
}

class Board extends React.Component {

  static boardLength() {
    return 3;
  }

  renderSquare(i) {
    const style = this.props.winner && this.props.winner.includes(i)
        ? {color: '#ff5e4a'} : {};
    return (
        <Square value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                style={style}
                key={i}/>
    );
  }

  renderRow(row) {
    return (
        <div className="board-row" key={row}>
          {this.renderRowOfSquares(row)}
        </div>
    );
  }

  renderRowOfSquares(row) {

    let squares = [];
    for (let col = 0; col < Board.boardLength(); col++) {
      squares.push(this.renderSquare(row * Board.boardLength() + col));
    }
    return squares;
  }

  renderRows() {
    let rows = [];
    for (let row = 0; row < Board.boardLength(); row++) {
      rows.push(this.renderRow(row));
    }
    return rows;
  }

  render() {
    return (
        <div>
          {this.renderRows()}
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
    const nextPlayer = this.state.xIsNext ? 'X' : 'O';
    if (calculateWinner(squares) || squares[i] || isDraw(squares, nextPlayer)) {
      return;
    }
    squares[i] = nextPlayer;

    function unshift() {
      history.unshift({
        squares: squares,
        index: i,
        move: history.length
      });
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
      stepNumber: this.state.isReversed ? history.length - 1 : history.length,
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
    const nextPlayer = this.state.xIsNext ? 'X' : 'O';
    if (winner) {
      status = 'Winner: ' + winner.winner;
    } else if(isDraw(current.squares, nextPlayer)){
      status = 'Game is a draw'
    }
    else {
      status = 'Next player: ' + (nextPlayer);
    }

    return (
        <div className="game">
          <div className="game-board">
            <Board
                squares={current.squares}
                onClick={(i) => this.handleMoveClick(i)}
                winner={winner && winner.line}
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
          ? {fontWeight: 'bold'} : {fontWeight: 'normal'};
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
    return index !== -1 ? history[index] : history[0];
  }

  reverse() {
    this.setState({
      history: this.state.history.reverse(),
      isReversed: !this.state.isReversed
    })
  }
}





// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);


