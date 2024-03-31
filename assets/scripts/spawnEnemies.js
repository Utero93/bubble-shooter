// const canvas = document.querySelector("canvas");
// import Enemy from "./Enemy.js";
// let paused = false;
// let enemies = [];


// export function spawnEnemies() {
//     console.log(paused)
//   if (paused === false) {
//     setInterval(() => {
//       const radius = Math.random() * (60 - 4) + 4;

//       let x;
//       let y;

//       if (Math.random() < 0.5) {
//         x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
//         y = Math.random() * canvas.height;
//       } else {
//         x = Math.random() * canvas.width;
//         y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
//       }

//       const color = `hsl(${Math.random() * 360}, 50%, 50%)`;

//       const shapes = [
//         "circle",
//         "square",
//         "triangle",
//         "octagon",
//         "rectangle",
//         "trapezoid",
//         "boss1",
//         "boss2",
//         "boss3",
//         "boss4",
//       ];
//       const selectedShape = shapes[Math.floor(Math.random() * shapes.length)]; // Randomly choosing a shape

//       const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
//       const velocity = {
//         x: Math.cos(angle),
//         y: Math.sin(angle),
//       };

//       enemies.push(new Enemy(x, y, radius, color, velocity, selectedShape));
//     }, 2600);
//   } else if (paused) {
//     console.log("Game is paused");
//     return;
//   }
// }
