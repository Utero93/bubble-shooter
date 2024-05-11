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
let usernameEl = document.getElementById("username");
let endEl = document.getElementById("end");
let submitEl = document.getElementById("submit");
let inputEl = document.getElementById("input");
// let finalScoreEl = document.getElementById("finalscore");

// Variables for the scoreboard section
let scoreSectionEl = document.getElementById("score");
let scoreboardEl = document.getElementById("scoreboard");
let retryEl = document.getElementById("retry");
let clearEl = document.getElementById("clear");

// gets username from session storage and displays on screen
let username = sessionStorage.getItem("username");
usernameEl.textContent = username;

let userShip = sessionStorage.getItem("userShip");
let shipImage = userShip;

let userScore = sessionStorage.getItem("scoreEl");
console.log(userScore);

let shipProjectile = sessionStorage.getItem("shipProjectile");
let projectileImage = shipProjectile;

// -------======= THIS CODE DEFINES THE CLASS PLAYER THAT DESCRIBES A PLAYER OBJECT WITH POSITION (X AND Y COORDINATES), SIZE (RADIUS), COLOR. -------======= \\
class Player {
  constructor(shipImage, x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.shipImage = shipImage;
  }
/*
1. DEFINE A FUNCTION NAMED "draw" THAT WILL HANDLE DRAWING OPERATIONS.
2. CREATE A NEW IMAGE OBJECT CALLED "background".
3. SET THE SOURCE OF THE IMAGE TO THE BACKGROUND IMAGE FILE LOCATED AT "./assets/Spac-bg.png".
4. DEFINE AN "onload" EVENT HANDLER FUNCTION THAT WILL EXECUTE WHEN THE BACKGROUND IMAGE FINISHES LOADING.
5. INSIDE THE "onload" FUNCTION, CREATE A PATTERN ("ptrn") USING THE LOADED BACKGROUND IMAGE AND SET IT AS THE FILL STYLE OF THE CANVAS ("c").
6. FILL THE ENTIRE CANVAS WITH THE PATTERN, REPEATING IT HORIZONTALLY AND VERTICALLY, TO CREATE A BACKGROUND EFFECT.
*/
  draw() {
   
    const background = new Image();
    background.src = "./assets/Spac-bg.png";
    background.onload = function () {
      const ptrn = c.createPattern(background, "repeat");
      c.fillStyle = ptrn;
      c.fillRect(0, 0, canvas.width, canvas.height);
    };

/*
1. CREATE A NEW IMAGE OBJECT AND ASSIGN IT TO A VARIABLE CALLED "image".
2. SET THE SOURCE OF THE IMAGE OBJECT TO THE VALUE STORED IN "this.shipImage".
3. DEFINE AN "onload" EVENT HANDLER USING AN ARROW FUNCTION THAT WILL EXECUTE WHEN THE IMAGE FINISHES LOADING.
4. CALCULATE THE WIDTH AND HEIGHT OF THE SHIP IMAGE AND STORE THEM IN VARIABLES "shipWidth" AND "shipHeight" RESPECTIVELY.
5. CALCULATE THE X AND Y COORDINATES OF THE SHIP POSITION BASED ON THE CENTER OF THE SHIP IMAGE AND THE OBJECT'S X AND Y COORDINATES.
6. START A NEW DRAWING PATH ON THE CANVAS ("c") USING "beginPath()".
7. DRAW THE LOADED IMAGE (SHIP) ON THE CANVAS AT THE CALCULATED POSITION (shipPositionX, shipPositionY) USING "drawImage()".
*/
    const image = new Image();
    image.src = this.shipImage;
    image.onload = () => {

      let shipWidth = image.width;
      let shipHeight = image.height;
      let shipPositionX = this.x - shipWidth / 2;
      let shipPositionY = this.y - shipHeight / 2;
      c.beginPath();
      c.drawImage(image, shipPositionX, shipPositionY);
    };
  }
}

// -------======= THIS CLASS DEFINES A PROJECTILE WITH SPECIFIED POSITION, SIZE, COLOR, VELOCITY, AND SHAPE. -------======= \\
class Projectile {
  constructor(x, y, radius, color, velocity, projectileImage) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.projectileImage = projectileImage;
  }
/*
1. BEGIN A NEW DRAWING PATH ON THE CANVAS ("c") USING "beginPath()".
2. CHECK IF THE "shape" PROPERTY OF THE OBJECT IS EQUAL TO "one".
3. IF THE SHAPE IS "one", SET THE FONT SIZE OF THE TEXT TO 5 TIMES THE RADIUS OF THE OBJECT AND USE THE "Arial" FONT.
4. SET THE FILL STYLE OF THE TEXT TO THE COLOR DEFINED IN THE OBJECT'S "color" PROPERTY.
5. DRAW TEXT CONTAINING A "1" AT A SPECIFIC POSITION ON THE CANVAS. THE POSITION IS CALCULATED BASED ON THE OBJECT'S X AND Y COORDINATES AND RADIUS VALUE.
*/
  draw() {
    c.beginPath();

    const image = new Image();
    image.src = this.projectileImage;
    image.onload = () => {

      let projectileWidth = image.width;
      let projectileHeight = image.height;
      let projectilePositionX = this.x - this.radius;
      let projectilePositionY = this.y - this.radius;
      c.beginPath();
      c.drawImage(image, projectilePositionX, projectilePositionY);
    }

    // if (this.shape === "one") {
    //   c.font = `${this.radius * 5}px Arial`;
    //   c.fillStyle = this.color;
    //   c.fillText("1", this.x - this.radius, this.y + this.radius);

/*
1. CHECK IF THE "shape" PROPERTY OF THE OBJECT IS EQUAL TO "zero".
2. IF THE SHAPE IS "zero", SET THE FONT SIZE OF THE TEXT TO 5 TIMES THE RADIUS OF THE OBJECT AND USE THE "Arial" FONT.
3. SET THE FILL STYLE OF THE TEXT TO THE COLOR DEFINED IN THE OBJECT'S "color" PROPERTY.
4. DRAW TEXT CONTAINING A "0" AT A SPECIFIC POSITION ON THE CANVAS. THE POSITION IS CALCULATED BASED ON THE OBJECT'S X AND Y COORDINATES AND RADIUS VALUE.
*/
    // } else if (this.shape === "zero") {
    //   c.font = `${this.radius * 5}px Arial`;
    //   c.fillStyle = this.color;
    //   c.fillText("0", this.x - this.radius, this.y + this.radius);
    // }
  }
/*
1. CALL THE "update" METHOD WHICH UPDATES THE POSITION OF AN OBJECT ON THE CANVAS.
2. DRAW THE OBJECT AT ITS CURRENT POSITION.
3. MOVE THE OBJECT'S X AND Y POSITION BASED ON ITS VELOCITY.
4. FOR EACH ENEMY IN THE "enemies" ARRAY:
   - CALCULATE THE DISTANCE BETWEEN THE OBJECT AND THE ENEMY USING THE EUCLIDEAN DISTANCE FORMULA.
   - CHECK IF THE DISTANCE BETWEEN THE TWO CIRCLES IS LESS THAN 1 UNIT AWAY FROM COLLIDING (RADIUS TO RADIUS DISTANCE).
   - IF THE DISTANCE IS VERY CLOSE TO COLLIDING:
    - CHANGE THE OBJECT'S COLOR TO "red".
    - SET THE SHAPE OF THE OBJECT TO "one".
*/
  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    enemies.forEach((enemy) => {
      const distance = Math.hypot(this.x - enemy.x, this.y - enemy.y);

      if (distance - this.radius - enemy.radius < 1) {
        this.color = "red";
        this.shape = "one"; 
      }
    });

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
          // const explosionSound = new Audio("./assets/burst.wav");
          // explosionSound.play();

          // // -------======= CREATES MULTIPLE PARTICLES AT THE PROJECTILE'S POSITION WITH RANDOM SPEEDS AND COLORS, TO SIMULATE AN EXPLOSION EFFECT. -------======= \\
          // for (let i = 0; i < enemy.radius * 2; i++) {
          //   particles.push(
          //     new Particle(
          //       projectile.x,
          //       projectile.y,
          //       Math.random() * 2,
          //       enemy.color,

          //       // -------======= GENERATES RANDOM X AND Y VALUES FOR THE PARTICLE'S MOVEMENT TO CREATE A RANDOMIZED DIRECTION FOR EACH PARTICLE. -------======= \\
          //       {
          //         x: (Math.random() - 0.5) * (Math.random() * 8),
          //         y: (Math.random() - 0.5) * (Math.random() * 8),
          //       }
          //     )
          //   );
          // }
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

/*
1. WHEN THE ELEMENT WITH THE ID "scores" IS CLICKED BY THE USER, DO THE FOLLOWING STEPS:
2. CALL THE FUNCTION "setScore()". THIS FUNCTION IS LIKELY TO UPDATE OR SET THE SCORE IN THE CURRENT SESSION.
3. REDIRECT THE USER TO THE "./score-page/score.html" PAGE USING window.location.href.
4. IN SUMMARY, WHEN THE "scores" ELEMENT IS CLICKED, THE FUNCTION "setScore()" IS CALLED TO UPDATE SCORES,
   AND THEN THE USER IS REDIRECTED TO ANOTHER PAGE FOR DISPLAYING SCORES.
*/

document.getElementById("scores").addEventListener("click", () => {
  setScore();
  window.location.href = "./score-page/score.html";
});

/*
1. DECLARE A NEW VARIABLE NAMED "SCOREHISTORY" TO STORE AN ARRAY OF SCORES.
2. THIS ARRAY WILL BE USED TO KEEP TRACK OF PAST SCORES OR SCORE HISTORY.
*/
let scoreHistory = [];

/*
1. RETRIEVE THE VALUE ASSOCIATED WITH THE "scoreHistory" KEY FROM THE BROWSER'S LOCAL STORAGE AND STORE IT IN A NEW VARIABLE NAMED "SAVEDSCORES".
2. THIS VALUE REPRESENTS THE SCORE HISTORY PREVIOUSLY SAVED IN THE LOCAL STORAGE FOR FUTURE REFERENCE OR USE.
*/
let savedScores = localStorage.getItem("scoreHistory");


/*
1. CHECK IF THE VARIABLE "savedScores" IS NOT EQUAL TO NULL, MEANING THERE IS A VALUE STORED IN IT FROM LOCAL STORAGE.
2. IF THE CONDITION IS MET, PARSE THE VALUE STORED IN "savedScores" AS A JSON OBJECT AND ASSIGN IT TO A NEW VARIABLE NAMED "parsedSavedScores".
3. UPDATE THE "scoreHistory" VARIABLE WITH THE PARSED JSON OBJECT STORED IN "parsedSavedScores", WHICH REPRESENTS THE HISTORICAL SCORE DATA RETRIEVED FROM THE LOCAL STORAGE.
*/
if (savedScores !== null) {
  let parsedSavedScores = JSON.parse(savedScores);
  scoreHistory = parsedSavedScores;
}

/*
1. CREATE A FUNCTION NAMED "setScore" THAT TAKES A PARAMETER CALLED "param".
2. CREATE AN ARRAY CALLED "currentScore" THAT STORES THE USERNAME AND SCORE IN A NEW ARRAY.
3. ADD THE "currentScore" ARRAY TO THE "scoreHistory" ARRAY USING THE "push" METHOD, TO KEEP TRACK OF HISTORICAL SCORE DATA.
4. CONVERT THE UPDATED "scoreHistory" ARRAY TO A STRING USING "JSON.stringify" AND STORE IT IN A NEW VARIABLE NAMED "stringifiedScoreHistory".
5. STORE THE STRINGIFIED SCORE HISTORY DATA IN THE BROWSER'S LOCAL STORAGE UNDER THE KEY "scoreHistory" USING "localStorage.setItem" TO SAVE THE DATA FOR LATER USE.
*/
function setScore(param) {
  let currentScore = [username, score];
  scoreHistory.push(currentScore);
  let stringifiedScoreHistory = JSON.stringify(scoreHistory);
  localStorage.setItem("scoreHistory", stringifiedScoreHistory);
}
