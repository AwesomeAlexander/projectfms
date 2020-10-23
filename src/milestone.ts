// Done in typescript

// var x = 0,
//   y = 0,
//   vx = 0,
//   vy = 0,
//   angle = 0,
//   accel = 0,
//   sped = 0;
// const ACCEL = 0.1;
// const DISTAN = 200;

// List of shapes to be added
// type ShapePlacement = {
//   shap,
//   inputs,
//   fill?,
//   stroke?
// };
// var shapes: ShapePlacement[];
var shapes;

function setup() {
  console.log("p5js, setting up!")
  createCanvas(windowWidth, windowHeight);

  // Add shapes upon setup
  shapes = [];
  shapes.push({shap: circle, inputs: [windowWidth/2, windowHeight/2, 20], fill: "red", stroke: "green"});
  shapes.push({shap: circle, inputs: [windowWidth/2, windowHeight/2, 30], fill: "blue", stroke: "yellow"});
  shapes.push({shap: square, inputs: [windowWidth/2, windowHeight/2, 10], fill: "orange", stroke: "black"});
  shapes.push({shap: triangle, inputs: [100, 100, 200, 100, 100, 200], fill: "black", stroke: "orange"});
}

function draw() {
  background("azure");
  // fill("blue");
  
  // let diffX = mouseX - x, diffY = mouseY - y;
  // let dis = dist(mouseX, mouseY, x, y)
  // angle = Math.atan2(diffY, diffX);
  // accel = ACCEL * (dis / DISTAN - 1);
  // sped = max(sped + accel, 0);
  // vx = sped * cos(angle);
  // vy = sped * sin(angle);
  // if (dis > 10) {
  //   x += vx;
  //   y += vy;
  // }
  // // console.log("(",x,",",y,") - towards ",angle);
  // circle(x, y, 20);
  // fill("yellow")
  // // circle ((x-2), (y-2), 40)

  // Draw all shapes in the shapes list with corresponding fill colors
  shapes.forEach(s => {
    if (!!s.fill) fill(s.fill);
    if (!!s.stroke) stroke(s.stroke);
    s.inputs[0] += random(-2, 2);
    s.inputs[1] += random(-2, 2);
    s.shap(...s.inputs);
  });
}