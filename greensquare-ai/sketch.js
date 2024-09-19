console.log("sketch.js loading...");

let shapes = [];
let font;
let particles = [];
let starfield = [];
let introText = "Long long time ago...\n\nIn a galaxy far far away...\n\nThis was built by a Jedi named Prince...";
let introDuration = 15000; // 15 seconds
let introStartTime;
let introY;

function preload() {
  font = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Bold.otf');
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight, P2D);
  let mainElement = document.getElementById('main');
  if (mainElement) {
    canvas.parent(mainElement);
  } else {
    console.error("Main element not found");
  }
  canvas.style('border', '1px solid white');
  textFont(font);
  
  // Create starfield
  for (let i = 0; i < 100; i++) {
    starfield.push({
      x: random(width),
      y: random(height),
      size: random(1, 3)
    });
  }

  introStartTime = millis();
  introY = height;
}

function draw() {
  if (millis() - introStartTime < introDuration) {
    drawIntro();
  } else {
    drawMain();
  }
}

function drawIntro() {
  background(0);
  
  // Draw starfield
  fill(255);
  noStroke();
  for (let star of starfield) {
    ellipse(star.x, star.y, star.size);
  }
  
  // Draw intro text with crawl effect
  fill(0, 191, 255);
  textSize(32);
  textAlign(CENTER, CENTER);
  let lines = introText.split('\n');
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], width / 2, introY + i * 40);
  }
  
  introY -= 1; // Adjust this value to control the speed of the crawl
}

function drawMain() {
  background(0, 40);  // Semi-transparent background for trail effect
  
  // Draw starfield
  fill(255);
  noStroke();
  for (let star of starfield) {
    ellipse(star.x, star.y, star.size);
  }
  
  // Draw particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }

  // Draw and update shapes
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].move();
    shapes[i].show();
    for (let j = i + 1; j < shapes.length; j++) {
      if (shapes[i].checkCollision(shapes[j])) {
        shapes[i].resolveCollision(shapes[j]);
        createParticles(shapes[i].x, shapes[i].y);
      }
    }
  }

  // Draw cyberpunk-style text with neon blue glow
  drawNeonText("GALACTIC COLLISION: " + frameCount, 10, 20, color(0, 191, 255));
  drawNeonText("ACTIVE SHIPS: " + shapes.length, 10, 40, color(0, 191, 255));

  // Draw neon grid
  drawNeonGrid();
}

function mouseClicked() {
  if (typeof magicShape === 'undefined') {
    console.error("magicShape is not defined. Make sure magicShape.js is loaded correctly.");
    return false;
  }

  let x = mouseX;
  let y = mouseY;
  let size = random(30, 50);
  let vx = random(-2, 2);
  let vy = random(-2, 2);
  let type = random(['tieFighter', 'deathStar', 'xWing', 'star']);
  shapes.push(new magicShape(x, y, size, vx, vy, type));
  createParticles(x, y);
  return false;  // Prevent default behavior
}

function createParticles(x, y) {
  for (let i = 0; i < 20; i++) {
    particles.push(new Particle(x, y));
  }
}

function drawNeonText(message, x, y, textColor) {
  push();
  // Glow effect
  fill(textColor);
  textSize(14);
  textAlign(LEFT, TOP);
  textFont(font);
  
  // Draw the glow
  for (let i = 5; i > 0; i--) {
    let alpha = map(i, 0, 5, 255, 0);
    fill(red(textColor), green(textColor), blue(textColor), alpha);
    text(message, x, y);
  }
  
  // Draw the main text
  fill(255); // White text
  text(message, x, y);
  
  pop();
}

function drawNeonGrid() {
  push();
  strokeWeight(1);
  stroke(0, 255, 255, 20); // Cyan color with low opacity
  
  // Vertical lines
  for (let x = 0; x < width; x += 50) {
    line(x, 0, x, height);
  }
  
  // Horizontal lines
  for (let y = 0; y < height; y += 50) {
    line(0, y, width, y);
  }
  
  pop();
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    this.alpha = 255;
    this.color = color(random([255, 0, 255]), random([0, 255, 255]), random([0, 255, 255]));
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 5;
  }

  show() {
    noStroke();
    fill(red(this.color), green(this.color), blue(this.color), this.alpha);
    ellipse(this.x, this.y, 2);
  }

  isDead() {
    return this.alpha < 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

console.log("sketch.js loaded");
