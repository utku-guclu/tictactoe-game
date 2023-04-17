import View from "./view";
import Store from "./store";
import { Player } from "./types";

const players: Player[] = [
  {
    id: 1,
    name: "Player 1",
    iconClass: "fa-x",
    colorClass: "turquoise",
  },
  {
    id: 2,
    name: "Player 2",
    iconClass: "fa-o",
    colorClass: "yellow",
  }
]

function init() {
  const view = new View();
  const store = new Store("live-t3-storage-key", players);

  // Current tab state changes
  store.addEventListener('statechange', () => {
    view.render(store.game, store.stats);
  })

  // Different tab state chnages
  window.addEventListener("storage", () => {
    console.log("State changed from another tab");
    view.render(store.game, store.stats);
  });

  // view current status // The first load of the document
  view.render(store.game, store.stats);
  // view current status //

  view.bindGameResetEvent(
    //CALL
    () => {
      store.reset();
    }
  );

  view.bindNewRoundEvent(() => {
    store.newRound();
  });

  view.bindPlayerMoveEvent((square) => {
    // use callback here -> square
    const exisitingMove = store.game.moves.find(
      (move) => move.squareId === +square.id
    );

    if (exisitingMove) return; // play only once per square

    // update player move
    // Advance to the next state by pushing a move to the moves array
    store.playerMove(+square.id);
  });
}

window.addEventListener("load", init);
