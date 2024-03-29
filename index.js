const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const body = document.querySelector("body");

canvas.width = innerWidth;
canvas.height = innerHeight;

const scoreEl = document.querySelector("#scoreEl");
const startGameBtn = document.querySelector("#startGameBtn");
const modalEl = document.querySelector("#modalEl");
const bigScoreEl = document.querySelector("#bigScoreEl");

class Player {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.shadowColor = this.color;
    c.shadowBlur = 9;
    c.fillStyle = this.color;
    c.fill();
  }
}

function drawPlayer(x, y) {
  const playerElement = document.getElementById("player");
  playerElement.style.left = x + "0px"; // Set the x position
  playerElement.style.top = y + "0px"; // Set the y position
}

class Projectile {
  constructor(x, y, radius, color, velocity, shape) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.shape = shape;
  }

  draw() {
    c.beginPath();

    // Draw a number 1 shape
    if (this.shape === "one") {
      c.font = `${this.radius * 5}px Arial`;
      c.fillStyle = this.color;
      c.fillText("1", this.x - this.radius, this.y + this.radius);

      // Draw a number 0 shape
    } else if (this.shape === "zero") {
      c.font = `${this.radius * 5}px Arial`;
      c.fillStyle = this.color;
      c.fillText("0", this.x - this.radius, this.y + this.radius);
    }
  }

  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    // Check collision with enemies
    enemies.forEach((enemy) => {
      const distance = Math.hypot(this.x - enemy.x, this.y - enemy.y);

      if (distance - this.radius - enemy.radius < 1) {
        // Collision detected
        // Change color after collision
        this.color = "red";
        this.shape = "zero";
        this.shape = "one"; // Change the color to red (you can set any color you want)
      }
    });

    // Check collision with canvas boundary
    if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
      this.velocity.x = -this.velocity.x; // Reverse x velocity
    }

    if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
      this.velocity.y = -this.velocity.y; // Reverse y velocity
      // Collision with canvas boundary detected
      this.color = "blue";
      this.shape = "one";
    }
  }
}

class Enemy {
  constructor(x, y, radius, color, velocity, shape) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.shape = shape;
  }

  draw() {
    c.beginPath();

    // Draw a circle shape enemy
    if (this.shape === "circle") {
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

      // Draw a square shape enemy
    } else if (this.shape === "square") {
      c.rect(
        this.x - this.radius,
        this.y - this.radius,
        this.radius * 2,
        this.radius * 2
      );

      // Draw a triangle shape enemy
    } else if (this.shape === "triangle") {
      // Draw a triangle
      c.moveTo(this.x, this.y - this.radius);
      c.lineTo(this.x + this.radius, this.y + this.radius);
      c.lineTo(this.x - this.radius, this.y + this.radius);

      // draw an octagon shape enemy
    } else if (this.shape === "octagon") {
      // Draw an octagon
      let angle = Math.PI / 4;
      c.moveTo(
        this.x + this.radius * Math.cos(0),
        this.y + this.radius * Math.sin(0)
      );

      for (let i = 1; i < 8; i++) {
        c.lineTo(
          this.x + this.radius * Math.cos(angle * i),
          this.y + this.radius * Math.sin(angle * i)
        );
      }

      // draw a rectangle shape enemy
    } else if (this.shape === "rectangle") {
      // Draw a rectangle
      c.rect(
        this.x - this.radius,
        this.y - this.radius / 2,
        this.radius,
        this.radius / 2
      );

      // trapezoid shape enemy
    } else if (this.shape === "trapezoid") {
      // Draw a trapezoid
      c.moveTo(this.x - this.width / 2, this.y + this.height / 2);
      c.lineTo(this.x + this.width / 2, this.y + this.height / 2);
      c.lineTo(this.x + 2 * this.width, this.y - this.height / 2);
      c.lineTo(this.x - 4 * this.width, this.y - this.height / 2);

      // boss 1 shape
    } else if (this.shape === "boss1") {
      // Draw the boss base circle
      c.fillStyle = "red";
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2.75);
      c.fill();

      // Draw eyes (white circles) for boss
      c.fillStyle = "white";
      c.beginPath();
      c.arc(this.x - 15, this.y - 15, 5, 0, Math.PI * 2);
      c.fill();
      c.beginPath();
      c.arc(this.x + 15, this.y - 15, 5, 0, Math.PI * 2);
      c.fill();

      // Draw mouth (frown emoji) for boss
      c.strokeStyle = "white";
      c.lineWidth = 3;
      c.beginPath();
      c.arc(this.x, this.y + 10, 15, 1 * Math.PI, 2 * Math.PI, false);
      c.stroke();
      // c.beginPath();
      // c.arc(this.x, this.y + 10, 15, 1.25 * Math.PI, 1.75 * Math.PI, false);
      c.stroke();

      // boss 2 shape
    } else if (this.shape === "boss2") {
      // Draw the boss shape
      c.fillStyle = "blue";
      c.fillRect(
        this.x - this.radius,
        this.y - this.radius,
        this.radius * 2,
        this.radius * 4
      );

      // Draw eyes (white circles) for boss
      c.fillStyle = "white";
      c.arc(this.x - 15, this.y - 15, 5, 0, Math.PI * 2, false);
      c.fill();
      c.arc(this.x + 15, this.y - 15, 5, 0, Math.PI * 2, false);
      c.fill();

      // Draw frown (curved line) for boss
      c.strokeStyle = "white";
      c.beginPath();
      c.arc(this.x, this.y + 10, 15, 0, Math.PI, true);
      c.stroke();

      // Draw boss 3 shape
    } else if (this.shape === "boss3") {
      c.save(); // Save the current canvas state

      // Draw horns (triangular shapes) on the boss
      c.beginPath();
      c.moveTo(this.x - this.radius * 1, this.y - this.radius * 1);
      c.lineTo(this.x - this.radius * 0.5, this.y - this.radius * 0.6);
      c.lineTo(this.x - this.radius * 0.4, this.y - this.radius * 1);
      c.closePath();
      c.fillStyle = this.color;
      c.fill();

      c.beginPath();
      c.moveTo(this.x + this.radius * 1, this.y - this.radius * 1);
      c.lineTo(this.x + this.radius * 0.5, this.y - this.radius * 0.6);
      c.lineTo(this.x + this.radius * 0.4, this.y - this.radius * 1);
      c.closePath();
      c.fillStyle = this.color;
      c.fill();

      // Draw large circle boss shape resembling 👿 emoji
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      c.fillStyle = this.color;
      c.fill();

      // Eyes (small circles inside the boss shape) - Adjust positions as needed
      c.beginPath();
      c.arc(
        this.x - this.radius * 0.4,
        this.y - this.radius * 0.3,
        this.radius * 0.2,
        0,
        Math.PI * 2
      );
      c.fillStyle = "white";
      c.fill();

      c.beginPath();
      c.arc(
        this.x + this.radius * 0.4,
        this.y - this.radius * 0.3,
        this.radius * 0.2,
        0,
        Math.PI * 2
      );
      c.fill();

      // Mouth (arc inside the boss shape)
      c.beginPath();
      c.arc(
        this.x,
        this.y + this.radius * 0.5,
        this.radius * 0.4,
        Math.PI * 0.2,
        Math.PI * 0.8
      );
      c.strokeStyle = "black";
      c.lineWidth = this.radius * 0.1;
      c.stroke();
    } else if (this.shape === "boss4") {
      c.fillStyle = this.color;
      c.moveTo(this.x, this.y - this.radius);
      c.lineTo(this.x + this.radius, this.y + this.radius);
      c.lineTo(this.x - this.radius, this.y + this.radius);
      c.closePath();
      c.fill();

      // Draw a red circle eye in the center
      c.beginPath();
      c.fillStyle = "white";
      c.arc(this.x, this.y, this.radius * 0.3, 0, Math.PI * 2, false);
      c.fill();
      c.closePath();

      c.restore(); // Restore the previous canvas state
    }
    c.fillStyle = this.color;
    c.fill();
    c.closePath();

    c.shadowColor = "white"; // Bright glow color
    c.shadowBlur = 8; // Increase shadow blur for glow effect
    c.fillStyle = this.color;
    c.fill();
  }

  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

const friction = 1;
class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
  }

  draw() {
    c.save();
    c.globalAlpha = this.alpha;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.restore();
  }

  update() {
    this.draw();
    this.velocity.x *= friction;
    this.velocity.y *= friction;
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
    this.alpha -= 0.01;
  }
}

const x = canvas.width / 2;
const y = canvas.height / 2;

let player = new Player(x, y, 10, "white");
let projectiles = [];
let enemies = [];
let particles = [];

function init() {
  player = new Player(x, y, 10, "white");
  projectiles = [];
  enemies = [];
  particles = [];
  score = 0;
  scoreEl.innerHTML = score;
  bigScoreEl.innerHTML = score;
}

function spawnEnemies() {
  if (paused === false) {
    setInterval(() => {
      const radius = Math.random() * (60 - 4) + 4;

      let x;
      let y;

      if (Math.random() < 0.5) {
        x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
        y = Math.random() * canvas.height;
      } else {
        x = Math.random() * canvas.width;
        y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
      }

      const color = `hsl(${Math.random() * 360}, 50%, 50%)`;

      const shapes = [
        "circle",
        "square",
        "triangle",
        "octagon",
        "rectangle",
        "trapezoid",
        "boss1",
        "boss2",
        "boss3",
        "boss4",
      ];
      const selectedShape = shapes[Math.floor(Math.random() * shapes.length)]; // Randomly choosing a shape

      const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
      const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle),
      };

      enemies.push(new Enemy(x, y, radius, color, velocity, selectedShape));
    }, 2600);
  } else if (paused) {
    console.log("Game is paused");
    return;
  }
}

// Call spawnEnemies function to start spawning enemies with random shapes
// spawnEnemies();

// In summary, this code manages the animation loop, clears the canvas with a semi-transparent effect, updates and draws particles and projectiles, and maintains the smooth animation on the canvas.
let animationId;
let score = 0;
function animate() {
  if (paused === false) {
    animationId = requestAnimationFrame(animate);
    c.fillStyle = "rgba(1.5, 1.5, 1.5, 0.5)";
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.draw();
    particles.forEach((particle, index) => {
      if (particle.alpha <= 0) {
        particles.splice(index, 1);
      } else {
        particle.update();
      }
    });
    projectiles.forEach((projectile, index) => {
      projectile.update();

      // remove from edges of screen
      if (
        projectile.x + projectile.radius < 0 ||
        projectile.x - projectile.radius > canvas.width ||
        projectile.y + projectile.radius < 0 ||
        projectile.y - projectile.radius > canvas.height
      ) {
        setTimeout(() => {
          projectiles.splice(index, 1);
        }, 0);
      }
    });

    enemies.forEach((enemy, index) => {
      enemy.update();

      const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
      // end game
      if (dist - enemy.radius - player.radius < 1) {
        cancelAnimationFrame(animationId);
        modalEl.style.display = "flex";
        bigScoreEl.innerHTML = score;
      }

      projectiles.forEach((projectile, projectileIndex) => {
        const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

        // when projectiles touch enemy
        if (dist - enemy.radius - projectile.radius < 1) {
          const explosionSound = new Audio("./assets/burst.wav");
          explosionSound.play();
          for (let i = 0; i < enemy.radius * 2; i++) {
            particles.push(
              new Particle(
                projectile.x,
                projectile.y,
                Math.random() * 2,
                enemy.color,
                {
                  x: (Math.random() - 0.5) * (Math.random() * 8),
                  y: (Math.random() - 0.5) * (Math.random() * 8),
                }
              )
            );
          }

          if (enemy.radius - 10 > 5) {
            //increase our score
            score += 100;
            scoreEl.innerHTML = score;

            gsap.to(enemy, {
              radius: enemy.radius - 10,
            });
            setTimeout(() => {
              projectiles.splice(projectileIndex, 1);
            }, 0);
          } else {
            // remove from scene altogether
            score += 250;
            scoreEl.innerHTML = score;
            setTimeout(() => {
              enemies.splice(index, 1);
              projectiles.splice(projectileIndex, 1);
            }, 0);
          }
        }
      });
    });
  } else if (paused) {
    console.log("Game is paused");
    return;
  }
}

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
