const isDraw = require('./utilities');

test('isDraw for empty board', () => {
  const board = Array(9).fill(null);
  expect(isDraw(board, 'X')).toBe(false);
});