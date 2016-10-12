export default class Vector2 {

	static angleBetween(a, b) {
		return Math.atan2(b.y - a.y, b.x - a.x);
	}

	static lerp(a, b, t) {
		var x = a.x + t * (b.x - a.x);
		var y = a.y + t * (b.y - a.y);
		return new Vector2(x, y);
	}

	static map(value, bottomA, topA, bottomB, topB) {
		return bottomB + (topB - bottomB) * (value - bottomA) / (topA - bottomA);
	}

	static normalize(vector) {
		var vec = vector.get();
		return vec.normalize();
	}

	static radiansToDegrees(radians) {
		return radians * (180 / Math.PI);
	}

	static degreesToRadians(degrees) {
		return degrees * (Math.PI / 180);
	}

	static add(a, b) {
		return new Vector2((a.x + b.x), (a.y + b.y));
	}

	static subtract(a, b) {
		var n = new Vector2(b.x, b.y);
		n.negate();
		return Vector2.add(a, n);
	}

	static multiply(a, scalar) {
		return new Vector2(a.x * scalar, a.y * scalar);
	}

	static divide(a, scalar) {
		scalar = 1 / scalar;
		return multiply(a, scalar);
	}

	static dot(a, b) {
		return a.x * b.x + a.y * b.y;
	}

	static dist(a, b) {
		var vec1 = a.x - b.x;
		var vec2 = a.y - b.y;
		return Math.sqrt((vec1 * vec1) + (vec2 * vec2));
	}

	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	get() {
		return new Vector2(this.x, this.y);
	}

	set(x, y) {
		this.x = x;
		this.y = y;
	}

	multiply(scalar) {
		this.x = this.x * scalar;
		this.y = this.y * scalar;
	}

	add(v) {
		this.x = this.x + v.x;
		this.y = this.y + v.y;
	}

	subtract(v) {
		var n = new Vector2(v.x, v.y);
		n.negate();
		this.add(n);
	}

	divide(scalar) {
		scalar = 1 / scalar;
		this.multiply(scalar)
	}

	negate() {
		this.x = -this.x;
		this.y = -this.y;
	}

	clamp(limit) {
		if (this.x > limit) {
			this.x = limit;
		} else if (this.x < 0 && this.x < limit) {
			this.x = -limit;
		}
		if (this.y > limit) {
			this.y = limit;
		} else if (this.y < 0 && this.y < limit) {
			this.y = -limit;
		}
	}

	limit(limit) {
		if (this.magnitude() > limit) {
			this.normalize();
			this.multiply(limit);
		}
	}

	rotate(degrees) {
		var rads = Vector2.degreesToRadians(degrees);
		var cosineAngle = Math.cos(rads);
		var sineAngle = Math.sin(rads);
		this.x = cosineAngle * this.x - sineAngle * this.y;
		this.y = sineAngle * this.x + cosineAngle * this.y;
	}

	magnitude() {
		return Math.sqrt(Vector2.dot(this, this));
	}

	normalize() {
		var m = this.magnitude();
		if (m > 0) {
			this.divide(m);
		}
	}

}