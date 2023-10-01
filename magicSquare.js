class magicSquare {
    constructor(x, y, side, vx, vy) {
      this.x = x;
      this.y = y;
      this.side = side;
      this.vx = vx;
      this.vy = vy;
    }
  
    move() {
      if (this.x > width - this.side || this.x < 0 + this.side / 2) {
        this.vx = -1 * this.vx;
      }
      if (this.y > height - this.side || this.y < 0 + this.side / 2) {
        this.vy = -1 * this.vy;
      }
      this.x += this.vx;
      this.y += this.vy;
    }
  
    show() {
      stroke(49, 222, 0);
      strokeWeight(5);
      noFill();
      // rectMode(CENTER);
      rect(this.x, this.y, this.side);
    }
  
    checkBounce(x, y, size) {
      // print(this.x,x);
      if (
        x > this.x &&
        x < this.x + this.side &&
        y > this.y &&
        y < this.y + this.side
      ) {
        this.vx = -1 * this.vx;
        this.vy = -1 * this.vy;
        print("hello");
      }
    }
  }
  