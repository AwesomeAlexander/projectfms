import p5 = require("p5");

// The midi notes of a scale
var notes;
var osc;

// A key
type Key = {
  midiFreq: number,
  x: number,
  y: number,
  width: number,
  height: number,
  isBlack?: boolean
}
type Keyboard = { keys: Key[], x: number, y: number, width: number, height: number };
var keyboard: Keyboard;

/**
 * Tests whether a point is within a rectangular region.
 * @param x the x coord to be considered
 * @param y the y coord to be considered
 * @param testX the lower x bound
 * @param testY the lower y bound
 * @param testWidth the width (such that x+width is the upper x bound)
 * @param testHeight the height (such that y+height is the upper y bound)
 */
function isWithin(x, y, testX, testY, testWidth, testHeight) {
  return x >= testX && x <= testX + testWidth
    && y >= testY && y <= testY + testHeight;
}

function setup() {
  createCanvas(800, 400);
  stroke("black");

  // A triangle oscillator
  osc = new p5.TriOsc();
  // Start silent
  osc.start();
  osc.amp(0);
  // Defining the keyboard
  keyboard = { keys: [], x: 0, y: 0, width: windowWidth, height: windowHeight };

  // white keys
  let w = keyboard.width / 8;
  keyboard.keys.push({ midiFreq: 60, x: 0 * w, y: 0, width: w, height: keyboard.height });
  keyboard.keys.push({ midiFreq: 62, x: 1 * w, y: 0, width: w, height: keyboard.height });
  keyboard.keys.push({ midiFreq: 64, x: 2 * w, y: 0, width: w, height: keyboard.height });
  keyboard.keys.push({ midiFreq: 65, x: 3 * w, y: 0, width: w, height: keyboard.height });
  keyboard.keys.push({ midiFreq: 67, x: 4 * w, y: 0, width: w, height: keyboard.height });
  keyboard.keys.push({ midiFreq: 69, x: 5 * w, y: 0, width: w, height: keyboard.height });
  keyboard.keys.push({ midiFreq: 71, x: 6 * w, y: 0, width: w, height: keyboard.height });
  keyboard.keys.push({ midiFreq: 72, x: 7 * w, y: 0, width: w, height: keyboard.height });

  // black keys
  let black_w = w * 0.4; // TODO fix
  keyboard.keys.push({ midiFreq: 61, x: 80, y: 0, width: black_w, height: keyboard.height / 2, isBlack: true });
  keyboard.keys.push({ midiFreq: 63, x: 180, y: 0, width: black_w, height: keyboard.height / 2, isBlack: true });
  keyboard.keys.push({ midiFreq: 66, x: 380, y: 0, width: black_w, height: keyboard.height / 2, isBlack: true });
  keyboard.keys.push({ midiFreq: 68, x: 480, y: 0, width: black_w, height: keyboard.height / 2, isBlack: true });
  keyboard.keys.push({ midiFreq: 70, x: 580, y: 0, width: black_w, height: keyboard.height / 2, isBlack: true });
}

function draw() {
  // Draw a keyboard
  // keyboard.keys.forEach(k => {
  for (let k of keyboard.keys) {
    fill(200);
    if (isWithin(mouseX, mouseY, k.x + keyboard.x, k.y + keyboard.y, k.width + keyboard.width, k.height + keyboard.height)) {
      if (mouseIsPressed) fill(100, 255, 100);
      else fill(127);
    }
    rect(k.x + keyboard.x, k.y + keyboard.y, k.width + keyboard.width, k.height + keyboard.height);
  } //});
}

// A function to play a note
function playNote(note, duration?) {
  osc.freq(midiToFreq(note));
  // Fade it in
  osc.fade(0.5, 0.2);

  // If we sest a duration, fade it out
  if (duration) {
    setTimeout(function () {
      osc.fade(0, 0.2);
    }, duration - 50);
  }
}

// When we click
function mousePressed() {
  // Map mouse to the key index
  for (let k of keyboard.keys.reverse()) {
    if (isWithin(mouseX, mouseY, k.x + keyboard.x, k.y + keyboard.y, k.width + keyboard.width, k.height + keyboard.height)) {
      playNote(k.midiFreq);
      return;
    }
  }
}


// Fade it out when we release
function mouseReleased() {
  osc.fade(0, 0.5);
}
