let correctNumber = document.querySelector(".correct-number");
const guessRange = document.querySelector(".guess-range");
let playerNumber = document.querySelector(".player-number-input");
const guessButton = document.querySelector(".guess-btn");
let playerLives = document.querySelector(".player-lives-count");
let highscore = document.querySelector(".highscore-count");
const menu = document.querySelector(".game-menu");
let chosenGameMode = [];

guessButton.addEventListener("click", checkIfNumbersMatch);
menu.addEventListener("click", gameMenu);

let targetNumber = Math.floor(Math.random() * 10 + 1);
let lives = 12;
playerLives.textContent = lives;
let highscoreValue = 0;
highscore.textContent = highscoreValue;
localStorageData();

function checkIfNumbersMatch() {
  if (!playerNumber.value) {
    return;
  }

  if (+playerNumber.value === targetNumber) {
    correctNumber.textContent = targetNumber;
    guessRange.textContent = "You've won!";
    guessButton.classList.add("guess-btn-disabled");
    playerNumber.setAttribute("disabled", "");
    playerWon();
  } else {
    playerLost();
  }
  playerNumber.value = "";
  playerNumber.focus();
}

function playerWon() {
  updateHighscore();

  guessButton.classList.add("guess-btn-disabled");
  playerNumber.setAttribute("disabled", "");
  if (chosenGameMode[0] === "easy") {
    lives = 12;
    playerLives.textContent = lives;
  } else if (chosenGameMode[0] === "normal") {
    lives = 8;
    playerLives.textContent = lives;
  } else if (chosenGameMode[0] === "hard") {
    lives = 5;
    playerLives.textContent = lives;
  }
  localStorage.setItem("highscore", highscoreValue);
}
function playerLost() {
  loseLife();
  if (+playerNumber.value > targetNumber) {
    guessRange.textContent = "Too High!!!";
  } else if (+playerNumber.value < targetNumber) {
    guessRange.textContent = "Too Low!!!";
  }
  if (lives <= 0) {
    lostGame();
  }
}
function updateHighscore() {
  switch (chosenGameMode[0]) {
    case "easy":
      if (lives > highscoreValue) {
        highscoreValue = lives;
        highscore.textContent = highscoreValue;
        localStorage.setItem("highscore", highscoreValue);
      }
      break;
    case "normal":
      if (lives > highscoreValue) {
        highscoreValue = lives * 2;
        highscore.textContent = highscoreValue;
        localStorage.setItem("highscore", highscoreValue);
      }
      break;
    case "hard":
      if (lives > highscoreValue) {
        highscoreValue = lives * 6;
        highscore.textContent = highscoreValue;
        localStorage.setItem("highscore", highscoreValue);
      }
      break;
  }
}
console.log(localStorage);

function generateNewTargetNumber() {
  switch (chosenGameMode[0]) {
    case "easy":
      targetNumber = Math.floor(Math.random() * 10 + 1);
      break;
    case "normal":
      targetNumber = Math.floor(Math.random() * 15 + 1);
      break;
    case "hard":
      targetNumber = Math.floor(Math.random() * 20 + 1);
      break;
    default:
      return;
  }
}
function loseLife() {
  lives--;
  playerLives.textContent = lives;
}
function lostGame() {
  guessRange.textContent = "You've lost!";
  guessButton.classList.add("guess-btn-disabled");
  playerNumber.setAttribute("disabled", "");
}
function gameMenu() {
  const gameOptions = document.querySelector(".game-options");
  const line1 = document.querySelector(".hamburger-1");
  const line2 = document.querySelector(".hamburger-2");
  const line3 = document.querySelector(".hamburger-3");
  line1.classList.toggle("game-menu-clicked-1");
  line2.classList.toggle("hidden");
  line3.classList.toggle("game-menu-clicked-2");
  gameOptions.classList.toggle("show");
}
function newGame() {
  gameMenu();
  generateNewTargetNumber();
  guessRange.textContent = "";
  lives = 12;
  playerLives.textContent = lives;
  guessRange.textContent = "";
  console.log(targetNumber);
  console.log(chosenGameMode);
  location.reload();
}
function easyMode() {
  gameMenu();
  generateNewTargetNumber();
  guessButton.classList.remove("guess-btn-disabled");
  playerNumber.removeAttribute("disabled", "");
  guessRange.textContent = "";
  correctNumber.textContent = "?";
  playerNumber.placeholder = "0-10";
  lives = 12;
  playerLives.textContent = lives;
  chosenGameMode = [];
  chosenGameMode.push("easy");
  console.log(targetNumber);
  console.log(chosenGameMode);
}
function normalMode() {
  gameMenu();
  generateNewTargetNumber();
  guessButton.classList.remove("guess-btn-disabled");
  playerNumber.removeAttribute("disabled", "");
  guessRange.textContent = "";
  correctNumber.textContent = "?";
  playerNumber.placeholder = "0-15";
  lives = 8;
  playerLives.textContent = lives;
  chosenGameMode = [];
  chosenGameMode.push("normal");
  console.log(targetNumber);
  console.log(chosenGameMode);
}
function hardMode() {
  gameMenu();
  generateNewTargetNumber();
  guessButton.classList.remove("guess-btn-disabled");
  playerNumber.removeAttribute("disabled", "");
  guessRange.textContent = "";
  correctNumber.textContent = "?";
  playerNumber.placeholder = "0-20";
  lives = 5;
  playerLives.textContent = lives;
  chosenGameMode = [];
  chosenGameMode.push("hard");
  console.log(targetNumber);
  console.log(chosenGameMode);
}
function localStorageData() {
  if (localStorage.getItem("highscore")) {
    highscoreValue = localStorage.getItem("highscore");
    highscore.textContent = highscoreValue;
  }
}
console.log(targetNumber);
console.log(chosenGameMode);
