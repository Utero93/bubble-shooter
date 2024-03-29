const canvas = document.querySelector("canvas");
// const c = canvas.getContext("2d");
// const body = document.querySelector("body");

import Player from "./assets/scripts/Player.js";
import Projectile from "./assets/scripts/Projectile.js";
// import Enemy from "./assets/scripts/Enemy.js";
// import Particle from "./assets/scripts/Particle.js";
import { spawnEnemies } from "./assets/scripts/spawnEnemies.js";
import { animate } from "./assets/scripts/animate.js";

canvas.width = innerWidth;
canvas.height = innerHeight;

const scoreEl = document.querySelector("#scoreEl");
const startGameBtn = document.querySelector("#startGameBtn");
const modalEl = document.querySelector("#modalEl");
const bigScoreEl = document.querySelector("#bigScoreEl");

// declared but never used
// function drawPlayer(x, y) {
//   const playerElement = document.getElementById("player");
//   playerElement.style.left = x + "0px"; // Set the x position
//   playerElement.style.top = y + "0px"; // Set the y position
// }

// const friction = 1;
const x = canvas.width / 2;
const y = canvas.height / 2;

// let player = new Player(x, y, 10, "white");
// let projectiles = [];
// let enemies = [];
// let particles = [];
// let score = 0;

function init() {
  let player = new Player(x, y, 10, "white");
  let projectiles = [];
  let enemies = [];
  let particles = [];
  let score = 0;
  scoreEl.innerHTML = score;
  bigScoreEl.innerHTML = score;
}

// Call spawnEnemies function to start spawning enemies with random shapes
// spawnEnemies();


let mouseDown = false;

// Add sound effect for projectiles
const projectileSound = new Audio("./assets/lighthumburst.wav");

// Event listener for mouse down to play projectile sound
window.addEventListener("mousedown", () => {
  projectileSound.play();
});

canvas.addEventListener("mousemove", (event) => {
  if (mouseDown) {
    const angle = Math.atan2(
      event.clientY - canvas.height / 2,
      event.clientX - canvas.width / 2
    );

    const velocity = {
      x: Math.cos(angle) * 4,
      y: Math.sin(angle) * 4,
    };

    const randomSize = Math.floor(Math.random() * 2) + 5;

    projectiles.push(
      new Projectile(
        canvas.width / 2,
        canvas.height / 2,
        randomSize,
        "orange",
        velocity,
        "zero",
        "one"
      )
    );
  }
});

// Listen for mouse down
let mouseHoldTimer;

canvas.addEventListener("mousedown", (event) => {
  mouseDown = true;
  canvas.removeEventListener("mouseup", mouseUpHandler);

  function mouseUpHandler() {
    clearTimeout(mouseHoldTimer); // Clear the timer if mouse is released before firing
    mouseDown = false;
    canvas.removeEventListener("mousemove", mouseMoveHandler);
    canvas.removeEventListener("mouseup", mouseUpHandler);
  }

  canvas.addEventListener("mousemove", mouseMoveHandler);

  function mouseMoveHandler(event) {
    clearTimeout(mouseHoldTimer); // Clear any existing timer
    mouseHoldTimer = setTimeout(() => {
      // Code to interrupt the projectile when the mouse is held down for too long
      console.log("Mouse held down for too long, interrupting projectile");
    }, 8); // Set a delay of 1 second (1000 milliseconds) before interrupting the projectile

    const angle = Math.atan2(
      event.clientY - canvas.height / 2,
      event.clientX - canvas.width / 2
    );

    const velocity = {
      x: Math.cos(angle) * 4,
      y: Math.sin(angle) * 4,
    };

    const randomSize = Math.floor(Math.random() * 2) + 5;

    projectiles.push(
      new Projectile(
        canvas.width / 2,
        canvas.height / 2,
        randomSize,
        velocity,
        "zero",
        "one"
      )
    );
  }

  canvas.addEventListener("mouseup", mouseUpHandler);
});

// In this script:
// 1. We select the button element with the id 'returnButton'.
// 2. We add an event listener for the click event on the button.
// 3. When the button is clicked, it will redirect the user to `title.html`.

document.addEventListener("DOMContentLoaded", function () {
  // Get the Return button element
  var returnButton = document.getElementById("returnButton");

  // Add an event listener for the click event
  returnButton.addEventListener("click", function () {
    window.location.href = "title.html"; // Redirect to title.html when the button is clicked
  });
});

// Define a variable to track whether the game is paused
let paused = false;
const pauseGameDiv = document.getElementById("pause-game"); // Get the pause-game div from the HTML

// toggle function for pause
function togglePause() {
  // if game is unpaused / on click set it to paused and show pause menu
  if (paused === false) {
    paused = true;
    pauseGameDiv.style.display = "block"; // Show the pause-game div
  }
  // if game is paused / on click set it to unpaused and run the animation and spawnEnemies functions / hides the pause menu
  else if (paused === true) {
    paused = false;
    pauseGameDiv.style.display = "none"; // Hide the pause-game div
    animate();
    spawnEnemies();
  }
}

// on keydown of p will toggle pause function
window.addEventListener("keydown", async (event) => {
  if (event.key === "p") {
    togglePause();
  }
});

// master function for starting game
function startGame() {
  if (paused === false) {
    init();
    animate();
    spawnEnemies();
    modalEl.style.display = "none";
  } else {
    console.log("Fatal Error! Game is starting in Pause");
    return;
  }
}

// on startButton click will run the master function
startGameBtn.addEventListener("click", () => {
  startGame();
});
