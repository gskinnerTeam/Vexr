import Convert from "./Convert";

export default class Vector3 {

	static reset(v) {
		v.set(0,0,0);
	}

	static angleBetween(a, b) {
		var mag = a.magnitude() * b.magnitude();
		var dot = Vector3.dot(a, b);
		return Math.acos(dot / mag);
	}

	static lerp(a, b, t, v = new Vector3()) {
		v.set(
			a.raw[0] + t * (b.raw[0] - a.raw[0]),
			a.raw[1] + t * (b.raw[1] - a.raw[1]),
			a.raw[2] + t * (b.raw[2] - a.raw[2])
		);
		return v;
	}

	static normalize(vector, v = new Vector3()) {
		var vec = vector.get(v);
		vec.normalize();
		return vec;
	}

	static magnitude(vector) {
		return Math.sqrt(Vector3.dot(vector, vector));
	}

	static add(a, b, v = new Vector3()) {
		v.set(a.raw[0] + b.raw[0], a.raw[1] + b.raw[1], a.raw[2] + b.raw[2]);
		return v;
	}

	static subtract(a, b, v = new Vector3()) {
		v.set(a.raw[0] - b.raw[0], a.raw[1] - b.raw[1], a.raw[2] - b.raw[2]);
		return v;
	}

	static multiply(a, scalar, v = new Vector3()) {
		v.set(a.raw[0] * scalar, a.raw[1] * scalar, a.raw[2] * scalar);
		return v;
	}

	static divide(a, scalar, v = new Vector3()) {
		scalar = 1/scalar;
		v.set(a.raw[0] * scalar, a.raw[1] * scalar, a.raw[2] * scalar);
		return v;
	}

	static dot(a, b) {
		return a.raw[0] * b.raw[0] + a.raw[1] * b.raw[1] + a.raw[2] * b.raw[2];
	}

	static cross(a, b, v = new Vector3()) {
		v.set(
			a.raw[1] * b.raw[2] - b.raw[1] * a.raw[2],
			a.raw[2] * b.raw[0] - b.raw[2] * a.raw[0],
			a.raw[0] * b.raw[1] - b.raw[0] * a.raw[1]);
		return v;
	}


	static dist(a, b) {
		var vec1 = a.raw[0] - b.raw[0];
		var vec2 = a.raw[1] - b.raw[1];
		var vec3 = a.raw[2] - b.raw[2];
		return Math.sqrt((vec1 * vec1) + (vec2 * vec2) + (vec3 * vec3));
	}

	constructor(x = 0, y = 0, z = 0, w = 0) {
		this.raw = new Float32Array(4);
		this.raw[0] = x;
		this.raw[1] = y;
		this.raw[2] = z;
		this.raw[3] = w;
	}

	get x () {
		return this.raw[0];
	}

	set x (value) {
		this.raw[0] = value;
	}

	get y () {
		return this.raw[1];
	}

	set y (value) {
		this.raw[1] = value;
	}

	get z () {
		return this.raw[2];
	}

	set z (value) {
		this.raw[2] = value;
	}

	get w() {
		return this.raw[3];
	}
	set w(value) {
		this.raw[3] = value;
	}

	get(v = new Vector3()) {
		v.set(this.raw[0], this.raw[1], this.raw[2], this.raw[3]);
		return v;
	}

	set(x=0, y=0, z=0, w=0) {
		this.raw[0] = x;
		this.raw[1] = y;
		this.raw[2] = z;
		this.raw[3] = w;
	}

	multiply(scalar) {
		Vector3.multiply(this, scalar, this);
	}

	add(v) {
		Vector3.add(this, v, this);
	}

	subtract(v) {
		Vector3.subtract(this, v, this);
	}

	divide(scalar) {
		Vector3.divide(this, scalar, this);
	}

	negate() {
		this.raw[0] = -this.raw[0];
		this.raw[1] = -this.raw[1];
		this.raw[2] = -this.raw[2];
	}

	clamp(limit) {
		if (this.raw[0] > limit) {
			this.raw[0] = limit;
		} else if (this.raw[0] < 0 && this.raw[0] < limit) {
			this.raw[0] = -limit;
		}
		if (this.raw[1] > limit) {
			this.raw[1] = limit;
		} else if (this.raw[1] < 0 && this.raw[1] < limit) {
			this.raw[1] = -limit;
		}
		if (this.raw[2] > limit) {
			this.raw[2] = limit;
		} else if (this.raw[2] < 0 && this.raw[2] < limit) {
			this.raw[2] = -limit;
		}
	}

	limit(limit) {
		if (this.magnitude() > limit) {
			this.normalize();
			this.multiply(limit);
		}
	}

	rotate(degrees, pivotVector = new Vector3(), stabilize = false) {
		var mag = this.magnitude();
		var rads = Convert.DegreesToRadians(degrees);
		var cosineAngle = Math.cos(rads);
		var sineAngle = Math.sin(rads);
		this.raw[0] = (cosineAngle * (this.raw[0] - pivotVector.x)) + (sineAngle * (this.raw[1] - pivotVector.y)) + pivotVector.x;
		this.raw[1] = (cosineAngle * (this.raw[1] - pivotVector.y)) - (sineAngle * (this.raw[0] - pivotVector.x)) + pivotVector.y;
		if (stabilize) {
			this.normalize();
			this.multiply(mag);
		}
	}

	magnitude() {
		return Math.sqrt(Vector3.dot(this, this));
	}

	normalize() {
		var m = this.magnitude();
		if (m > 0) {
			this.divide(m);
		}
	}

}
