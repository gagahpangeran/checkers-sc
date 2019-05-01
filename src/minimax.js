import execute, { getPossibleClick } from "./utils";

function minimax(oldState) {
  const state = JSON.parse(JSON.stringify(oldState));
  const possibleClick = getPossibleClick("M", state.board);
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

        possibleState.push(execute(jumpState));
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

        possibleState.push(result);
      }
    }
  }

  return possibleState[0];
}

export default minimax;