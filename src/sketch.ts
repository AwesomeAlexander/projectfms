var x: number = 0,
  y: number = 0,
  vx: number = 0,
  vy: number = 0,
  angle: number = 0,
  accel: number = 0,
  sped: number = 0;
const ACCEL: number = 0.1;
const DISTAN: number = 200;

function setup() {
  console.log("p5js, setting up!")
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("azure");
  fill("green");
  
  let diffX = mouseX - x, diffY = mouseY - y;
  let dis = dist(mouseX, mouseY, x, y)
  angle = Math.atan2(diffY, diffX);
  accel = ACCEL * (dis / DISTAN - 1);
  sped = max(sped + accel, 0);
  vx = sped * cos(angle);
  vy = sped * sin(angle);
  if (dis > 10) {
    x += vx;
    y += vy;
  }
  // console.log("(",x,",",y,") - towards ",angle);
  circle(x, y, 20);
}