export default class Piece {
  color: String;
  isKing: boolean;

  constructor(color: String, isKing: boolean = false) {
    this.color = color;
    this.isKing = isKing;
  }
}
