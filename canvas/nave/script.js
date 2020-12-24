const canvas = document.querySelector("canvas");
canvas.style.border = "1px solid black";
const context = canvas.getContext("2d");

context.fillStyle = "red";
context.fillRect(50, 50, 100, 100);

context.lineWidth = 3;
context.strokeStyle = "blue";
context.strokeRect(50, 50, 100, 100);

context.beginPath();
context.moveTo(170, 10);
context.lineTo(190, 70);
context.strokeStyle = "green";
context.stroke();

context.beginPath();
context.fillStyle = "orange";
context.arc(250, 50, 40, (90 * Math.PI) / 180, (270 * Math.PI) / 180, false);
context.fill();
