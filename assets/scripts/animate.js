// const canvas = document.querySelector("canvas");
// const c = canvas.getContext("2d");

// import Player from "./Player.js";

// // In summary, this code manages the animation loop, clears the canvas with a semi-transparent effect, updates and draws particles and projectiles, and maintains the smooth animation on the canvas.
// // const friction = 1;
// const x = canvas.width / 2;
// const y = canvas.height / 2;
// let player = new Player(x, y, 10, "white");
// let particles = [];
// let enemies = [];
// let projectiles = [];
// let animationId;
// let score = 0;
// let paused = false;

// export function animate() {
//   if (paused === false) {
//     animationId = requestAnimationFrame(animate);
//     c.fillStyle = "rgba(1.5, 1.5, 1.5, 0.5)";
//     c.fillRect(0, 0, canvas.width, canvas.height);
//     player.draw();
//     particles.forEach((particle, index) => {
//       if (particle.alpha <= 0) {
//         particles.splice(index, 1);
//       } else {
//         particle.update();
//       }
//     });
//     projectiles.forEach((projectile, index) => {
//       projectile.update();

//       // remove from edges of screen
//       if (
//         projectile.x + projectile.radius < 0 ||
//         projectile.x - projectile.radius > canvas.width ||
//         projectile.y + projectile.radius < 0 ||
//         projectile.y - projectile.radius > canvas.height
//       ) {
//         setTimeout(() => {
//           projectiles.splice(index, 1);
//         }, 0);
//       }
//     });

//     enemies.forEach((enemy, index) => {
//       enemy.update();

//       const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
//       // end game
//       if (dist - enemy.radius - player.radius < 1) {
//         cancelAnimationFrame(animationId);
//         modalEl.style.display = "flex";
//         bigScoreEl.innerHTML = score;
//       }

//       projectiles.forEach((projectile, projectileIndex) => {
//         const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

//         // when projectiles touch enemy
//         if (dist - enemy.radius - projectile.radius < 1) {
//           const explosionSound = new Audio("./assets/burst.wav");
//           explosionSound.play();
//           for (let i = 0; i < enemy.radius * 2; i++) {
//             particles.push(
//               new Particle(
//                 projectile.x,
//                 projectile.y,
//                 Math.random() * 2,
//                 enemy.color,
//                 {
//                   x: (Math.random() - 0.5) * (Math.random() * 8),
//                   y: (Math.random() - 0.5) * (Math.random() * 8),
//                 }
//               )
//             );
//           }

//           if (enemy.radius - 10 > 5) {
//             //increase our score
//             score += 100;
//             scoreEl.innerHTML = score;

//             gsap.to(enemy, {
//               radius: enemy.radius - 10,
//             });
//             setTimeout(() => {
//               projectiles.splice(projectileIndex, 1);
//             }, 0);
//           } else {
//             // remove from scene altogether
//             score += 250;
//             scoreEl.innerHTML = score;
//             setTimeout(() => {
//               enemies.splice(index, 1);
//               projectiles.splice(projectileIndex, 1);
//             }, 0);
//           }
//         }
//       });
//     });
//   } else if (paused) {
//     console.log("Game is paused");
//     return;
//   }
// }
