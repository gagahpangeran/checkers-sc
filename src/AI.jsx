import ReactCheckers from "./ReactCheckers";

export default class Opponent extends ReactCheckers {
  getMove(boardState, player, level) {
    if (level === "easy") {
      return this.getRandomMove(boardState, player);
    }
  }

  getPossibleMoves(boardState, player) {
    const self = this;
    let aiMoves = {};

    for (const coordinates in boardState) {
      const currentSquare = boardState[coordinates];

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
    const aiMoves = this.getPossibleMoves(boardState, player);
    const keys = Object.keys(aiMoves);
    const randomPiece = keys[Math.floor(Math.random() * keys.length)];

    const possibleMove = aiMoves[randomPiece][0];
    const randomMoveTo =
      possibleMove[Math.floor(Math.random() * possibleMove.length)];

    return {
      piece: randomPiece,
      moveTo: randomMoveTo
    };
  }
}
