/**
 * @jest-environment node
 */

import {isDraw} from "./utilities";


test('is not draw for empty board', () => {
  const board = Array(9).fill(null);
  expect(isDraw(board, 'X')).toBe(false);
});

test('is draw for full board with no winner', () => {
  const board = Array(9).fill(null);
  board[0] = 'X';
  board[1] = 'X';
  board[2] = 'O';
  board[3] = 'O';
  board[4] = 'O';
  board[5] = 'X';
  board[6] = 'X';
  board[7] = 'O';
  board[8] = 'X';
  expect(isDraw(board, '')).toBe(true);

});

test('is draw for one remaining go with no possible winner', () => {
  const board = Array(9).fill(null);
  board[0] = 'X';
  board[1] = 'X';
  board[2] = 'O';
  board[3] = 'O';
  board[4] = 'O';
  board[5] = 'X';
  board[6] = 'X';
  board[7] = 'O';
  board[8] = null;
  expect(isDraw(board, '')).toBe(true);
});

test('is not draw for one remaining go with possible winner', () => {
  const board = Array(9).fill(null);
  board[0] = 'X';
  board[1] = 'O';
  board[2] = 'O';
  board[3] = 'X';
  board[4] = 'O';
  board[5] = 'X';
  board[6] = null;
  board[7] = 'X';
  board[8] = 'O';
  expect(isDraw(board, 'X')).toBe(false);
});

test('is not draw for winning line', ()=>{
  const board = Array(9).fill(null);
  board[0] = 'X';
  board[1] = 'X';
  board[2] = 'X';
  board[3] = 'O';
  board[4] = 'O';
  board[5] = 'X';
  board[6] = 'X';
  board[7] = 'O';
  board[8] = null;
  expect(isDraw(board, 'O')).toBe(false);

});

test('is draw for two remaining when no side can win', () => {
  const board = Array(9).fill(null);
  board[0] = 'X';
  board[1] = null;
  board[2] = null;
  board[3] = 'O';
  board[4] = 'O';
  board[5] = 'X';
  board[6] = 'X';
  board[7] = 'X';
  board[8] = 'O';
  expect(isDraw(board, 'O')).toBe(true);
});

test('is not draw for two remaining when one side can still win - O is next', () => {
  const board = Array(9).fill(null);
  board[0] = 'X';
  board[1] = 'X';
  board[2] = 'O';
  board[3] = 'O';
  board[4] = 'O';
  board[5] = 'X';
  board[6] = null;
  board[7] = null;
  board[8] = 'X';
  expect(isDraw(board, 'O')).toBe(false);
});

test('is not draw for two remaining when one side can still win - X is next', () => {
  const board = Array(9).fill(null);
  board[0] = 'X';
  board[1] = 'X';
  board[2] = 'O';
  board[3] = 'O';
  board[4] = 'O';
  board[5] = 'X';
  board[6] = null;
  board[7] = null;
  board[8] = 'X';
  expect(isDraw(board, 'X')).toBe(false);
});

test('is not draw for winning line with two remaining', () => {

  const board = Array(9).fill(null);
  board[0] = 'X';
  board[1] = 'X';
  board[2] = 'X';
  board[3] = 'O';
  board[4] = 'O';
  board[5] = 'X';
  board[6] = 'O';
  board[7] = null;
  board[8] = null;
  expect(isDraw(board, 'O')).toBe(false);

});

test('is a draw when one remaining and nobody can win', () => {

  const board = Array(9).fill(null);
  board[0] = null;
  board[1] = 'O';
  board[2] = 'X';
  board[3] = 'O';
  board[4] = 'O';
  board[5] = 'X';
  board[6] = 'X';
  board[7] = 'X';
  board[8] = 'O';
  expect(isDraw(board, 'X')).toBe(true);
});