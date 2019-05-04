import React, { Component } from "react";
import execute, { getPossibleClick } from "./utils";
import minimax from "./minimax";
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
    piecePlayerRed: 12,
    winner: ""
  };

  handleClick = async (row, column) => {
    await this.setState({
      clickedNow: [row, column]
    });

    this.boardExecute();
  };

  boardExecute = async () => {
    let newState = execute(this.state);
    await this.setState({ ...newState });

    if (await this.checkWin()) {
      return;
    }

    while (this.state.turn === 2) {
      const nextState = minimax(this.state, 4);

      await this.setState({ ...nextState });

      if (await this.checkWin()) {
        return;
      }
    }

    if (await this.checkWin()) {
      return;
    }
  };

  checkWin = async () => {
    const { piecePlayerBlue, piecePlayerRed, turn } = this.state;
    const possibleClick = getPossibleClick(
      turn === 1 ? "B" : "M",
      this.state.board
    );

    if (piecePlayerBlue === 0) {
      await this.setState({ winner: "Player 2" });
      return true;
    } else if (piecePlayerRed === 0) {
      await this.setState({ winner: "Player 1" });
      return true;
    } else if (possibleClick.length === 0) {
      await this.setState({ winner: turn === 1 ? "Player 2" : "Player 1" });
      return true;
    }
    return false;
  };

  renderBoard = board => {
    const { boardClicked } = this.state;
    return board.map((row, rowIdx) => (
      <div className="row" key={`row${rowIdx}`}>
        {row.map((column, columnIdx) => (
          <div
            className={`column ${
              boardClicked[rowIdx][columnIdx] ? "clicked" : ""
            }`}
            onClick={() => this.handleClick(rowIdx, columnIdx)}
            key={`column${columnIdx}`}
          >
            {column.color === "M" && (
              <div className="red piece">
                {column.isKing && <div className="king" />}
              </div>
            )}
            {column.color === "B" && (
              <div className="blue piece">
                {column.isKing && <div className="king" />}
              </div>
            )}
          </div>
        ))}
      </div>
    ));
  };

  render() {
    return (
      <>
        <div className="player-turn">
          <h1 className="vs-piece">
            <span className="blue">{this.state.piecePlayerBlue}</span>
            <span> VS </span>
            <span className="red">{this.state.piecePlayerRed}</span>
          </h1>
          <h1 className={`player-${this.state.turn}`}>
            {this.state.winner
              ? `${this.state.winner} Win`
              : `Player ${this.state.turn} Turn`}
          </h1>
          <h1
            onClick={() => {
              window.location.reload();
            }}
            className="new-game"
          >
            New Game
          </h1>
        </div>
        <div className="board">{this.renderBoard(this.state.board)}</div>
      </>
    );
  }
}
