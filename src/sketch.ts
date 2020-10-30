import * as p5 from "p5";

var osc;
let curMousedKey: Key;
let curPressedKeys: Key[];

// A key
interface Key {
  midiFreq: number,
  x: number,
  y: number,
  width: number,
  height: number,
  keyCode?: number,
  isBlack?: boolean,
  fillColor?: any
}

/**
 * Manual constructor bc this is bad
 * @param midiFreq midi frequency code
 * @param x x coord
 * @param y y coord
 * @param width width of key
 * @param height height of key
 * @param keyCode computer keycode
 * @param isBlack whether the key is black
 */
function makeKey(midiFreq: number, x: number, y: number, width: number, height: number, keyCode?: number, isBlack?: boolean): Key {
  return {
    midiFreq: midiFreq,
    x:  x,
    y:  y,
    width: width,
    height: height,
    keyCode: keyCode,
    isBlack: isBlack
  };
}

/**
 * Tests whether a coordinate point is within this object's bounds
 * @param pointX the x coord to test
 * @param pointY the y coord to test
 */
function isWithin(kb: Keyboard, key: Key, pointX: number, pointY: number): boolean {
  return pointX >= (key.x+kb.x) && pointX <= (key.x+kb.x) + key.width
      && pointY >= (key.y+kb.y) && pointY <= (key.y+kb.y) + key.height;
}

interface Keyboard {
  keys: Key[],
  x: number,
  y: number,
  width: number,
  height: number

  // constructor(/*keys: Key[], */x: number, y: number, width: number, height: number) {
  //   this.keys = [];
  //   this.x =x;
  //   this.y = y;
  //   this.width = width;
  //   this.height = height;
  // }

  // drawKey(key: Key, filler?) {
  //   if (!!filler) fill(filler);
  //   rect(key.x + this.x, key.y + this.y, key.width, key.height);
  // }
};
var keyboard: Keyboard;

function drawKey(keyboard:Keyboard, key: Key) {
  if (key.fillColor) fill(key.fillColor);
  else fill( (!key.isBlack) ? 255 : 0 );
  rect(key.x + keyboard.x, key.y + keyboard.y, key.width, key.height);
}

// /** 
//  * Tests whether a point is within a rectangular region.
//  * @param x the x coord to be considered
//  * @param y the y coord to be considered
//  * @param testX the lower x bound
//  * @param testY the lower y bound
//  * @param testWidth the width (such that x+width is the upper x bound)
//  * @param testHeight the height (such that y+height is the upper y bound)
//  */
// function isWithin(x, y, testX, testY, testWidth, testHeight) {
//   return x >= testX && x <= testX + testWidth
//       && y >= testY && y <= testY + testHeight;
// }

function setup() {
  createCanvas(1200, 400);
  stroke(0);

  // A triangle oscillator
  osc = new p5.TriOsc();
  // Start silent
  osc.start();
  osc.amp(0);
  // Defining the keyboard
  // keyboard = new Keyboard(20, 40, 800, 300);
  keyboard = { keys: [], x: 20, y: 40, width: 800, height: 300 };
  curPressedKeys = [];
  curMousedKey = null;

  // white keys
  let w = keyboard.width / 8;
  keyboard.keys.push(makeKey(60, 0 * w, 0, w, keyboard.height,  65)); // press a
  keyboard.keys.push(makeKey(62, 1 * w, 0, w, keyboard.height,  83)); // press s
  keyboard.keys.push(makeKey(64, 2 * w, 0, w, keyboard.height,  68)); // press d
  keyboard.keys.push(makeKey(65, 3 * w, 0, w, keyboard.height,  70)); // press f
  keyboard.keys.push(makeKey(67, 4 * w, 0, w, keyboard.height,  74)); // press j
  keyboard.keys.push(makeKey(69, 5 * w, 0, w, keyboard.height,  75)); // press k
  keyboard.keys.push(makeKey(71, 6 * w, 0, w, keyboard.height,  76)); // press l
  keyboard.keys.push(makeKey(72, 7 * w, 0, w, keyboard.height, 186)); // press ;

  // black keys
  let bw = w * 0.4; // TODO unhardcode x
  let bx = w - bw/2;
  keyboard.keys.push(makeKey(61, bx, 0, bw, keyboard.height * 0.6, 87, true ));
  keyboard.keys.push(makeKey(63, 180, 0, bw, keyboard.height * 0.6, 69, true ));
  keyboard.keys.push(makeKey(66, 380, 0, bw, keyboard.height * 0.6, 85, true ));
  keyboard.keys.push(makeKey(68, 480, 0, bw, keyboard.height * 0.6, 73, true ));
  keyboard.keys.push(makeKey(70, 580, 0, bw, keyboard.height * 0.6, 79, true ));
}

function draw() {
  // Draw a keyboard
  let mouseOnBlack = false;
  curMousedKey = null;
  for (let k of keyboard.keys) {
    // Mouse
    if (isWithin(keyboard, k, mouseX, mouseY)) {
      if (k.isBlack) mouseOnBlack = true;
      curMousedKey = k;
      // if (k.fillColor != "yellow") k.fillColor = "green";
    } else {
      // if (k.fillColor == "green") k.fillColor = null;
    }
 
    // Draw
    drawKey(keyboard, k);
    
  }
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

function keyPressed() {
  keyboard.keys.forEach(k => {
    if (!!k.keyCode && keyIsDown(k.keyCode)) curPressedKeys.push(k); // add k
    else curPressedKeys = curPressedKeys.filter(u => u != k); // remove k
  });

  curPressedKeys.forEach(k => {
    playNote(k.midiFreq);
    k.fillColor = "yellow";
  });
}

function keyReleased() {
  curPressedKeys.forEach(k => k.fillColor = null);
  osc.fade(0, 0.5);
}

// When we click
function mousePressed() {
  if (!!curMousedKey) {
    playNote(curMousedKey.midiFreq);
    curMousedKey.fillColor = "yellow";
  }
}


// Fade it out when we release
function mouseReleased() {
  curMousedKey.fillColor = null;
  osc.fade(0, 0.5);
}