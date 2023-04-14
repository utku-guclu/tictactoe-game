import View from "./view.js";
import Store from "./store.js";

// const App = {
//   // All of our selected HTML elements
//   $: {
//     menu: document.querySelector('[data-id="menu"]'),
//     menuItems: document.querySelector('[data-id="menu-items"]'),
//     resetBtn: document.querySelector('[data-id="reset-btn"]'),
//     newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
//     squares: document.querySelectorAll('[data-id="square"]'),
//     modal: document.querySelector('[data-id="modal"]'),
//     modalText: document.querySelector('[data-id="modal-text"]'),
//     modalBtn: document.querySelector('[data-id="modal-btn"]'),
//     turn: document.querySelector('[data-id="turn"]'),
//   },

//   state: {
//     moves: [],
//   },

//   getGameStatus(moves) {
//     const playerMoves = moves
//       .filter((move) => move.isPlayer)
//       .map((move) => move.squareId);
//     const cpuMoves = moves
//       .filter((move) => !move.isPlayer)
//       .map((move) => move.squareId);

//     // winning pattern
//     const winningPatterns = [
//       [1, 2, 3],
//       [1, 5, 9],
//       [3, 5, 7],
//       [1, 4, 7],
//       [2, 5, 8],
//       [3, 6, 9],
//       [4, 5, 6],
//       [7, 8, 9],
//     ];

//     let winner = null;

//     winningPatterns.forEach((pattern) => {
//       const playerWins = pattern.every((v) => playerMoves.includes(v));
//       const cpuWins = pattern.every((v) => cpuMoves.includes(v));

//       if (playerWins) winner = 1;
//       if (cpuWins) winner = 2;
//     });

//     return {
//       status:
//         moves.length === 9 || winner !== null ? "complete" : "in-progress", // in-progress | complete
//       winner, // true | false | null
//     };
//   },

//   init() {
//     App.registerEventListeners();
//   },

//   registerEventListeners() {
//     const {
//       menu,
//       menuItems,
//       resetBtn,
//       newRoundBtn,
//       squares,
//       modal,
//       modalBtn,
//       modalText,
//       turn,
//     } = App.$;

//     menu.addEventListener("click", () => {
//       menuItems.classList.toggle("hidden");
//     });
//     resetBtn.addEventListener("click", () => {
//       console.log("1");
//     });
//     newRoundBtn.addEventListener("click", () => {
//       console.log("1");
//     });
//     modalBtn.addEventListener("click", () => {
//       App.state.moves = [];
//       squares.forEach((square) => square.replaceChildren());
//       modal.classList.add("hidden");
//     });

//     squares.forEach((square) =>
//       square.addEventListener("click", () => {
//         this.getGameStatus(App.state.moves);
//         // check if there is already a play
//         const hasMove = (squareId) => {
//           const existingMove = App.state.moves.find(
//             (move) => move.squareId === squareId
//           );
//           return existingMove;
//         };

//         if (hasMove(+square.id)) {
//           return;
//         }
//         // determine whether the player is person
//         const lastMove = App.state.moves.at(-1);
//         const isPlayer = (player) => !player;
//         const currentPlayer =
//           this.state.moves.length === 0 ? true : isPlayer(lastMove.isPlayer);

//         const turnLabel = document.createElement("p");
//         const turnIcon = document.createElement("i");
//         const squareIcon = document.createElement("p");
//         const iconXO = currentPlayer ? "fa-x" : "fa-o";
//         const turnIconXO = !currentPlayer ? "fa-x" : "fa-o";
//         const turnIconColor = currentPlayer ? "turquoise" : "yellow";
//         const iconColor = currentPlayer ? "yellow" : "turquoise";
//         const nextTurn = !currentPlayer ? "player" : "computer";

//         turnLabel.innerText = `${nextTurn} is up!`;

//         squareIcon.classList.add("fa-solid", iconXO, iconColor);
//         turnIcon.classList.add("fa-solid", turnIconXO, turnIconColor);
//         turnLabel.classList = turnIconColor;
//         turn.replaceChildren(turnIcon, turnLabel);

//         this.state.moves.push({
//           squareId: +square.id,
//           isPlayer: currentPlayer,
//         });

//         this.state.currentPlayer = isPlayer(currentPlayer);

//         square.replaceChildren(squareIcon);
//         // check if there is a winner or tie game
//         const game = App.getGameStatus(App.state.moves);

//         if (game.status === "complete") {
//           let message;
//           if (game.winner === 1) {
//             message = `Player wins!`;
//           } else if (game.winner === 2) {
//             message = `Computer wins!`;
//           } else {
//             message = `TIE!`;
//           }
//           modalText.textContent = message;
//           modal.classList.remove("hidden");
//         }
//       })
//     );
//   },
// };

// window.addEventListener("load", App.init);

class player {
  constructor(id, name, iconClass, colorClass) {
    (this.id = id),
      (this.name = name),
      (this.iconClass = iconClass),
      (this.colorClass = colorClass);
  }
}

const player1 = new player(1, "Player 1", "fa-x", "turquoise");
const player2 = new player(2, "Player 2", "fa-o", "yellow");

const players = [player1, player2];

function init() {
  const view = new View();
  const store = new Store(players);

  view.bindGameResetEvent((e) => {
    console.log("Reset event");
    console.log(e);
  });

  view.bindNewRoundEvent((e) => {
    console.log("Round event");
    console.log(e);
  });

  view.bindPlayerMoveEvent((square) => {
    // use callback here -> square
    const exisitingMove = store.game.moves.find(
      (move) => move.squareId === +square.id
    );

    if (exisitingMove) return; // play only once per square
    // (view) move
    // Place an icon of the current player in square
    view.handlePlayerMove(square, store.game.currentPlayer);
    // update player move
    // Advance to the next state by pushing a move to the moves array
    store.playerMove(+square.id);
    // (view) turn
    // Set the next player's turn indicator
    view.setTurnIndicator(store.game.currentPlayer);
  });
}

window.addEventListener("load", init);
