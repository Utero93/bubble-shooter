// -------======= THIS CODE SELECTS AN HTML CANVAS ELEMENT ON THE WEBPAGE  -------======= \\

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const body = document.querySelector("body");

// -------======= THIS CODE SETS THE WIDTH AND HEIGHT OF THE CANVAS ELEMENT TO MATCH THE WIDTH AND HEIGHT OF THE BROWSER WINDOW. -------======= \\

canvas.width = innerWidth;
canvas.height = innerHeight;

// -------======= THIS CODE SELECTS ELEMENTS FROM THE HTML PAGE USING THEIR ID NAMES AND STORES THEM IN VARIABLES FOR FUTURE USE.  -------======= \\
const scoresEl = document.querySelector("#scoreEl");
const startGameBtn = document.querySelector("#startGameBtn");
const modalEl = document.querySelector("#modalEl");
const bigScoreEl = document.querySelector("#bigScoreEl");

// Variables for end game, input username 
let endEl = document.getElementById("end");
let submitEl = document.getElementById("submit");
let inputEl = document.getElementById("input");
let finalScoreEl = document.getElementById("finalscore");

// Variables for the scoreboard section
let scoreSectionEl = document.getElementById("score");
let scoreboardEl = document.getElementById("scoreboard");
let retryEl = document.getElementById("retry");
let clearEl = document.getElementById("clear");

// Variables for end game, input username 
let endEl = document.getElementById("end");
let submitEl = document.getElementById("submit");
let inputEl = document.getElementById("input");
let finalScoreEl = document.getElementById("finalscore");

// Variables for the scoreboard section
let scoreSectionEl = document.getElementById("score");
let scoreboardEl = document.getElementById("scoreboard");
let retryEl = document.getElementById("retry");
let clearEl = document.getElementById("clear");

let userShip = sessionStorage.getItem('userShip')
let shipImage = userShip


// -------======= THIS CODE DEFINES THE CLASS PLAYER THAT DESCRIBES A PLAYER OBJECT WITH POSITION (X AND Y COORDINATES), SIZE (RADIUS), COLOR. -------======= \\
class Player {
  constructor(shipImage, x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.shipImage = shipImage;
  }

  // -------======= A METHOD CALLED DRAW() THAT DRAWS A CIRCULAR SHAPE REPRESENTING THE PLAYER ON A CANVAS CONTEXT. -------======= \\
  // draw() {
  //   c.beginPath();
  //   c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  //   c.shadowColor = this.color;
  //   c.shadowBlur = 9;
  //   c.fillStyle = this.color;
  //   c.fill();
  // }

  // add center positioning
  draw() {
    // draws the background first and then repeats the it until window is filled
    const background = new Image();
    background.src = "./assets/Spac-bg.png";
    background.onload = function () {
      const ptrn = c.createPattern(background, 'repeat')
      c.fillStyle = ptrn
      c.fillRect(0, 0, canvas.width, canvas.height)
    };

    // draws the image for the player's ship
    // MUST GO AFTER THE BACKGROUND OR THE BACKGROUND WILL COVER THE SHIP
    const image = new Image();
    image.src = this.shipImage;
    image.onload = () => {
      c.beginPath();
      c.drawImage(image, this.x, this.y);
    };
  }
}

// -------======= THIS FUNCTION MOVES THE PLAYER ELEMENT ON THE WEB PAGE TO A SPECIFIC POSITION SET BY THE X AND Y COORDINATES.  -------======= \\
// function drawPlayer(x, y) {
//   const playerElement = document.getElementById("player");
//   playerElement.style.left = x + "0px"; // Set the x position
//   playerElement.style.top = y + "0px"; // Set the y position
// }

// -------======= THIS CLASS DEFINES A PROJECTILE WITH SPECIFIED POSITION, SIZE, COLOR, VELOCITY, AND SHAPE. -------======= \\
class Projectile {
  constructor(x, y, radius, color, velocity, shape) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.shape = shape;
  }
  // -------=======  THIS METHOD DRAWS A SHAPED BASED ON THE SPECIFIED SHAPE PROPERTY OF THE PROJECTILE. -------======= \\
  draw() {
    c.beginPath();

    // -------======= IF THE SHAPE IS "ONE", IT WILL DRAW THE NUMBER "1" AT THE SPECIFIED POSITION, SIZE, AND COLOR. -------======= \\
    if (this.shape === "one") {
      c.font = `${this.radius * 5}px Arial`;
      c.fillStyle = this.color;
      c.fillText("1", this.x - this.radius, this.y + this.radius);

      // -------======= IF THE SHAPE IS "ZERO", IT WILL DRAW THE NUMBER "0" AT THE SPECIFIED POSITION, SIZE, AND COLOR. -------======= \\
    } else if (this.shape === "zero") {
      c.font = `${this.radius * 5}px Arial`;
      c.fillStyle = this.color;
      c.fillText("0", this.x - this.radius, this.y + this.radius);
    }
  }
  // -------======= THIS METHOD UPDATES THE POSITION OF AN ELEMENT ON A SCREEN BY MOVING IT ACCORDING TO A SPECIFIED VELOCITY. -------======= \\
  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    // -------======= THIS CODE CALCULATES THE DISTANCE BETWEEN THE CURRENT ELEMENT AND EACH ENEMY IN AN ARRAY OF ENEMIES. -------======= \\
    enemies.forEach((enemy) => {
      const distance = Math.hypot(this.x - enemy.x, this.y - enemy.y);

      // -------======= THIS CODE CHECKS IF THE DISTANCE BETWEEN THE CURRENT ELEMENT AND AN ENEMY IN AN ARRAY OF ENEMIES IS LESS THAN THE SUM OF THEIR RADII. -------======= \\
      if (distance - this.radius - enemy.radius < 1) {
        this.color = "red"; // AND COLOR OF THE ELEMENT.
        this.shape = "one"; // IF THE CONDITION IS MET, IT INDICATES A COLLISION HAS OCCURRED AND CHANGES THE SHAPE
      }
    });

    // -------======= THIS CODE CHECKS IF THE ELEMENT IS REACHING THE SIDES OF THE CANVAS WIDTH. IF IT IS, IT REVERSES THE HORIZONTAL VELOCITY TO BOUNCE IT BACK WITHIN THE CANVAS BOUNDARIES. -------======= \\
    if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
      this.velocity.x = -this.velocity.x; // IF IT IS, IT REVERSES THE HORIZONTAL VELOCITY TO BOUNCE IT BACK WITHIN THE CANVAS BOUNDARIES.

      // -------=======  IT ALSO CHANGES THE COLOR AND SHAPE OF THE ELEMENT. -------======= \\
      this.color = "blue";
      this.shape = "one";
    }

    // -------======= THIS CODE CHECKS IF THE ELEMENT IS REACHING THE TOP OR BOTTOM OF THE CANVAS HEIGHT. -------======= \\
    if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
      this.velocity.y = -this.velocity.y; // IF IT IS, IT REVERSES THE VERTICAL VELOCITY TO BOUNCE IT BACK WITHIN THE CANVAS BOUNDARIES.

      // -------=======  IT ALSO CHANGES THE COLOR AND SHAPE OF THE ELEMENT. -------======= \\
      this.color = "blue";
      this.shape = "one";
    }
  }
}

// -------======= THIS CODE DEFINES A BLUEPRINT FOR CREATING ENEMY OBJECTS WITH SPECIFIED POSITION, SIZE, COLOR, VELOCITY, AND SHAPE.   -------======= \\
class Enemy {
  constructor(x, y, radius, color, velocity, shape) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.shape = shape;
  }
  // -------======= THIS CODE INITIATES A NEW PATH FOR DRAWING ON A CANVAS. -------======= \\
  draw() {
    c.beginPath();

    // -------======= THIS CODE DRAWS A CIRCLE-SHAPED ENEMY ON A CANVAS. -------======= \\
    if (this.shape === "circle") {
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

      // -------======= THIS CODE DRAWS A SQUARE-SHAPED ENEMY ON A CANVAS. -------======= \\
    } else if (this.shape === "square") {
      c.rect(
        this.x - this.radius,
        this.y - this.radius,
        this.radius * 4,
        this.radius * 4
      );

      // -------=======  THIS CODE DRAWS A TRIANGLE-SHAPED ENEMY ON A CANVAS. -------======= \\
    } else if (this.shape === "triangle") {
      c.moveTo(this.x, this.y - this.radius);
      c.lineTo(this.x + this.radius, this.y + this.radius);
      c.lineTo(this.x - this.radius, this.y + this.radius);

      // -------=======  THIS CODE DRAWS A OCTAGON-SHAPED ENEMY ON A CANVAS. -------======= \\
    } else if (this.shape === "octagon") {
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

      // -------=======  THIS CODE DRAWS A RECTANGLE-SHAPED ENEMY ON A CANVAS. -------======= \\
    } else if (this.shape === "rectangle") {
      c.rect(
        this.x - this.radius,
        this.y - this.radius / 2,
        this.radius,
        this.radius / 2
      );

      // -------======= THIS CODE DRAWS A RED CIRCULAR "BOSS" ENEMY ON A CANVAS. -------======= \\
    } else if (this.shape === "boss1") {
      c.fillStyle = "red";
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2.75);
      c.fill();

      // -------======= THIS CODE ADDS WHITE CIRCLES AS EYES TO THE RED CIRCULAR "BOSS" ENEMY ON THE CANVAS. -------======= \\
      c.fillStyle = "white";
      c.beginPath();
      c.arc(this.x - 15, this.y - 15, 5, 0, Math.PI * 2);
      c.fill();
      c.beginPath();
      c.arc(this.x + 15, this.y - 15, 5, 0, Math.PI * 2);
      c.fill();

      // -------======= THIS CODE DRAWS A WHITE FROWN EMOJI MOUTH FOR THE "BOSS" ENEMY ON THE CANVAS. -------======= \\
      c.strokeStyle = "white";
      c.lineWidth = 3;
      c.beginPath();
      c.arc(this.x, this.y + 10, 15, 1 * Math.PI, 2 * Math.PI, false);
      c.stroke();

      // -------======= THIS CODE DRAWS A BLUE RECTANGLE TO REPRESENT A "BOSS2" ENEMY ON THE CANVAS. -------======= \\
    } else if (this.shape === "boss2") {
      c.fillStyle = "blue";
      c.fillRect(
        this.x - this.radius,
        this.y - this.radius,
        this.radius * 2,
        this.radius * 4
      );

      // -------======= THIS CODE DRAWS WHITE CIRCLES AS EYES FOR THE "BOSS" ENEMY ON THE CANVAS. -------======= \\
      c.fillStyle = "white";
      c.arc(this.x - 15, this.y - 15, 5, 0, Math.PI * 2, false);
      c.fill();
      c.arc(this.x + 15, this.y - 15, 5, 0, Math.PI * 2, false);
      c.fill();

      // -------======= THIS CODE DRAWS A WHITE CURVED LINE AS A FROWN FOR THE "BOSS" ENEMY ON THE CANVAS. -------======= \\
      c.strokeStyle = "white";
      c.beginPath();
      c.arc(this.x, this.y + 10, 15, 0, Math.PI, true);
      c.stroke();

      // -------======= THIS CODE CHECKS IF THE SHAPE IS "BOSS3" AND THEN SAVES THE CURRENT CANVAS STATE. -------======= \\
    } else if (this.shape === "boss3") {
      c.save();

      // -------======= THIS CODE DRAWS TRIANGULAR SHAPED HORNS ON THE BOSS CHARACTER USING THE SPECIFIED COORDINATES AND FILL COLOR. -------======= \\
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

      // -------======= THIS CODE DRAWS A LARGE CIRCLE THAT RESEMBLES THE ANGRY FACE EMOJI. -------======= \\
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      c.fillStyle = this.color;
      c.fill();

      // -------======= THIS CODE DRAWS TWO WHITE CIRCLES INSIDE A LARGER CIRCLE TO CREATE EYE SHAPES. -------======= \\
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

      // -------=======  THIS CODE HAS TWO PARTS: FIRST, IT DRAWS A SEMICIRCLE WITH A BLACK OUTLINE. SECOND, IT FILLS A SHAPE (TRIANGLE) WITH A SPECIFIED COLOR. -------======= \\
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

      // -------======= THIS PART OF THE CODE FILLS A TRIANGLE WITH A SPECIFIED COLOR BASED ON THE POSITION AND RADIUS PROVIDED. -------======= \\
    } else if (this.shape === "boss4") {
      c.fillStyle = this.color;
      c.moveTo(this.x, this.y - this.radius);
      c.lineTo(this.x + this.radius, this.y + this.radius);
      c.lineTo(this.x - this.radius, this.y + this.radius);
      c.closePath();
      c.fill();

      // -------======= THIS PART OF THE CODE DRAWS A WHITE CIRCLE IN THE CENTER TO REPRESENT AN EYE. -------======= \\
      c.beginPath();
      c.fillStyle = "white";
      c.arc(this.x, this.y, this.radius * 0.3, 0, Math.PI * 2, false);
      c.fill();
      c.closePath();

      // -------======= THIS CODE RESTORES THE MOST RECENT SAVED CANVAS STATE. -------======= \\
      c.restore();

      // -------======= THE CODE CHECKS IF THE SHAPE OF THE ENEMY IS A "CENTIPEDE". -------======= \\
    } else if (this.shape === "centipede") {
      // -------======= DETERMINES HOW MANY CIRCLES ARE IN THE CENTIPEDE. IN THIS CASE, THERE ARE 6 SEGMENTS. -------======= \\
      let numSegments = 8;

      // -------======= SETS THE DISTANCE BETWEEN EACH CIRCLE SEGMENT. -------======= \\
      let segmentSpacing = 45;

      // -------======= CALCULATES THE X POSITION OF THE STARTING POINT OF THE CENTIPEDE. -------======= \\

      let startX = this.x - (numSegments * segmentSpacing) / 2;

      // -------======= THEN IT LOOPS THROUGH EACH SEGMENT AND DRAWS A CIRCLE AT THE SPECIFIED X AND Y -------======= \\
      for (let i = 0; i < numSegments; i++) {
        // -------======= THIS PART OF THE CODE DRAWS EACH SEGMENT OF THE CENTIPEDE BY CREATING A CIRCLE SHAPED SEGMENT -------======= \\
        c.arc(
          startX + i * segmentSpacing,
          this.y,
          this.radius,
          0,
          Math.PI * 2,
          false
        );

        // -------======= SETS THE FILL COLOR OF THE CIRCLE TO THE SPECIFIED COLOR -------======= \\
        c.fillStyle = this.color;

        // -------======= FILLS THE CIRCLE WITH THE SPECIFIED COLOR, COMPLETING THE DRAWING OF THE SEGMENT. -------======= \\
        c.fill();
      }

      // -------======= LOOPS THROUGH EACH SEGMENT OF THE CENTIPEDE EXCEPT THE LAST ONE. -------======= \\
      for (let i = 0; i < numSegments - 1; i++) {
        // -------======= CALCULATES THE STARTING X POSITION OF THE LINE FOR THIS SEGMENT. -------======= \\
        let segmentStartX = startX + i * segmentSpacing + this.radius;

        // -------======= CALCULATES THE ENDING X POSITION OF THE LINE FOR THIS SEGMENT. -------======= \\
        let segmentEndX = startX + (i + 1) * segmentSpacing - this.radius;

        // -------======= BEGINS A NEW PATH TO DRAW THE LINE SEGMENT. -------======= \\
        c.beginPath();

        // -------======= MOVES THE PEN TO THE STARTING POINT OF THE LINE SEGMENT -------======= \\
        c.moveTo(segmentStartX, this.y);

        // -------======= DRAWS A LINE FROM THE STARTING POINT TO THE ENDING POINT ALONG THE Y POSITION OF THE CENTIPEDE -------======= \\
        c.lineTo(segmentEndX, this.y);

        // -------======= SETS THE STROKE COLOR OF THE LINE TO MATCH THE COLOR OF THE CENTIPEDE. -------======= \\
        c.strokeStyle = this.color;

        // -------======= STROKES (DRAW) THE LINE SEGMENT ON THE CANVAS. -------======= \\
        c.stroke();
      }

      // -------======= CHECKS IF THE SEGMENT'S SHAPE IS A CIRCLE. -------======= \\
    } else if (this.shape === "circle") {
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 1, false);
    }

    c.closePath();

    // -------======= THIS CODE FILLS A SHAPE WITH A SPECIFIED COLOR, ADDS A GLOW EFFECT USING A WHITE SHADOW, AND FILLS THE SHAPE AGAIN TO CREATE A GLOWING EFFECT. -------======= \\
    c.fillStyle = this.color;
    c.fill();
    c.closePath();

    c.shadowColor = "white";
    c.shadowBlur = 8;
    c.fillStyle = this.color;
    c.fill();
  }

  // -------======= THIS CODE UPDATES THE POSITION OF AN OBJECT BASED ON ITS VELOCITY AND THEN DRAWS THE OBJECT ON THE SCREEN. -------======= \\
  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

// -------======= THIS CODE DEFINES A PARTICLE OBJECT WITH POSITION, SIZE, COLOR, VELOCITY, AND OPACITY PROPERTIES. -------======= \\
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

  // -------======= THIS CODE DRAWS A CIRCULAR PARTICLE ON A CANVAS WITH THE SPECIFIED POSITION, SIZE, COLOR, AND OPACITY. -------======= \\
  draw() {
    c.save();
    c.globalAlpha = this.alpha;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.restore();
  }
  // -------======= THIS CODE UPDATES THE POSITION AND OPACITY OF A MOVING PARTICLE ON THE CANVAS WHILE SIMULATING FRICTION TO SLOW IT DOWN. -------======= \\
  update() {
    this.draw();
    this.velocity.x *= friction;
    this.velocity.y *= friction;
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
    this.alpha -= 0.01;
  }
}

// -------======= SETTING THE X AND Y COORDINATES TO THE CENTER OF THE CANVAS. -------======= \\
const x = canvas.width / 2;
const y = canvas.height / 2;

// -------======= CREATING A PLAYER AND INITIALIZING LISTS FOR PROJECTILES, ENEMIES, AND PARTICLES. -------======= \\
let player = new Player(shipImage, x, y, 10, "white");
let projectiles = [];
let enemies = [];
let particles = [];

// -------======= INITIALIZING A PLAYER, EMPTY LISTS FOR PROJECTILES, ENEMIES, AND PARTICLES. -------======= \\
function init() {
  player = new Player(shipImage, x, y, 10, "white");
  projectiles = [];
  enemies = [];
  particles = [];
  score = 0;
  // -------======= SETTING SCORE TO ZERO, AND UPDATING SCORE DISPLAY ELEMENTS. -------======= \\
  scoreEl.innerHTML = score;
  bigScoreEl.innerHTML = score;
}

// -------======= SPAWNS ENEMIES AT INTERVALS RANDOMLY SETTING THEIR SIZE AND POSITION ONLY IF THE GAME IS NOT PAUSED. -------======= \\
function spawnEnemies() {
  if (paused === false) {
    setInterval(() => {
      const radius = Math.random() * (60 - 4) + 4;

      // -------======= DECLARES TWO VARIABLES, X AND Y, WITHOUT ASSIGNING A VALUE TO THEM. -------======= \\
      let x;
      let y;

      // -------======= GENERATES RANDOM COORDINATES WITHIN A CANVAS AREA, EITHER ALONG THE EDGES OR OUTSIDE THE CANVAS, BASED ON A RANDOM NUMBER. -------======= \\
      if (Math.random() < 0.5) {
        x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
        y = Math.random() * canvas.height;
      } else {
        x = Math.random() * canvas.width;
        y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
      }

      // -------======= GENERATES A RANDOM HSL COLOR. -------======= \\
      const color = `hsl(${Math.random() * 360}, 50%, 50%)`;

      // -------======= SELECTS A RANDOM SHAPE FROM A LIST OF PREDEFINED SHAPES. -------======= \\
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
        "centipede",
      ];
      const selectedShape = shapes[Math.floor(Math.random() * shapes.length)];

      // -------=======  CALCULATES THE ANGLE BETWEEN THE CENTER OF THE CANVAS AND A GIVEN POINT, AND THEN CALCULATES THE X AND Y COMPONENTS OF THE VELOCITY BASED ON THAT ANGLE. -------======= \\
      const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
      const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle),
      };

      // -------=======  CREATES NEW ENEMIES WITH SPECIFIED PARAMETERS AND ADDS THEM TO THE "enemies" ARRAY AT A SET INTERVAL OF 2600 MILLISECONDS. -------======= \\
      enemies.push(new Enemy(x, y, radius, color, velocity, selectedShape));
    }, 2800);

    // -------======= CHECKS IF THE GAME IS PAUSED, AND IF IT IS, DISPLAYS A MESSAGE ("Game is paused") IN THE CONSOLE AND EXITS THE FUNCTION. -------======= \\
  } else if (paused) {
    console.log("Game Is Paused");
    return;
  }
}

// -------======= DECLARES VARIABLES `animationId` AND `score` AND DEFINES A FUNCTION CALLED `animate`. -------======= \\
let animationId;
let score = 0;
function animate() {
  // -------======= IF THE GAME IS NOT PAUSED -------======= \\
  if (paused === false) {
    // -------======= CONTINUE ANIMATING BY DRAWING A SEMI-TRANSPARENT COLOR BACKGROUND -------======= \\
    animationId = requestAnimationFrame(animate);
    c.fillStyle = "rgba(1.5, 1.5, 1.5, 0.5)";
    c.fillRect(0, 0, canvas.width, canvas.height);

    // -------======= DRAWING A PLAYER CHARACTER, AND UPDATING PARTICLES. -------======= \\
    player.draw();
    particles.forEach((particle, index) => {
      // -------=======  ANY PARTICLES WITH LOW TRANSPARENCY WILL BE REMOVED. -------======= \\
      if (particle.alpha <= 0) {
        particles.splice(index, 1);
      } else {
        particle.update();
      }
    });
    projectiles.forEach((projectile, index) => {
      projectile.update();

      // -------======= CHECKS IF THE PROJECTILE IS OUTSIDE THE CANVAS BOUNDARIES. -------======= \\
      if (
        projectile.x + projectile.radius < 0 ||
        projectile.x - projectile.radius > canvas.width ||
        projectile.y + projectile.radius < 0 ||
        projectile.y - projectile.radius > canvas.height
      ) {
        // -------======= REMOVES THE PROJECTILE FROM THE PROJECTILES ARRAY AFTER 0 MILLISECONDS (IMMEDIATELY). -------======= \\
        setTimeout(() => {
          projectiles.splice(index, 1);
        }, 0);
      }
    });

    // -------======= CALLS THE UPDATE FUNCTION FOR EACH ENEMY IN THE ENEMIES ARRAY. -------======= \\
    enemies.forEach((enemy, index) => {
      enemy.update();

      // -------======= CALCULATES THE DISTANCE BETWEEN THE PLAYER AND AN ENEMY ON A 2D PLANE. -------======= \\
      const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);

      // -------======= IF THE DISTANCE BETWEEN THE PLAYER AND ENEMY IS LESS THAN THE SUM OF THEIR RADII, STOPS ANIMATION, DISPLAYS A MODAL, SHOWS THE SCORE. -------======= \\
      if (dist - enemy.radius - player.radius < 1) {
        cancelAnimationFrame(animationId);
        modalEl.style.display = "flex";
        bigScoreEl.innerHTML = score;
      }

      // -------======= LOOP THROUGH EACH PROJECTILE AND CALCULATE THE DISTANCE FROM THE ENEMY USING THE Pythagorean theorem. -------======= \\
      projectiles.forEach((projectile, projectileIndex) => {
        const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

        // -------======= CHECKS IF THE PROJECTILE HAS HIT THE ENEMY BASED ON THE RADIUS OF BOTH OBJECTS. IF THEY ARE CLOSE ENOUGH, A SOUND EFFECT IS PLAYED. -------======= \\
        if (dist - enemy.radius - projectile.radius < 1) {
          const explosionSound = new Audio("./assets/burst.wav");
          explosionSound.play();

          // -------======= CREATES MULTIPLE PARTICLES AT THE PROJECTILE'S POSITION WITH RANDOM SPEEDS AND COLORS, TO SIMULATE AN EXPLOSION EFFECT. -------======= \\
          for (let i = 0; i < enemy.radius * 2; i++) {
            particles.push(
              new Particle(
                projectile.x,
                projectile.y,
                Math.random() * 2,
                enemy.color,

                // -------======= GENERATES RANDOM X AND Y VALUES FOR THE PARTICLE'S MOVEMENT TO CREATE A RANDOMIZED DIRECTION FOR EACH PARTICLE. -------======= \\
                {
                  x: (Math.random() - 0.5) * (Math.random() * 8),
                  y: (Math.random() - 0.5) * (Math.random() * 8),
                }
              )
            );
          }
          // -------======= IF THE ENEMY'S RADIUS MINUS 10 IS GREATER THAN 5, INCREASE THE SCORE BY 100 AND UPDATE THE SCORE DISPLAY ON THE SCREEN. -------======= \\
          if (enemy.radius - 10 > 5) {
            score += 100;
            scoreEl.innerHTML = score;
            // -------======= THIS CODE ANIMATES THE ENEMY OBJECT BY CHANGING ITS RADIUS TO A VALUE 10 LESS THAN THE CURRENT RADIUS. -------======= \\
            gsap.to(enemy, {
              radius: enemy.radius - 10,
            });

            // -------======= THEN REMOVES THE PROJECTILE FROM THE PROJECTILES ARRAY AFTER A SHORT DELAY OF 0 MILLISECONDS. -------======= \\
            setTimeout(() => {
              projectiles.splice(projectileIndex, 1);
            }, 0);

            // -------======= THIS INCREASES THE SCORE BY 250 POINTS, REMOVES BOTH THE ENEMY AND PROJECTILE FROM THEIR ARRAYS AFTER A DELAY OF 0 MILLISECONDS. -------======= \\
          } else {
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

    // -------======= THIS CODE CHECKS IF THE GAME IS PAUSED. IF THE CONDITION IS TRUE, IT LOGS "GAME IS PAUSED" AND EXITS THE FUNCTION. -------======= \\
  } else if (paused) {
    console.log("Game Is Paused");
    return;
  }
}
// -------======= THIS CODE DECLARES A VARIABLE NAMED MOUSEDOWN AND INITIALLY SETS IT TO FALSE. -------======= \\
let mouseDown = false;

// -------======= IT THEN LOADS A SOUND EFFECT FILE FOR PROJECTILES. -------======= \\
const projectileSound = new Audio("./assets/lighthumburst.wav");

// -------======= WHEN THE USER CLICKS THE MOUSE BUTTON, THE CODE PLAYS THE PROJECTILE SOUND. -------======= \\
// will only play the sound if the game is not paused
function projectileMouseDown() {
  if (paused === false) {
    projectileSound.play();
  }
}

// -------======= THIS CODE ADDS AN EVENT LISTENER TO THE CANVAS ELEMENT FOR MOUSE MOVEMENT. -------======= \\
canvas.addEventListener("mousemove", (event) => {
  // -------======= IF THE MOUSE BUTTON IS PRESSED DOWN, IT CALCULATES THE ANGLE BASED ON THE MOUSE POSITION RELATIVE TO THE CENTER OF THE CANVAS. -------======= \\
  if (mouseDown) {
    const angle = Math.atan2(
      event.clientY - canvas.height / 2,
      event.clientX - canvas.width / 2
    );

    // -------======= THIS PART OF THE CODE CALCULATES THE VELOCITY COMPONENTS (X AND Y) BASED ON THE ANGLE CALCULATED PREVIOUSLY. -------======= \\
    const velocity = {
      x: Math.cos(angle) * 4,
      y: Math.sin(angle) * 4,
    };

    // -------======= THIS PART OF THE CODE GENERATES A RANDOM SIZE VALUE THAT IS BETWEEN 5 AND 6 (INCLUSIVE). -------======= \\
    const randomSize = Math.floor(Math.random() * 2) + 5;

    // -------======= THIS PART OF THE CODE CREATES A NEW PROJECTILE OBJECT AND ADDS IT TO THE 'PROJECTILES' ARRAY -------======= \\
    projectiles.push(
      new Projectile(
        // -------======= SPECIFYING THE POSITION, SIZE, COLOR, VELOCITY, AND OTHER PARAMETERS. -------======= \\
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

// -------======= THIS CODE DECLARES A VARIABLE NAMED 'MOUSEHOLDTIMER' BUT DOES NOT ASSIGN A VALUE TO IT. -------======= \\
let mouseHoldTimer;

// -------======= THIS CODE ADDS AN EVENT LISTENER TO THE CANVAS FOR THE "MOUSEDOWN" EVENT. -------======= \\
canvas.addEventListener("mousedown", (event) => {
  // -------======= WHEN THE EVENT OCCURS, IT SETS THE 'MOUSEDOWN' VARIABLE TO TRUE -------======= \\
  mouseDown = true;
  canvas.removeEventListener("mouseup", mouseUpHandler);

  // -------======= AND REMOVES THE EVENT LISTENER FOR THE "MOUSEUP" EVENT CALLED 'MOUSEUPHANDLER'. -------======= \\
  function mouseUpHandler() {
    // -------======= IT CLEARS A TIMER IF THE MOUSE IS RELEASED BEFORE IT FIRES -------======= \\
    clearTimeout(mouseHoldTimer);

    // -------======= IT SETS THE 'MOUSEDOWN' VARIABLE TO FALSE -------======= \\
    mouseDown = false;

    // -------======= REMOVES EVENT LISTENERS FOR THE "MOUSEMOVE" AND "MOUSEUP" EVENTS. -------======= \\
    canvas.removeEventListener("mousemove", mouseMoveHandler);
    canvas.removeEventListener("mouseup", mouseUpHandler);
  }

  // -------======= ADDS AN EVENT LISTENER TO THE CANVAS ELEMENT FOR THE "MOUSEMOVE" EVENT -------======= \\
  canvas.addEventListener("mousemove", mouseMoveHandler);

  // -------======= THIS FUNCTION IS A HANDLER FOR THE MOUSEMOVE EVENT. -------======= \\
  function mouseMoveHandler(event) {
    // -------======= IT FIRST CLEARS ANY EXISTING TIMER (IF PRESENT) -------======= \\
    clearTimeout(mouseHoldTimer);

    // -------======= IT SETS A NEW TIMER USING setTimeout(). -------======= \\
    mouseHoldTimer = setTimeout(() => {
      // -------======= WHEN THE TIMER EXPIRES AFTER 8 MILLISECONDS, AND PRINTS A MESSAGE TO THE CONSOLE. -------======= \\
      console.log("Mouse held down for too long, interrupting projectile");
    }, 8);

    // -------======= THE RESULTING ANGLE IS STORED IN THE VARIABLE ANGLE. -------======= \\
    // -------======= THIS CODE CALCULATES THE ANGLE IN RADIANS -------======= \\
    const angle = Math.atan2(
      // -------======= CENTER OF THE CANVAS (canvas.width/2, canvas.height/2) -------======= \\
      event.clientY - canvas.height / 2,
      event.clientX - canvas.width / 2
    );

    // -------======= AND THE MOUSE POSITION (event.clientX, event.clientY) -------======= \\
    const velocity = {
      x: Math.cos(angle) * 4,
      y: Math.sin(angle) * 4,
    };

    // -------======= THIS CODE GENERATES A RANDOM INTEGER SIZE VALUE BETWEEN 5 AND 6 (INCLUSIVE) -------======= \\
    // -------======= USING Math.random() TO OBTAIN A RANDOM DECIMAL VALUE BETWEEN 0 AND 1 -------======= \\
    // -------======= MULTIPLYING THAT VALUE BY 2, ADDING 5, AND THEN FLOORING THE RESULT TO DISCARD THE DECIMAL PORTION. -------======= \\
    // -------======= THE GENERATED SIZE IS STORED IN THE VARIABLE randomSize. -------======= \\
    const randomSize = Math.floor(Math.random() * 2) + 5;

    // -------======= THIS CODE ADDS A NEW PROJECTILE OBJECT TO THE projectiles ARRAY. -------======= \\
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

  // -------======= THIS CODE ADDS EVENT LISTENER TO THE CANVAS, TRIGGERS THE mouseUpHandler FUNCTION WHEN A MOUSE UP EVENT OCCURS, ON CANVAS. -------======= \\
  canvas.addEventListener("mouseup", mouseUpHandler);
});

// -------=======  THIS CODE WAITS FOR THE HTML DOCUMENT TO FULLY LOAD AND THEN CONTINUES TO EXECUTE -------======= \\
document.addEventListener("DOMContentLoaded", function () {
  // -------======= IT GETS THE ELEMENT WITH THE ID "returnButton" -------======= \\
  var returnButton = document.getElementById("returnButton");

  // -------======= ADDS AN EVENT LISTENER TO IT FOR THE CLICK EVENT. -------======= \\
  returnButton.addEventListener("click", function () {
    // -------=======  WHEN THE BUTTON IS CLICKED, IT REDIRECTS THE PAGE TO "title.html". -------======= \\
    window.location.href = "title.html";
  });
});

// -------======= THIS CODE DECLARES A VARIABLE "PAUSED" AND SETS ITS INITIAL VALUE TO FALSE. -------======= \\
let paused = false;

// -------======= IT ALSO SELECTS AN HTML ELEMENT WITH THE ID "pause-game", STORES IT IN THE VARIABLE "PAUSEGAMEDIV". -------======= \\
const pauseGameDiv = document.getElementById("pause-game");

// -------======= THIS CODE DEFINES A FUNCTION CALLED "TOGGLEPAUSE", THAT TOGGLES THE PAUSE STATE OF THE GAME. -------======= \\
function togglePause() {
  // -------======= IF THE GAME IS UNPAUSED, IT SETS IT TO PAUSED AND DISPLAYS THE PAUSE MENU. -------======= \\
  if (paused === false) {
    paused = true;
    pauseGameDiv.style.display = "inline-block";
  }

  // -------======= IF THE GAME IS ALREADY PAUSED, IT SETS IT TO UNPAUSED, HIDES THE PAUSE MENU, THEN RESUMES ANIMATION AND SPAWNS ENEMIES. -------======= \\
  else if (paused === true) {
    paused = false;
    pauseGameDiv.style.display = "none";
    animate();
    spawnEnemies();
  }
}

// -------======= WHEN THE "P" KEY IS PRESSED, IT CALLS A FUNCTION TO TOGGLE THE PAUSE STATE OF THE GAME. -------======= \\
window.addEventListener("keydown", async (event) => {
  if (event.key === "p") {
    togglePause();
  }
});

// -------======= THIS FUNCTION STARTS THE GAME. -------======= \\
function startGame() {
  // -------======= IF THE GAME IS NOT PAUSED, -------======= \\
  if (paused === false) {
    // loadBackground();
    // -------=======  IT INITIALIZES THE GAME -------======= \\
    init();

    // -------======= WHEN THE USER CLICKS THE MOUSE BUTTON, THE CODE PLAYS THE PROJECTILE SOUND. -------======= \\
    // add after the initialization, to register only after the game starts
    window.addEventListener("mousedown", projectileMouseDown);

    // -------======= STARTS ANIMATION, -------======= \\
    animate();

    // -------======= SPAWNS ENEMIES -------======= \\
    spawnEnemies();

    // -------======= HIDES A MODAL ELEMENT. IF THE GAME IS PAUSED, -------======= \\
    modalEl.style.display = "none";

  } else {
    // -------======= IT DISPLAYS A MESSAGE AND RETURNS WITHOUT STARTING THE GAME. -------======= \\
    console.log("Fatal Error! Game is starting in Pause");
    return;
  }
}

// -------======= WHEN THE START BUTTON IS CLICKED, THIS CODE ADDS AN EVENT LISTENER TO RUN THE STARTGAME FUNCTION WHEN THE BUTTON IS CLICKED. -------======= \\
startGameBtn.addEventListener("click", () => {
  startGame();
});




// This will automatically display the saved list of users high score
scoresEl.addEventListener("click", function(){

  /* This function uses the .remove method for home, quiz, end(El) variables
   storing the id="name value" for each section in the html file 
   It also removes the contents timer and score within the container of the home page
  */
  
      modalEl.remove();
      startGameBtn.remove();
      bigScoreEl.remove();
      scoresEl.remove();
  
  /* Line 67 is displaying the score section 
     and all of its contents on the web page in the browser
  */
      scoreSectionEl.style.display = "block";
  
      getScores();
  });
  
  // Submits the users intials and scores
  submitEl.addEventListener("click", function(){
  
      scoresEl.remove();
      endEl.remove();
      scoreSectionEl.style.display = "block";
  
  // Sets the value for the text area in the section for inputting scores
      setScore();
  
  // Gets the value from the text within the scores section
      getScores();
  });
  
  // Allows the user to retry the quiz
  retryEl.addEventListener("click", function(){
  
  // reloads the location of the contents in the variable retryEl()
      location.reload();
  });
  
  // clears the scoreboard with the users saved data from the local storage
  clearEl.addEventListener("click", function(){
  
  // sets the value to a string "score history" with the value of an empty array
      localStorage.setItem("scoreHistory", "[]");
  
  // reloads the page with a cleared local storage
      location.reload();
  });
  
  // saves the users current quiz score
  function setScore(){
      let initials = inputEl.value.toUpperCase();
  
      console.log(initials);
  
  // When user doesnt enter initials, the value is then saved to "unknown" by default
  if(initials === ''){
      initials = "Unknown";
  }
  
  let scoreHistory = [];
  let newScore = {
      name: initials,
      score: score
  }
  
  let lastStorage = localStorage.getItem("scoreHistory");
  
  // If the saved local storage exists, getItem from the local storage and pass through array in scoreHistory
  if (lastStorage !== null){
      scoreHistory = JSON.parse(lastStorage);
  }
  
  // adds new score to the values of the array store in the variable scoreHistory
  scoreHistory.push(newScore);
  
  // Uses the saved data from Local storage to setItem to the string of text and using the json to turn the key/value pairs stored in the scoreHistory array into a string
  localStorage.setItem("scoreHistory", JSON.stringify(scoreHistory));
  
  console.log(scoreHistory);
  
  }
  
  // This function retrieves scores from data saveed to the local storage
  function getScores(){
  
  let scoreHistory = JSON.parse(localStorage.getItem("scoreHistory"));
  
  // This function sorts the scoreboard array by score in descending order
  scoreHistory.sort(function(a, b) {
      return b.score - a.score;
  });
  
  // Creates the HTML table to display the scores saved to the score board
  var table = document.createElement('table');
  table.id = 'table';
  var tableHead = table.createTHead();
  var headRow = tableHead.insertRow(0);
  headRow.insertCell(0).innerHTML = '<b>Name</b>';
  headRow.insertCell(1).innerHTML = '<b>Score</b>';
  
  
  // This function inserts values into the HTML table that was retrieved from the array stored in scoreHistory
  
  /* This for loop creates a var integer equal to 0, 
  creates the condition that the integer is less than the length of the array in scoreHistory,
  loop will run the code for the integer to increase by one until its larger than array.length
  */
  for (var i = 0; i < scoreHistory.length; i++) {
  
  /* this portion of the function creates the 'row' variable 
     and sets it equal to the table using  the insertRow method
     storing the value of an integer increasing by one   
  */
       var row = table.insertRow(i + 1);
  
  // These rows use the method insertcell with a value as a string property which equals the array's index stored in score history along with the name/score
       row.insertCell(0).innerHTML = scoreHistory[i].name;
       row.insertCell(1).innerHTML = scoreHistory[i].score;
  }
  
  // this will render the table by the method appendChild given the id of table in the elements of the scoreboard
  scoreboardEl.appendChild(table);
  
  }



