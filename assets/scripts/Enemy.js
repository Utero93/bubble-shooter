// const canvas = document.querySelector("canvas");
// const c = canvas.getContext("2d");

// export default class Enemy {
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
  
//       // Draw a circle shape enemy
//       if (this.shape === "circle") {
//         c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  
//         // Draw a square shape enemy
//       } else if (this.shape === "square") {
//         c.rect(
//           this.x - this.radius,
//           this.y - this.radius,
//           this.radius * 2,
//           this.radius * 2
//         );
  
//         // Draw a triangle shape enemy
//       } else if (this.shape === "triangle") {
//         // Draw a triangle
//         c.moveTo(this.x, this.y - this.radius);
//         c.lineTo(this.x + this.radius, this.y + this.radius);
//         c.lineTo(this.x - this.radius, this.y + this.radius);
  
//         // draw an octagon shape enemy
//       } else if (this.shape === "octagon") {
//         // Draw an octagon
//         let angle = Math.PI / 4;
//         c.moveTo(
//           this.x + this.radius * Math.cos(0),
//           this.y + this.radius * Math.sin(0)
//         );
  
//         for (let i = 1; i < 8; i++) {
//           c.lineTo(
//             this.x + this.radius * Math.cos(angle * i),
//             this.y + this.radius * Math.sin(angle * i)
//           );
//         }
  
//         // draw a rectangle shape enemy
//       } else if (this.shape === "rectangle") {
//         // Draw a rectangle
//         c.rect(
//           this.x - this.radius,
//           this.y - this.radius / 2,
//           this.radius,
//           this.radius / 2
//         );
  
//         // trapezoid shape enemy
//       } else if (this.shape === "trapezoid") {
//         // Draw a trapezoid
//         c.moveTo(this.x - this.width / 2, this.y + this.height / 2);
//         c.lineTo(this.x + this.width / 2, this.y + this.height / 2);
//         c.lineTo(this.x + 2 * this.width, this.y - this.height / 2);
//         c.lineTo(this.x - 4 * this.width, this.y - this.height / 2);
  
//         // boss 1 shape
//       } else if (this.shape === "boss1") {
//         // Draw the boss base circle
//         c.fillStyle = "red";
//         c.beginPath();
//         c.arc(this.x, this.y, this.radius, 0, Math.PI * 2.75);
//         c.fill();
  
//         // Draw eyes (white circles) for boss
//         c.fillStyle = "white";
//         c.beginPath();
//         c.arc(this.x - 15, this.y - 15, 5, 0, Math.PI * 2);
//         c.fill();
//         c.beginPath();
//         c.arc(this.x + 15, this.y - 15, 5, 0, Math.PI * 2);
//         c.fill();
  
//         // Draw mouth (frown emoji) for boss
//         c.strokeStyle = "white";
//         c.lineWidth = 3;
//         c.beginPath();
//         c.arc(this.x, this.y + 10, 15, 1 * Math.PI, 2 * Math.PI, false);
//         c.stroke();
//         // c.beginPath();
//         // c.arc(this.x, this.y + 10, 15, 1.25 * Math.PI, 1.75 * Math.PI, false);
//         c.stroke();
  
//         // boss 2 shape
//       } else if (this.shape === "boss2") {
//         // Draw the boss shape
//         c.fillStyle = "blue";
//         c.fillRect(
//           this.x - this.radius,
//           this.y - this.radius,
//           this.radius * 2,
//           this.radius * 4
//         );
  
//         // Draw eyes (white circles) for boss
//         c.fillStyle = "white";
//         c.arc(this.x - 15, this.y - 15, 5, 0, Math.PI * 2, false);
//         c.fill();
//         c.arc(this.x + 15, this.y - 15, 5, 0, Math.PI * 2, false);
//         c.fill();
  
//         // Draw frown (curved line) for boss
//         c.strokeStyle = "white";
//         c.beginPath();
//         c.arc(this.x, this.y + 10, 15, 0, Math.PI, true);
//         c.stroke();
  
//         // Draw boss 3 shape
//       } else if (this.shape === "boss3") {
//         c.save(); // Save the current canvas state
  
//         // Draw horns (triangular shapes) on the boss
//         c.beginPath();
//         c.moveTo(this.x - this.radius * 1, this.y - this.radius * 1);
//         c.lineTo(this.x - this.radius * 0.5, this.y - this.radius * 0.6);
//         c.lineTo(this.x - this.radius * 0.4, this.y - this.radius * 1);
//         c.closePath();
//         c.fillStyle = this.color;
//         c.fill();
  
//         c.beginPath();
//         c.moveTo(this.x + this.radius * 1, this.y - this.radius * 1);
//         c.lineTo(this.x + this.radius * 0.5, this.y - this.radius * 0.6);
//         c.lineTo(this.x + this.radius * 0.4, this.y - this.radius * 1);
//         c.closePath();
//         c.fillStyle = this.color;
//         c.fill();
  
//         // Draw large circle boss shape resembling 👿 emoji
//         c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
//         c.fillStyle = this.color;
//         c.fill();
  
//         // Eyes (small circles inside the boss shape) - Adjust positions as needed
//         c.beginPath();
//         c.arc(
//           this.x - this.radius * 0.4,
//           this.y - this.radius * 0.3,
//           this.radius * 0.2,
//           0,
//           Math.PI * 2
//         );
//         c.fillStyle = "white";
//         c.fill();
  
//         c.beginPath();
//         c.arc(
//           this.x + this.radius * 0.4,
//           this.y - this.radius * 0.3,
//           this.radius * 0.2,
//           0,
//           Math.PI * 2
//         );
//         c.fill();
  
//         // Mouth (arc inside the boss shape)
//         c.beginPath();
//         c.arc(
//           this.x,
//           this.y + this.radius * 0.5,
//           this.radius * 0.4,
//           Math.PI * 0.2,
//           Math.PI * 0.8
//         );
//         c.strokeStyle = "black";
//         c.lineWidth = this.radius * 0.1;
//         c.stroke();
//       } else if (this.shape === "boss4") {
//         c.fillStyle = this.color;
//         c.moveTo(this.x, this.y - this.radius);
//         c.lineTo(this.x + this.radius, this.y + this.radius);
//         c.lineTo(this.x - this.radius, this.y + this.radius);
//         c.closePath();
//         c.fill();
  
//         // Draw a red circle eye in the center
//         c.beginPath();
//         c.fillStyle = "white";
//         c.arc(this.x, this.y, this.radius * 0.3, 0, Math.PI * 2, false);
//         c.fill();
//         c.closePath();
  
//         c.restore(); // Restore the previous canvas state
//       }
//       c.fillStyle = this.color;
//       c.fill();
//       c.closePath();
  
//       c.shadowColor = "white"; // Bright glow color
//       c.shadowBlur = 8; // Increase shadow blur for glow effect
//       c.fillStyle = this.color;
//       c.fill();
//     }
  
//     update() {
//       this.draw();
//       this.x += this.velocity.x;
//       this.y += this.velocity.y;
//     }
//   }