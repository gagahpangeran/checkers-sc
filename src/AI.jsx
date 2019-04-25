import ReactCheckers from "./ReactCheckers";

export default class Opponent extends ReactCheckers {
  getMove(state, boardState, player, level) {
    const newState = Object.assign({}, state);

    if (level === "easy") {
      return this.getRandomMove(boardState, player);
    }

    return this.getMinMaxMove(newState, boardState, player, 0);
  }

  getPossibleMoves(boardState, player) {
    const self = this;
    let aiMoves = {};

    for (const coordinates in boardState) {
      const currentSquare = boardState[coordinates];

      // check if current coordinate is not playable
      if (currentSquare == null || currentSquare.player !== player) {
        continue;
      }

      const pieceMoves = self.getMoves(
        boardState,
        coordinates,
        boardState[coordinates].isKing,
        false
      );

      if (pieceMoves[0].length > 0 || pieceMoves[1] !== null) {
        aiMoves[coordinates] = pieceMoves;
      }
    }

    return aiMoves;
  }

  getRandomMove(boardState, player) {
    // get random piece to move
    const aiMoves = this.getPossibleMoves(boardState, player);
    const pieces = Object.keys(aiMoves);
    const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];

    // get random move of piece
    const possibleMove = aiMoves[randomPiece][0];
    const randomMoveTo =
      possibleMove[Math.floor(Math.random() * possibleMove.length)];

    return {
      piece: randomPiece,
      moveTo: randomMoveTo
    };
  }

  getMinMaxMove(state, boardState, player, deep) {
    const nextMove = this.getMaxMove(state, boardState, player, deep);
    return nextMove;
  }

  getMaxMove(state, boardState, player, deep) {
    const aiMove = this.getPossibleMoves(boardState, player);
    const pieces = Object.keys(aiMove);

    const nextMove = [];

    for (let ii = 0; ii < pieces.length; ii++) {
      const piece = pieces[ii];

      const possibleMove = aiMove[piece][0];
      const possibleDoubleJump = aiMove[piece][1];

      for (let jj = 0; jj < possibleMove.length; jj++) {
        const moveTo = possibleMove[jj];

        let score = 0;

        let newState = Object.assign({}, state);

        newState.activePiece = piece;
        newState.moves = possibleMove;
        newState.jumpKills = possibleDoubleJump;

        const postMoveState = this.movePiece(moveTo, newState);

        const pieceOfPlayer1 = this.getNumberOfPieces(
          postMoveState.boardState,
          "player1"
        );
        const pieceOfPlayer2 = this.getNumberOfPieces(
          postMoveState.boardState,
          "player2"
        );

        newState.history.push({
          boardState: postMoveState.boardState,
          currentPlayer: true
        });

        score = pieceOfPlayer2 - pieceOfPlayer1;

        nextMove.push({
          piece: piece,
          moveTo: moveTo,
          score: score
        });
      }
    }

    nextMove.sort((x, y) =>
      y.score - x.score === 0
        ? Math.round(Math.random()) * 2 - 1
        : y.score - x.score
    );

    return nextMove[0];
  }

  getNumberOfPieces(boardState, player) {
    let number = 0;

    for (const coordinates in boardState) {
      let piece = boardState[coordinates];
      if (piece !== null && piece.player === player) {
        number++;
      }
    }

    return number;
  }
}