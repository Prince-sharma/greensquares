console.log("magicShape.js loading...");

(function(global) {
  class magicShape {
    constructor(x, y, size, vx, vy, type) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.vx = vx;
      this.vy = vy;
      this.mass = 1;
      this.type = type;
      this.color = color(random([255, 0, 255]), random([0, 255, 255]), random([0, 255, 255]));
    }
  
    move() {
      if (this.x > width - this.size || this.x < 0) {
        this.vx = -this.vx;
      }
      if (this.y > height - this.size || this.y < 0) {
        this.vy = -this.vy;
      }
      this.x += this.vx;
      this.y += this.vy;
    }
  
    show() {
      push();
      stroke(this.color);
      strokeWeight(2);
      noFill();
      
      switch(this.type) {
        case 'tieFighter':
          this.drawTieFighter();
          break;
        case 'deathStar':
          this.drawDeathStar();
          break;
        case 'xWing':
          this.drawXWing();
          break;
        case 'star':
          this.drawStar();
          break;
        default:
          ellipse(this.x, this.y, this.size);
      }
      
      // Draw neon glow
      for (let i = 3; i > 0; i--) {
        stroke(red(this.color), green(this.color), blue(this.color), 50 / i);
        strokeWeight(i * 2);
        switch(this.type) {
          case 'tieFighter':
            this.drawTieFighter();
            break;
          case 'deathStar':
            this.drawDeathStar();
            break;
          case 'xWing':
            this.drawXWing();
            break;
          case 'star':
            this.drawStar();
            break;
          default:
            ellipse(this.x, this.y, this.size);
        }
      }
      
      pop();
    }
  
    drawTieFighter() {
      let halfSize = this.size / 2;
      rect(this.x - halfSize/4, this.y - halfSize, halfSize/2, this.size);
      ellipse(this.x, this.y, halfSize);
      line(this.x - halfSize, this.y - halfSize/2, this.x + halfSize, this.y - halfSize/2);
      line(this.x - halfSize, this.y + halfSize/2, this.x + halfSize, this.y + halfSize/2);
    }
  
    drawDeathStar() {
      ellipse(this.x, this.y, this.size);
      arc(this.x, this.y, this.size * 0.4, this.size * 0.4, 0, PI);
    }
  
    drawXWing() {
      let halfSize = this.size / 2;
      line(this.x - halfSize, this.y - halfSize, this.x + halfSize, this.y + halfSize);
      line(this.x - halfSize, this.y + halfSize, this.x + halfSize, this.y - halfSize);
      rect(this.x - halfSize/8, this.y - halfSize, halfSize/4, this.size);
    }

    drawStar() {
      let angle = TWO_PI / 5;
      let halfAngle = angle / 2.0;
      beginShape();
      for (let a = 0; a < TWO_PI; a += angle) {
        let sx = this.x + cos(a) * this.size / 2;
        let sy = this.y + sin(a) * this.size / 2;
        vertex(sx, sy);
        sx = this.x + cos(a + halfAngle) * this.size / 4;
        sy = this.y + sin(a + halfAngle) * this.size / 4;
        vertex(sx, sy);
      }
      endShape(CLOSE);
    }
  
    checkCollision(other) {
      let d = dist(this.x, this.y, other.x, other.y);
      return d < (this.size/2 + other.size/2);
    }
  
    resolveCollision(other) {
      let nx = other.x - this.x;
      let ny = other.y - this.y;
      let len = Math.sqrt(nx*nx + ny*ny);
      nx /= len;
      ny /= len;

      let rvx = this.vx - other.vx;
      let rvy = this.vy - other.vy;

      let impulse = 2 * (rvx * nx + rvy * ny) / (this.mass + other.mass);

      this.vx -= impulse * other.mass * nx;
      this.vy -= impulse * other.mass * ny;
      other.vx += impulse * this.mass * nx;
      other.vy += impulse * this.mass * ny;

      let overlap = (this.size/2 + other.size/2) - len;
      this.x -= overlap/2 * nx;
      this.y -= overlap/2 * ny;
      other.x += overlap/2 * nx;
      other.y += overlap/2 * ny;
    }
  }

  global.magicShape = magicShape;
  console.log("magicShape class defined and added to global scope");
})(typeof window !== 'undefined' ? window : this);