const App = {
  // All of our selected HTML elements
  $: {
    menu: document.querySelector('[data-id="menu"]'),
    menuItems: document.querySelector('[data-id="menu-items"]'),
    resetBtn: document.querySelector('[data-id="reset-btn"]'),
    newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
    squares: document.querySelectorAll('[data-id="square"]'),
  },

  state: {
    moves: [],
  },

  getGameStatus(moves) {
    const playerMoves = moves
      .filter((move) => move.isPlayer)
      .map((move) => move.squareId);
    const cpuMoves = moves.filter((move) => !move.isPlayer);

    // winning pattern
    const winningPatterns = [
      [1, 2, 3],
      [1, 5, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [4, 5, 6],
      [7, 8, 9],
    ];

    let winner = null;

    winningPatterns.forEach((pattern) => {
      const playerWins = pattern.every((v) => playerMoves.includes(v));
      if (playerWins) {
        console.log("player wins");
      }
    });

    return {
      status: "in-progress",
      winner,
    };
  },

  init() {
    App.registerEventListeners();
  },

  registerEventListeners() {
    const { menu, menuItems, resetBtn, newRoundBtn, squares } = App.$;

    menu.addEventListener("click", () => {
      menuItems.classList.toggle("hidden");
    });
    resetBtn.addEventListener("click", () => {
      console.log("1");
    });
    newRoundBtn.addEventListener("click", () => {
      console.log("1");
    });
    squares.forEach((square) =>
      square.addEventListener("click", () => {
        this.getGameStatus(App.state.moves);
        // check if there is already a play
        const hasMove = (squareId) => {
          const existingMove = App.state.moves.find(
            (move) => move.squareId === squareId
          );
          return existingMove;
        };

        if (hasMove(+square.id)) {
          return;
        }
        // determine whether the player is person
        const lastMove = App.state.moves.at(-1);
        const isPlayer = (player) => !player;
        const currentPlayer =
          this.state.moves.length === 0 ? true : isPlayer(lastMove.isPlayer);

        const icon = document.createElement("i");
        const iconXO = currentPlayer ? "fa-x" : "fa-o";
        icon.classList.add("fa-solid", iconXO, "yellow");

        this.state.moves.push({
          squareId: +square.id,
          isPlayer: currentPlayer,
        });

        this.state.currentPlayer = isPlayer(currentPlayer);

        square.replaceChildren(icon);
      })
    );
  },
};

window.addEventListener("load", App.init);
