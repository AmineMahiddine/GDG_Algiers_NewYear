// Daniel Shiffman
// http://codingtra.in
// https://youtu.be/CKeyIbT3vXI

const fireworks = [];
let gravity1;

function setup() {
  var canvasDiv = document.querySelector('#black');
  var canvas1 = createCanvas(windowWidth, windowHeight);
  canvas1.parent(canvasDiv);
  colorMode(HSB);
  gravity1 = createVector(0, 0.2);
  stroke(255);
  strokeWeight(4);
  background(0);
}

function windowResized() {
  var canvasDiv = document.querySelector('#black');
  var canvas1 = createCanvas(windowWidth, windowHeight);
  canvas1.parent(canvasDiv);
  colorMode(HSB);
  gravity1 = createVector(0, 0.2);
  stroke(255);
  strokeWeight(4);
  background(0);
}


function draw() {
  colorMode(RGB);
  background(0, 0, 0, 25);

  if (random(1) < 0.03) {
    fireworks.push(new Firework());
  }

  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();

    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }
}
