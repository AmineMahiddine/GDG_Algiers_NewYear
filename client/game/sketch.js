

let v = 1;
let vbird = 0;
let gravity = 0.3;
let y = 150;
let r = 30;   //bird size
let pause = false;
const x = 200;
let img, back, pipe, pipeUp;
let min, max;
let angel;
let falling = true;
let count = 0;
let bestScore = 0;


function preload() {
  img = loadImage('birdPixel.png');
  // back = loadImage('background.PNG');
  pipe = loadImage('PipeDown.png');
  pipeUp = loadImage('PipeUp.png');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  obstacle = new Obstacle;
  angel = PI / 10;
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  obstacle = new Obstacle;
  angel = PI / 10;
}


function draw() {
  background(0);
  fill(255, 0, 0);
  push();
  noStroke();
  translate(x, y);
  if (falling)
    rotate(angel);
  else
    rotate(-angel);
  imageMode(CENTER);
  image(img, 0, 0, r, r);
  vbird += gravity;
  y += vbird;
  pop();

  obstacle.update();
  obstacle.hit1(y);
  if (y < 0 || y > windowHeight) {
    obstacle.revive();
  }
  if (!falling)
    count++;

  if (count % 5 === 0)
    falling = true;
  // score --------------------------------------
  fill(255);
  textSize(18);
  text("Best Score : " + bestScore, 25, 25);
  text("Score : " + obstacle.score, 25, 45);
  textSize(13);
  text("Press P TO Play ", 25, windowHeight - 15);
}

function keyPressed(e) {
  if (keyCode === 32) {
    vbird = -4;
    falling = false;
  }
  if (keyCode === 80) {
    if (pause) {
      loop();
      pause = false;
    } else {
      noLoop();
      pause = true;
    }
  }
}

function touchStarted() {
  vbird = -4;
  falling = false;

}



class Obstacle {
  constructor() {
    this.x1 = windowWidth / 2;
    this.x2 = this.x1 + windowWidth / 5;
    this.x3 = this.x2 + windowWidth / 5;
    this.x4 = this.x3 + windowWidth / 5;
    this.life = true;
    this.score = 0;
    this.h1 = random(height - 100);
    min = this.h1 - 150;
    max = this.h1 + 150;
    this.h2 = this.randomPipe();
    this.h3 = this.randomPipe();
    this.h4 = this.randomPipe();
  }

  update() {
    fill(0, 255, 0);
    // UP
    image(pipeUp, this.x1 -= v, - pipeUp.height + this.h1);
    image(pipeUp, this.x2 -= v, - pipeUp.height + this.h2);
    image(pipeUp, this.x3 -= v, - pipeUp.height + this.h3);
    image(pipeUp, this.x4 -= v, - pipeUp.height + this.h4);

    // DOWN
    image(pipe, this.x1 -= v, this.h1 + 100);
    image(pipe, this.x2 -= v, this.h2 + 100);
    image(pipe, this.x3 -= v, this.h3 + 100);
    image(pipe, this.x4 -= v, this.h4 + 100);


    if (this.x1 + 100 <= 0)
      this.x1 = this.x4 + (windowWidth / 5);
    if (this.x2 + 100 <= 0)
      this.x2 = this.x1 + (windowWidth / 5);
    if (this.x3 + 100 <= 0)
      this.x3 = this.x2 + (windowWidth / 5);
    if (this.x4 + 100 <= 0)
      this.x4 = this.x3 + (windowWidth / 5);

  }

  randomPipe() {
    if (min < 0)
      min = 0;
    if (max > height)
      max = height - 100;
    let rand = random(min, max);
    min = rand - 150;
    max = rand + 150;
    return rand;

  }

  hit1(y) {
    fill(0, 0, 255);
    if (collideRectCircle(this.x1, 0, 100, this.h1, x, y - vbird, r)) {
      //rect(this.x1 + v, 0, 50, 200);
      this.life = false;
    }
    if (collideRectCircle(this.x1, this.h1 + 100, 100, height - (this.h1 + 100), x, y - vbird, r)) {
      //rect(this.x1, height - 100, 50, 100);
      this.life = false;
    }


    if (collideRectCircle(this.x2, 0, 100, this.h2, x, y - vbird, r)) {
      //rect(this.x2 + v, 0, 50, 150);
      this.life = false;
    }
    if (collideRectCircle(this.x2, this.h2 + 100, 100, height - (this.h2 + 100), x, y - vbird, r)) {
      //rect(this.x2, height - 150, 50, 150);
      this.life = false;
    }


    if (collideRectCircle(this.x3, 0, 100, this.h3, x, y - vbird, r)) {
      //rect(this.x3 + v, 0, 50, 100);
      this.life = false;
    }
    if (collideRectCircle(this.x3, this.h3 + 100, 100, height - (this.h3 + 100), x, y - vbird, r)) {
      //rect(this.x3, height - 200, 50, 200);
      this.life = false;
    }

    if (collideRectCircle(this.x4, 0, 100, this.h4, x, y - vbird, r)) {
      //rect(this.x4 + v, 0, 50, 150);
      this.life = false;
    }

    if (collideRectCircle(this.x4, this.h4 + 150, 100, height - (this.h4 + 100), x, y - vbird, r)) {
      //rect(this.x4, height - 150, 50, 150);
      this.life = false;
    }
    this.scoreF(this.x1);
    this.scoreF(this.x2);
    this.scoreF(this.x3);
    this.scoreF(this.x4);

    if (!this.life)
      this.revive();
  }


  scoreF(xPosition) {
    if (x - r / 2 >= xPosition + 50 && x - r / 2 <= xPosition + 50 + v) {
      this.score++;
      /*document.querySelector("span").textContent = this.score;*/

    }
  }

  revive() {
    bestScore = Math.max(this.score, bestScore);
    this.x1 = windowWidth / 2;
    this.x2 = this.x1 + windowWidth / 5;
    this.x3 = this.x2 + windowWidth / 5;
    this.x4 = this.x3 + windowWidth / 5;
    this.life = true;
    this.score = 0;
    this.h1 = this.randomPipe();
    this.h2 = this.randomPipe();
    this.h3 = this.randomPipe();
    this.h4 = this.randomPipe();
    y = 90;
    push()
    fill(255);
    textSize(50);
    textAlign(CENTER, CENTER);
    text("Press P To Restart 😋 ", width / 2, height / 2);
    pop();
    noLoop();
    pause = true;
    vbird = 0;
    /*document.querySelector("span").textContent = 0;*/
  }
}

// afficher le score sur la page
/*let scoreHTML = document.createElement("span");
scoreHTML.textContent = "0";
scoreHTML.style.fontSize = "1.2em";

let miseEnScore = document.createElement("p");
miseEnScore.textContent = "SCORE : ";
miseEnScore.style.fontSize = "2em";
miseEnScore.style.marginLeft = "200px";
miseEnScore.appendChild(scoreHTML);

document.body.appendChild(miseEnScore);*/
