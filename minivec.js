class Vector2 {
  constructor (x,y) {
    this.x = x;
    this.y = y;  
  }
  magnitude () {
    return Math.sqrt(Vector2.dot(this, this));
  }
  bipolarMag () {
    var mag = this.magnitude();
    if(this.x + this.y > 0) {
        return mag - 1;
    } else {
      return mag*-1 + 1;
    }
  }
  normalize () {
    var m = 1/this.magnitude();
    if(m == Infinity) {
      m = 0;
    }
    this.x = this.x * m;
    this.y = this.y * m;
  }
  multiply(scaler) {
    this.x = this.x * scaler;
    this.y = this.y * scaler;
  }
  add (v) {
    this.x = this.x + v.x;
    this.y = this.y + v.y;
  }
  subract(v) {
    var n = new Vector2(v.x, v.y);
        n.negate();
    this.add(m);
  }
  divide(scaler) {
    scaler = 1/scaler;
    this.multiply(scaler)
  }
  negate() {
    this.x = -this.x;
    this.y = -this.y;
  }
  clamp (limit) {
    if (this.x > limit) {
      this.x = limit;
    }
    if (this.y > limit) {
      this.y = limit;
    }
  }
  rotate (degrees) {
        var rads = Vector2.degreesToRadians(degrees);
        var cosineAngle = Math.cos(rads);
        var sineAngle   = Math.sin(rads);
        console.log(cosineAngle, sineAngle)
        this.x = cosineAngle*this.x - sineAngle*this.y;
        this.y = sineAngle*this.x + cosineAngle*this.y;
  } 
  static radiansToDegrees(radians) {
    return radians * (180 / Math.PI);
  }
  static degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
  }
  static angleBetween(a, b) {
      return Math.atan2(b.y - a.y, b.x - a.x);
  }
  static lerp (a, b, t) {
    var x = a.x + t * (b.x - a.x);
    var y = a.y + t * (b.y - a.y);
    return new Vector2(x,y); 
  }
  static normalize (a) {
    var m = 1/a.magnitude();
    if(m == Infinity) {
      m = 0;
    }
    return new Vector2(a.x * m, a.y * m);
  }
  increase(amount) {
    this.x = this.x + amount;
    this.y = this.y + amount;
  }
    decrease(amount) {
    this.x = this.x - amount;
    this.y = this.y -amount;
  }
  static add (a, b) {
    return new Vector2((a.x + b.x),(a.y + b.y));   
  }
  static subtract (a, b) {
    var n = new Vector2(b.x, b.y);
        n.negate();
    return Vector2.add(a, n);  
  }
  static multiply (a, scaler) {
    return new Vector2((a.x * scaler),(a.y * scaler));   
  }  
  static divide (a, scaler) {
    scaler = 1/scaler;
    return multiply(a, scaler);
  }  
  static dot (a, b) {
     return a.x * b.x + a.y * b.y;
  }
  static dist (a, b) {
    var vec1 = a.x - b.x;
    var vec2 = a.y - b.y;
    return Math.sqrt((vec1 * vec1)+(vec2 * vec2));
  }
  get () {
    return new Vector2(this.x, this.y);
  }
  set (x,y) {
    this.x = x;
    this.y = y;
  }
}

class Mover {
  constructor(x,y) {
      this.location = new Vector2(x,y);
      this.acceleration = new Vector2(0,0);
      this.velocity = new Vector2(0,0);
      this.mass = 5;
  } 
  applyForce(force) {
    var f = force.get(); 
        f.divide(this.mass);
    this.acceleration.add(f);
  }
  update () {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.set(0,0);
  }
}

class Attractor {
  constructor(x,y) {
    this.mass = 100;
    this.location = new Vector2(x,y);
  }
  attract(m) {
    // not implemented
  }
}