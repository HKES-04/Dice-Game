"use strict";

//Variables
const score_0 = document.querySelector("#score--0");
const score_1 = document.querySelector("#score--1");
const dice = document.querySelector(".dice");
const newButton = document.querySelector(".btn--new");
const rollButton = document.querySelector(".btn--roll");
const holdButton = document.querySelector(".btn--hold");
const currentScore_0 = document.querySelector("#current--0");
const currentScore_1 = document.querySelector("#current--1");
const player_0 = document.querySelector(".player--0");
const player_1 = document.querySelector(".player--1");


// Initializing the values of variables
let currentScore, currentlyPlaying, scores, activePlayer;
resetIntialization();


// Functions
function switchPlayer() {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player_0.classList.toggle("player--active");
  player_1.classList.toggle("player--active");
}

function resetIntialization() {
  score_0.textContent = 0;
  score_1.textContent = 0;
  currentScore_0.textContent = 0;
  currentScore_1.textContent = 0;
  dice.classList.remove("hidden");
  document;
  player_0.classList.remove("player--winner");
  player_1.classList.remove("player--winner");
  player_0.classList.add("player--active");
  player_1.classList.remove("player--active");
  dice.classList.add("hidden");
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  currentlyPlaying = true;
}


// Rolling the dice
rollButton.addEventListener("click", function () {
  if (currentlyPlaying) {
    // Generates a random number for the dice roll
    const randomDice = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove("hidden");
    dice.src = `images/dice-${randomDice}.png`;

    // Checks if the dice rolled is a 1
    if (randomDice === 1) {
      switchPlayer();
    } else {
      currentScore += randomDice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

// Holding to save the current score
holdButton.addEventListener("click", function () {
  if (currentlyPlaying) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    // If a player has a score of 50+, they win!
    if (scores[activePlayer] >= 50) {
      currentlyPlaying = false;
      dice.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

// Resetting the game
newButton.addEventListener("click", resetIntialization);
