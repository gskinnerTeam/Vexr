class Vector2 {
  constructor (x,y) {
    this.x = x;
    this.y = y;  
  }
  magnitude () {
    return Math.sqrt(Vector2.dot(this, this));
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
    this.x = this.x / scaler;
    this.y = this.y / scaler;
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
    return new Vector2((a.x / scaler),(a.y / scaler));   
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