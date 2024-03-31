// const canvas = document.querySelector("canvas");
// const c = canvas.getContext("2d");

// let enemies = [];


// export default class Projectile {
//     constructor(x, y, radius, color, velocity, shape) {
//       this.x = x;
//       this.y = y;
//       this.radius = radius;
//       this.color = color;
//       this.velocity = velocity;
//       this.shape = shape;
//     }
  
//     draw() {
//       c.beginPath();
  
//       // Draw a number 1 shape
//       if (this.shape === "one") {
//         c.font = `${this.radius * 5}px Arial`;
//         c.fillStyle = this.color;
//         c.fillText("1", this.x - this.radius, this.y + this.radius);
  
//         // Draw a number 0 shape
//       } else if (this.shape === "zero") {
//         c.font = `${this.radius * 5}px Arial`;
//         c.fillStyle = this.color;
//         c.fillText("0", this.x - this.radius, this.y + this.radius);
//       }
//     }
  
//     update() {
//       this.draw();
//       this.x += this.velocity.x;
//       this.y += this.velocity.y;
  
//       // Check collision with enemies
//       enemies.forEach((enemy) => {
//         const distance = Math.hypot(this.x - enemy.x, this.y - enemy.y);
  
//         if (distance - this.radius - enemy.radius < 1) {
//           // Collision detected
//           // Change color after collision
//           this.color = "red";
//           this.shape = "zero";
//           this.shape = "one"; // Change the color to red (you can set any color you want)
//         }
//       });
  
//       // Check collision with canvas boundary
//       if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
//         this.velocity.x = -this.velocity.x; // Reverse x velocity
//       }
  
//       if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
//         this.velocity.y = -this.velocity.y; // Reverse y velocity
//         // Collision with canvas boundary detected
//         this.color = "blue";
//         this.shape = "one";
//       }
//     }
//   }