import Piece from "./piece";

function execute(oldState) {
  const state = getNextStateBoard(oldState);
  state.board = checkKing(state.board);
  return state;
}

function getNextStateBoard(oldState) {
  const state = JSON.parse(JSON.stringify(oldState));
  const {
    board,
    turn,
    clickedNow,
    clickedBefore,
    possibleMove,
    possibleJumpMove
  } = state;
  const [row, column] = clickedNow;
  const piece = board[row][column].color;
  const isKing = board[row][column].isKing;

  if (
    (piece === "0" && clickedBefore.length === 0) ||
    (piece === "B" && turn !== 1) ||
    (piece === "M" && turn !== 2)
  ) {
    return state;
  }

  if (clickedBefore.length === 0) {
    state.clickedBefore = [row, column];
    state.clickedNow = [];
    state.possibleMove = checkPossibleMove(row, column, piece, isKing, board);
    state.possibleJumpMove = checkPossibleJumpMove(
      row,
      column,
      piece,
      isKing,
      board
    );

    return state;
  }

  const [rowBefore, columnBefore] = clickedBefore;

  if (rowBefore === row && columnBefore === column) {
    state.clickedBefore = [];
    state.clickedNow = [];
    state.possibleJumpMove = [];
    state.possibleMove = [];

    return state;
  }

  if (possibleJumpMove.length > 0) {
    const canJump = possibleJumpMove.find(
      el => el[0] === row && el[1] === column
    );

    if (canJump) {
      const newBoard = JSON.parse(JSON.stringify(board));
      newBoard[row][column] = board[rowBefore][columnBefore];
      newBoard[rowBefore][columnBefore] = new Piece("0");
      newBoard[canJump[2]][canJump[3]] = new Piece("0");
      state.board = newBoard;

      const nextJump = checkPossibleJumpMove(
        row,
        column,
        newBoard[row][column].color,
        newBoard[row][column].isKing,
        newBoard
      );

      if (nextJump.length > 0) {
        state.clickedBefore = [row, column];
        state.clickedNow = [];
        state.possibleJumpMove = nextJump;

        return state;
      }

      state.clickedBefore = [];
      state.clickedNow = [];
      state.possibleJumpMove = [];
      state.possibleMove = [];
      state.turn = turn === 1 ? 2 : 1;

      return state;
    }

    state.clickedBefore = [];
    state.clickedNow = [];
    return state;
  }

  if (possibleMove.find(el => el[0] === row && el[1] === column)) {
    const newBoard = JSON.parse(JSON.stringify(board));
    newBoard[row][column] = board[rowBefore][columnBefore];
    newBoard[rowBefore][columnBefore] = new Piece("0");
    state.board = newBoard;

    state.possibleJumpMove = [];
    state.possibleMove = [];
    state.clickedBefore = [];
    state.clickedNow = [];
    state.turn = turn === 1 ? 2 : 1;

    return state;
  }

  return state;
}

function checkPossibleMove(row, column, piece, isKing, board) {
  const move = [];

  if (piece === "B" || isKing) {
    if (
      row - 1 >= 0 &&
      column - 1 >= 0 &&
      board[row - 1][column - 1].color === "0"
    ) {
      move.push([row - 1, column - 1]);
    }
    if (
      row - 1 >= 0 &&
      column + 1 <= 7 &&
      board[row - 1][column + 1].color === "0"
    ) {
      move.push([row - 1, column + 1]);
    }
  } else if (piece === "M" || isKing) {
    if (
      row + 1 <= 7 &&
      column - 1 >= 0 &&
      board[row + 1][column - 1].color === "0"
    ) {
      move.push([row + 1, column - 1]);
    }
    if (
      row + 1 <= 7 &&
      column + 1 <= 7 &&
      board[row + 1][column + 1].color === "0"
    ) {
      move.push([row + 1, column + 1]);
    }
  }

  return move;
}

function checkPossibleJumpMove(row, column, piece, isKing, board) {
  const move = [];
  if (piece === "B") {
    if (
      row - 2 >= 0 &&
      column - 2 >= 0 &&
      board[row - 1][column - 1].color === "M" &&
      board[row - 2][column - 2].color === "0"
    ) {
      move.push([row - 2, column - 2, row - 1, column - 1]);
    }
    if (
      row - 2 >= 0 &&
      column + 2 <= 7 &&
      board[row - 1][column + 1].color === "M" &&
      board[row - 2][column + 2].color === "0"
    ) {
      move.push([row - 2, column + 2, row - 1, column + 1]);
    }

    if (isKing) {
      if (
        row + 2 <= 7 &&
        column - 2 >= 0 &&
        board[row + 1][column - 1].color === "M" &&
        board[row + 2][column - 2].color === "0"
      ) {
        move.push([row + 2, column - 2, row + 1, column - 1]);
      }
      if (
        row + 2 <= 7 &&
        column + 2 <= 7 &&
        board[row + 2][column + 2].color === "0" &&
        board[row + 1][column + 1].color === "M"
      ) {
        move.push([row + 2, column + 2, row + 1, column + 1]);
      }
    }
  } else if (piece === "M") {
    if (
      row + 2 <= 7 &&
      column - 2 >= 0 &&
      board[row + 1][column - 1].color === "B" &&
      board[row + 2][column - 2].color === "0"
    ) {
      move.push([row + 2, column - 2, row + 1, column - 1]);
    }
    if (
      row + 2 <= 7 &&
      column + 2 <= 7 &&
      board[row + 2][column + 2].color === "0" &&
      board[row + 1][column + 1].color === "B"
    ) {
      move.push([row + 2, column + 2, row + 1, column + 1]);
    }

    if (isKing) {
      if (
        row - 2 >= 0 &&
        column - 2 >= 0 &&
        board[row - 1][column - 1].color === "B" &&
        board[row - 2][column - 2].color === "0"
      ) {
        move.push([row - 2, column - 2, row - 1, column - 1]);
      }
      if (
        row - 2 >= 0 &&
        column + 2 <= 7 &&
        board[row - 1][column + 1].color === "B" &&
        board[row - 2][column + 2].color === "0"
      ) {
        move.push([row - 2, column + 2, row - 1, column + 1]);
      }
    }
  }

  return move;
}

function checkKing(board) {
  const newBoard = JSON.parse(JSON.stringify(board));
  const firstRow = newBoard[0];
  const lastRow = newBoard[7];

  for (let ii = 0; ii < firstRow.length; ii++) {
    if (firstRow[ii].color === "B") {
      firstRow[ii].isKing = true;
    }
  }

  for (let ii = 0; ii < lastRow.length; ii++) {
    if (lastRow[ii].color === "M") {
      lastRow[ii].isKing = true;
    }
  }

  return newBoard;
}

export default execute;
