import execute, { getPossibleClick } from "./utils";

export default function executeMinimax(oldState, depth) {
  const nextState = max(oldState, depth, -1000, 1000);
  return nextState.nextState;
}

function max(oldState, depth = 0, alpha, beta) {
  const state = JSON.parse(JSON.stringify(oldState));
  const possibleClick = getPossibleClick("M", state.board);

  if (possibleClick.length === 0) {
    return { nextState: state, value: 0 };
  }

  let possibleState = [];

  for (let ii = 0; ii < possibleClick.length; ii++) {
    const moveState = JSON.parse(JSON.stringify(state));
    moveState.clickedNow = possibleClick[ii];

    const next = execute(moveState);
    const possibleJumpMove = next.possibleJumpMove;
    const possibleMove = next.possibleMove;

    if (possibleJumpMove.length === 0) {
      for (let jj = 0; jj < possibleMove.length; jj++) {
        const jumpState = JSON.parse(JSON.stringify(next));
        jumpState.clickedNow = possibleMove[jj];

        let result = execute(jumpState);
        let value;

        if (depth === 0) {
          value = result.piecePlayerRed - result.piecePlayerBlue;
        } else {
          const resMin = min(result, depth - 1, alpha, beta);

          if (resMin === undefined) {
            break;
          }

          value = resMin.value;
        }

        if (value > alpha) {
          alpha = value;
        }

        if (beta <= alpha) {
          break;
        }

        possibleState.push({
          nextState: result,
          value: value
        });
      }
    } else {
      for (let jj = 0; jj < possibleJumpMove.length; jj++) {
        const jumpState = JSON.parse(JSON.stringify(next));
        jumpState.clickedNow = possibleJumpMove[jj];

        let result = execute(jumpState);

        while (result.turn === 2) {
          result.clickedNow = result.possibleJumpMove[0];
          result = execute(result);
        }

        let value;

        if (depth === 0) {
          value = result.piecePlayerRed - result.piecePlayerBlue;
        } else {
          const resMin = min(result, depth - 1, alpha, beta);

          if (resMin === undefined) {
            break;
          }

          value = resMin.value;
        }

        if (value > alpha) {
          alpha = value;
        }

        if (beta <= alpha) {
          break;
        }

        possibleState.push({
          nextState: result,
          value: value
        });
      }
    }
  }

  possibleState.sort(() => Math.round(Math.random()) * 2 - 1);

  possibleState.sort((x, y) => {
    return y.value - x.value;
  });

  return possibleState[0];
}

function min(oldState, depth = 0, alpha, beta) {
  const state = JSON.parse(JSON.stringify(oldState));
  const possibleClick = getPossibleClick("B", state.board);

  if (possibleClick.length === 0) {
    return { nextState: state, value: 0 };
  }

  let possibleState = [];

  for (let ii = 0; ii < possibleClick.length; ii++) {
    const moveState = JSON.parse(JSON.stringify(state));
    moveState.clickedNow = possibleClick[ii];

    const next = execute(moveState);
    const possibleJumpMove = next.possibleJumpMove;
    const possibleMove = next.possibleMove;

    if (possibleJumpMove.length === 0) {
      for (let jj = 0; jj < possibleMove.length; jj++) {
        const jumpState = JSON.parse(JSON.stringify(next));
        jumpState.clickedNow = possibleMove[jj];

        let result = execute(jumpState);
        let value;

        if (depth === 0) {
          value = result.piecePlayerBlue - result.piecePlayerRed;
        } else {
          const resMax = max(result, depth - 1, alpha, beta);

          if (resMax === undefined) {
            break;
          }

          value = resMax.value;
        }

        if (value < beta) {
          beta = value;
        }

        if (beta <= alpha) {
          break;
        }

        possibleState.push({
          nextState: result,
          value: value
        });
      }
    } else {
      for (let jj = 0; jj < possibleJumpMove.length; jj++) {
        const jumpState = JSON.parse(JSON.stringify(next));
        const [rowJump, columnJump] = possibleJumpMove[jj];
        jumpState.clickedNow = [rowJump, columnJump];

        let result = execute(jumpState);

        while (result.turn === 1) {
          result.clickedNow = result.possibleJumpMove[0];
          result = execute(result);
        }

        let value;

        if (depth === 0) {
          value = result.piecePlayerBlue - result.piecePlayerRed;
        } else {
          const resMax = max(result, depth - 1, alpha, beta);

          if (resMax === undefined) {
            break;
          }

          value = resMax.value;
        }

        if (value < beta) {
          beta = value;
        }

        if (beta <= alpha) {
          break;
        }

        possibleState.push({
          nextState: result,
          value: value
        });
      }
    }
  }

  possibleState.sort(() => Math.round(Math.random()) * 2 - 1);

  possibleState.sort((x, y) => {
    return x.value - y.value;
  });

  console.log("min pos", possibleState);

  return possibleState[0];
}