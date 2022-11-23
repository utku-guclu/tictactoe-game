var originalBoard;
const human = "O";
const cpu = "X";
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

const restartButton = document.getElementById("restart-btn");
const cells = document.querySelectorAll(".cell");
const result = document.querySelector(".endgame");
startGame();

function startGame() {
  document.querySelector(".endgame").style.display = "none";
  originalBoard = Array.from(Array(9).keys());
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
    cells[i].style.removeProperty("background-color");
    cells[i].addEventListener("click", turnClick, false);
  }
}

// square == event
function turnClick(square) {
  if (typeof originalBoard[square.target.id] === "number") {
    // human plays
    turn(square.target.id, human);
    // cpu plays
    if (!checkWin(originalBoard, human) && !checkTie()) turn(bestSpot(), cpu);
  }
}

function turn(squareId, player) {
  originalBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;
  let gameWon = checkWin(originalBoard, player);
  if (gameWon) gameOver(gameWon);
}

function checkWin(board, player) {
  let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);

  let gameWon = false;
  for (let [index, win] of winCombos.entries()) {
    // has the player played every spot that counts as a win ==> winCombos
    if (win.every((elem) => plays.indexOf(elem) > -1)) {
      gameWon = { index: index, player: player };
      break;
    }
  }
  return gameWon;
}

function declareWinner(who) {
  result.style.display = "block";
  document.querySelector(".endgame .text").innerText = who;
  restartButton.style.display = "block";
}

function gameOver(gameWon) {
  for (let index of winCombos[gameWon.index]) {
    document.getElementById(index).style.backgroundColor =
      gameWon.player === human ? "blue" : "red";
    for (let i = 0; i < cells.length; i++) {
      cells[i].removeEventListener("click", turnClick, false);
    }
  }
  let resultText = "";
  if (gameWon.player === human) {
    resultText = "You win!";
    result.style.backgroundColor = "rgb(19 213 19 / 0.9)";
  } else {
    resultText = "You lose!";
    result.style.backgroundColor = "rgb(18 17 16 / 90%)";
  }
  declareWinner(resultText);
}

function emptySquares() {
  return originalBoard.filter((s) => typeof s === "number");
}

// find spot to play for aiPLayer
function bestSpot() {
  // choose random spot
  const randomSpot = Math.floor(Math.random() * emptySquares().length);
  return emptySquares()[randomSpot];
}

function checkTie() {
  if (emptySquares().length === 0) {
    for (let i = 0; i < cells.length; i++) {
      cells[i].style.backgroundColor = "green";
      cells[i].removeEventListener("click", turnClick, false);
    }
    result.style.backgroundColor = "rgb(36 61 143 / 90%)";
    declareWinner("Tie!");
    return true;
  }
  return false;
}

restartButton.addEventListener("click", (e) => {
  e.target.style.display = "none";
});
