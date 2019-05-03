import React, { Component } from "react";
import execute from "./utils";
import Piece from "./piece";
import "./board.css";

export default class Board extends Component {
  state = {
    board: [
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
        new Piece("M"),
        new Piece("0"),
        new Piece("M"),
        new Piece("0"),
        new Piece("M"),
        new Piece("0"),
        new Piece("M")
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
      ]
    ],
    boardClicked: [
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [true, false, true, false, true, false, true, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false]
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
    const { boardClicked } = this.state;
    return board.map((row, rowIdx) => (
      <div className="row">
        {row.map((column, columnIdx) => (
          <div
            className={`column ${
              boardClicked[rowIdx][columnIdx] ? "clicked" : ""
            }`}
            onClick={() => this.handleClick(rowIdx, columnIdx)}
          >
            {column.color === "M" && (
              <div className="red piece">
                {column.isKing && <div class="king" />}
              </div>
            )}
            {column.color === "B" && (
              <div className="blue piece">
                {column.isKing && <div class="king" />}
              </div>
            )}
          </div>
        ))}
      </div>
    ));
  };

  render() {
    console.log(this.state);
    console.table(this.state.board);
    return (
      <div className="board">
        <div className="player-turn">
          <h1 className={`player-${this.state.turn}`}>
            Player {this.state.turn} Turn
          </h1>
        </div>
        {this.renderBoard(this.state.board)}
      </div>
    );
  }
}
