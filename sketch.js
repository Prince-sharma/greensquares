let msq = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // for (let i = 0; i < 10; i++) {
  //   x = random(10, width - 10);
  //   y = random(10, height - 10);
  //   size = random(2, 10);
  //   msq[i] = new magicSquare(x, y, 20, size, size);
  // }
}

function draw() {
  background(0);
  for (let i = 0; i < msq.length; i++) {
    msq[i].move();
    msq[i].show();
    for (let j = 0; j < msq.length; j++) {
      if (i != j) {
        msq[j].checkBounce(msq[i].x, msq[i].y, msq[i].size);
        // print(i,j);
      }
    }
  }
}

function mousePressed() {
  x = mouseX;
  y = mouseY;
  // x = random(10, width - 10);
  // y = random(10, height - 10);
  size = random(30, 50);
  msq.push(new magicSquare(x, y, size, 4, 4));
}
