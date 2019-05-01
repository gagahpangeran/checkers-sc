import React, { Component } from "react";
import execute from "./utils";
import Piece from "./piece";
import "./board.css";

export default class Board extends Component {
  state = {
    board: [
      [
        new Piece("M"),
        new Piece("0"),
        new Piece("M"),
        new Piece("0"),
        new Piece("M"),
        new Piece("0"),
        new Piece("M"),
        new Piece("0")
      ],
      [
        new Piece("0"),
        new Piece("M"),
        new Piece("0"),
        new Piece("M"),
        new Piece("0"),
        new Piece("M"),
        new Piece("0"),
        new Piece("M")
      ],
      [
        new Piece("M"),
        new Piece("0"),
        new Piece("M"),
        new Piece("0"),
        new Piece("M"),
        new Piece("0"),
        new Piece("M"),
        new Piece("0")
      ],
      [
        new Piece("0"),
        new Piece("0"),
        new Piece("0"),
        new Piece("0"),
        new Piece("0"),
        new Piece("0"),
        new Piece("0"),
        new Piece("0")
      ],
      [
        new Piece("0"),
        new Piece("0"),
        new Piece("0"),
        new Piece("0"),
        new Piece("0"),
        new Piece("0"),
        new Piece("0"),
        new Piece("0")
      ],
      [
        new Piece("0"),
        new Piece("B"),
        new Piece("0"),
        new Piece("B"),
        new Piece("0"),
        new Piece("B"),
        new Piece("0"),
        new Piece("B")
      ],
      [
        new Piece("B"),
        new Piece("0"),
        new Piece("B"),
        new Piece("0"),
        new Piece("B"),
        new Piece("0"),
        new Piece("B"),
        new Piece("0")
      ],
      [
        new Piece("0"),
        new Piece("B"),
        new Piece("0"),
        new Piece("B"),
        new Piece("0"),
        new Piece("B"),
        new Piece("0"),
        new Piece("B")
      ]
    ],
    turn: 1,
    possibleMove: [],
    possibleJumpMove: [],
    clickedBefore: [],
    clickedNow: [],
    piecePlayerBlue: 12,
    piecePlayerRed: 12
  };

  handleClick = (row, column) => {
    this.setState(
      {
        clickedNow: [row, column]
      },
      () => {
        const newState = execute(this.state);
        this.setState({ ...newState });
      }
    );
  };

  renderBoard = board => {
    return board.map((row, rowIdx) => (
      <div className="row">
        {row.map((column, columnIdx) => (
          <div
            className="column"
            onClick={() => this.handleClick(rowIdx, columnIdx)}
          >
            {column.color === "M" && <div className="red piece" />}
            {column.color === "B" && <div className="blue piece" />}
          </div>
        ))}
      </div>
    ));
  };

  render() {
    console.log(this.state);
    console.table(this.state.board);
    return <div className="board">{this.renderBoard(this.state.board)}</div>;
  }
}