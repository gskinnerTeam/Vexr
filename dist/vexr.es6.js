class Convert {
    
    static RadiansToDegrees(radians) {
        return radians * (180 / Math.PI);
    }

    static DegreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    static MapRange(value, bottomA, topA, bottomB, topB) {
        return bottomB + (topB - bottomB) * (value - bottomA) / (topA - bottomA);
    }

}

class Vector2 {

	static angleBetween(a, b) {
		var mag = a.magnitude() * b.magnitude();
		var dot = Vector2.dot(a, b);
		return Math.acos(dot / mag);
	}

	static lerp(a, b, t) {
		var x = a.x + t * (b.x - a.x);
		var y = a.y + t * (b.y - a.y);
		return new Vector2(x, y);
	}

	static normalize(vector) {
		var vec = vector.get();
		vec.normalize();
		return vec;
	}

	static magnitude(vec) {
			return Math.sqrt(Vector2.dot(vec, vec));
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
		return Vector2.multiply(a, scalar);
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
		this.raw = [x,y];
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
		return 0;
	}
	
	get() {
		return new Vector2(this.x, this.y);
	}

	set(x=0, y=0) {
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
		this.multiply(scalar);
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

	rotate(degrees, pivotVector = new Vector2(0, 0), stabilize = false) {
		var mag = this.magnitude();
		var rads = Convert.degreesToRadians(degrees);
		var cosineAngle = Math.cos(rads);
		var sineAngle = Math.sin(rads);
		this.x = (cosineAngle * (this.x - pivotVector.x)) + (sineAngle * (this.y - pivotVector.y)) + pivotVector.x;
		this.y = (cosineAngle * (this.y - pivotVector.y)) - (sineAngle * (this.x - pivotVector.x)) + pivotVector.y;
		if (stabilize) {
			this.normalize();
			this.multiply(mag);
		}
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

class Vector3 {

	static angleBetween(a, b) {
		var mag = a.magnitude() * b.magnitude();
		var dot = Vector3.dot(a, b);
		return Math.acos(dot / mag);
	}

	static lerp(a, b, t) {
		var x = a.x + t * (b.x - a.x);
		var y = a.y + t * (b.y - a.y);
		var z = a.z + t * (b.z - a.z);
		return new Vector3(x, y, z);
	}

	static normalize(vector) {
		var vec = vector.get();
		vec.normalize();
		return vec;
	}

	static magnitude(vector) {
		return Math.sqrt(Vector3.dot(vector, vector));
	}

	static add(a, b) {
		return new Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
	}

	static subtract(a, b) {
		var n = new Vector3(b.x, b.y, b.z);
		n.negate();
		return Vector3.add(a, n);
	}

	static multiply(a, scalar) {
		return new Vector3(a.x * scalar, a.y * scalar, a.z * scalar);
	}

	static divide(a, scalar) {
		scalar = 1 / scalar;
		return Vector3.multiply(a, scalar);
	}

	static dot(a, b) {
		return a.x * b.x + a.y * b.y + a.z * b.z;
	}

	static cross(a, b) {
		var x = a.y * b.z - b.y * a.z;
		var y = a.z * b.x - b.z * a.x;
		var z = a.x * b.y - b.x * a.y;
		return new Vector3(x, y, z);
	}


	static dist(a, b) {
		var vec1 = a.x - b.x;
		var vec2 = a.y - b.y;
		var vec3 = a.z - b.z;
		return Math.sqrt((vec1 * vec1) + (vec2 * vec2) + (vec3 * vec3));
	}

	constructor(x = 0, y = 0, z = 0) {
		this.raw = [x,y,z];
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

	get() {
		return new Vector3(this.x, this.y, this.z);
	}

	set(x=0, y=0, z=0) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	multiply(scalar) {
		this.x = this.x * scalar;
		this.y = this.y * scalar;
		this.z = this.z* scalar;
	}

	add(v) {
		this.x = this.x + v.x;
		this.y = this.y + v.y;
		this.z = this.z + v.z;
	}

	subtract(v) {
		var n = new Vector3(v.x, v.y, v.z);
		n.negate();
		this.add(n);
	}

	divide(scalar) {
		scalar = 1 / scalar;
		this.multiply(scalar);
	}

	negate() {
		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;
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
		if (this.z > limit) {
			this.z = limit;
		} else if (this.z < 0 && this.z < limit) {
			this.z = -limit;
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
		var rads = Convert.degreesToRadians(degrees);
		var cosineAngle = Math.cos(rads);
		var sineAngle = Math.sin(rads);
		this.x = (cosineAngle * (this.x - pivotVector.x)) + (sineAngle * (this.y - pivotVector.y)) + pivotVector.x;
		this.y = (cosineAngle * (this.y - pivotVector.y)) - (sineAngle * (this.x - pivotVector.x)) + pivotVector.y;
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

class Matrix3 {

	constructor (array = [1,0,0,0,1,0,0,0,1]) {
		this.raw = new Float32Array(array);
	}

	setMatrix (array) {
		this.raw = array;
	}

	static dot (a,b) {
		var dots = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
		console.log(dots);
		return dots;
	}

	static multiply(a,b) {
		var matrix = new Float32Array(9);
		matrix[0] = Matrix3.dot(a.column1, b.row1);
		matrix[1] = Matrix3.dot(a.column2, b.row1);
		matrix[2] = Matrix3.dot(a.column3, b.row1);
		matrix[3] = Matrix3.dot(a.column1, b.row2);
		matrix[4] = Matrix3.dot(a.column2, b.row2);
		matrix[5] = Matrix3.dot(a.column3, b.row2);
		matrix[6] = Matrix3.dot(a.column1, b.row3);
		matrix[7] = Matrix3.dot(a.column2, b.row3);
		matrix[8] = Matrix3.dot(a.column3, b.row3);
		var newMatrix = new Matrix3();
		newMatrix.setMatrix(matrix);
		return newMatrix;
	}

	multiply(matrix) {
		var newMatrix = Matrix3.multiply(this, matrix);
		this.raw = newMatrix.raw;
	}

	get column1 () {
		return [this.raw[0], this.raw[3], this.raw[6]];
	}
	get column2 () {
		return [this.raw[1], this.raw[4], this.raw[7]];
	}
	get column3 () {
		return [this.raw[2], this.raw[5], this.raw[8]];
	}
	get row1 () {
		return [this.raw[0], this.raw[1], this.raw[2]];
	}
	get row2 () {
		return [this.raw[3], this.raw[4], this.raw[5]];
	}
	get row3 () {
		return [this.raw[6], this.raw[7], this.raw[8]];
	}
	set column1 (array) {
		this.raw[0] = array[0];
		this.raw[3] = array[1];
		this.raw[6] = array[2];
	}
	set column2 (array) {
		this.raw[1] = array[0];
		this.raw[4] = array[1];
		this.raw[7] = array[2];
	}
	set column3 (array) {
		this.raw[2] = array[0];
		this.raw[5] = array[1];
		this.raw[68] = array[2];
	}
	set row1 (array) {
		this.raw[0] = array[0];
		this.raw[1] = array[1];
		this.raw[2] = array[2];
	}
	set row2 (array) {
		this.raw[3] = array[0];
		this.raw[4] = array[1];
		this.raw[5] = array[2];
	}
	set row3 (array) {
		this.raw[6] = array[0];
		this.raw[7] = array[1];
		this.raw[8] = array[2];
	}

}

class Matrix4 {

    constructor (array = new Float32Array([1,0,0,0,
        0,1,0,0,
        0,0,1,0,
        0,0,0,1])) {
        this.setMatrix(array);
    }

    setMatrix (array) {
        this.raw = array;
    }

    static dot (c1, c2, c3, c4, r1, r2, r3, r4) {
        return c1 * r1 + c2 * r2 + c3 * r3 + c4 * r4;
    }

    transpose () {
        var row1 = [this.raw[0], this.raw[1], this.raw[2], this.raw[3]];
        var row2 = [this.raw[4], this.raw[5], this.raw[6], this.raw[7]];
        var row3 = [this.raw[8], this.raw[9], this.raw[10], this.raw[11]];
        var row4 = [this.raw[12], this.raw[13], this.raw[14], this.raw[15]];

        this.raw[0]  = row1[0];
        this.raw[4]  = row1[1];
        this.raw[8]  = row1[2];
        this.raw[12] = row1[3];

        this.raw[1]  = row2[0];
        this.raw[5]  = row2[1];
        this.raw[9]  = row2[2];
        this.raw[13] = row2[3];

        this.raw[2]  = row3[0];
        this.raw[6]  = row3[1];
        this.raw[10] = row3[2];
        this.raw[14] = row3[3];

        this.raw[3]  = row4[0];
        this.raw[7]  = row4[1];
        this.raw[11] = row4[2];
        this.raw[15] = row4[3];

    }
    
    static multiply(a,b, outputMatrix = new Matrix4()) {
        let matrix = new Float32Array(16);
        //let matrix = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        matrix[0] = Matrix4.dot(a.raw[0], a.raw[4], a.raw[8], a.raw[12], b.raw[0], b.raw[1], b.raw[2], b.raw[3]);
        matrix[1] = Matrix4.dot(a.raw[1], a.raw[5], a.raw[9], a.raw[13], b.raw[0], b.raw[1], b.raw[2], b.raw[3]);
        matrix[2] = Matrix4.dot(a.raw[2], a.raw[6], a.raw[10], a.raw[14], b.raw[0], b.raw[1], b.raw[2], b.raw[3]);
        matrix[3] = Matrix4.dot(a.raw[3], a.raw[7], a.raw[11], a.raw[15], b.raw[0], b.raw[1], b.raw[2], b.raw[3]);

        matrix[4] = Matrix4.dot(a.raw[0], a.raw[4], a.raw[8], a.raw[12], b.raw[4], b.raw[5], b.raw[6], b.raw[7]);
        matrix[5] = Matrix4.dot(a.raw[1], a.raw[5], a.raw[9], a.raw[13], b.raw[4], b.raw[5], b.raw[6], b.raw[7]);
        matrix[6] = Matrix4.dot(a.raw[2], a.raw[6], a.raw[10], a.raw[14], b.raw[4], b.raw[5], b.raw[6], b.raw[7]);
        matrix[7] = Matrix4.dot(a.raw[3], a.raw[7], a.raw[11], a.raw[15], b.raw[4], b.raw[5], b.raw[6], b.raw[7]);

        matrix[8] = Matrix4.dot(a.raw[0], a.raw[4], a.raw[8], a.raw[12], b.raw[8], b.raw[9], b.raw[10], b.raw[11]);
        matrix[9] = Matrix4.dot(a.raw[1], a.raw[5], a.raw[9], a.raw[13], b.raw[8], b.raw[9], b.raw[10], b.raw[11]);
        matrix[10] = Matrix4.dot(a.raw[2], a.raw[6], a.raw[10], a.raw[14], b.raw[8], b.raw[9], b.raw[10], b.raw[11]);
        matrix[11] = Matrix4.dot(a.raw[3], a.raw[7], a.raw[11], a.raw[15], b.raw[8], b.raw[9], b.raw[10], b.raw[11]);

        matrix[12] = Matrix4.dot(a.raw[0], a.raw[4], a.raw[8], a.raw[12], b.raw[12], b.raw[13], b.raw[14], b.raw[15]);
        matrix[13] = Matrix4.dot(a.raw[1], a.raw[5], a.raw[9], a.raw[13], b.raw[12], b.raw[13], b.raw[14], b.raw[15]);
        matrix[14] = Matrix4.dot(a.raw[2], a.raw[6], a.raw[10], a.raw[14], b.raw[12], b.raw[13], b.raw[14], b.raw[15]);
        matrix[15] = Matrix4.dot(a.raw[3], a.raw[7], a.raw[11], a.raw[15], b.raw[12], b.raw[13], b.raw[14], b.raw[15]);
        //console.log(outputMatrix);
        outputMatrix.setMatrix(matrix);
        return outputMatrix;
    }

    multiply(matrix) {
        Matrix4.multiply(this, matrix, this);
    }

}

class Behavior {
	static seek(actor, targetPosition) {
		var desired = Vector3.subtract(targetPosition, actor.location);
		desired.normalize();
		desired.multiply(actor.maxSpeed);
		var steer = Vector3.subtract(desired, actor.velocity);
		steer.limit(actor.maxForce);
		return steer;
	}

	static arrive(actor, target, power = 50) {

		var desired = Vector3.subtract(target, actor.location);
		var dMag = desired.magnitude();
		desired.normalize();
		var mappedPower = Convert.MapRange(dMag, 0, power, 0, actor.maxSpeed);

		desired.multiply(mappedPower);

		var steer = Vector3.subtract(desired, actor.velocity);
		steer.limit(actor.maxForce);

		return steer;
	}

	static avoidAll(actor, obstacles, avoidRadius = 80) {
		var avoidRadius = avoidRadius;
		var total = new Vector3(0, 0);
		var count = 0;
		for (var o = 0; o < obstacles.length; o++) {
			var obstacle = obstacles[o];
			var distance = Vector3.dist(actor.location, obstacle.location);
			if ((distance > 0) && (distance < avoidRadius) && actor.id != obstacle.id) {
				var difference = Vector3.subtract(actor.location, obstacle.location, obstacle.id);
				difference.normalize();
				difference.divide(distance);
				total.add(difference);
				count++;
			}
		}
		if (count > 0) {
			total.divide(count);
			total.normalize();
			total.multiply(actor.maxSpeed);

			var steer = Vector3.subtract(total, actor.velocity);
			steer.limit(actor.maxForce);

			return steer;
		} else {
			return new Vector3(0,0,0);
		}
	}

	static avoid(actor, target, avoidRadius) {
		this.avoidAll(actor, [target], avoidRadius);
	}

	static constrain(actor, minWidth, minHeight, maxWidth, maxHeight, margin = 0) {
		minWidth -= margin;
		maxWidth += margin;
		minHeight -= margin;
		maxHeight += margin;

		if (actor.location.x < minWidth) {
			actor.velocity.x *= -1;
			actor.location.x = minWidth;
		}
		if (actor.location.y < minHeight) {
			actor.velocity.y *= -1;
			actor.location.y = minHeight;
		}
		if (actor.location.x > maxWidth) {

			actor.velocity.x *= -1;
			actor.location.x = maxWidth;
		}
		if (actor.location.y > maxHeight) {
			actor.velocity.y *= -1;
			actor.location.y = maxHeight;
		}
		
	}

	static wrap(actor, minWidth, minHeight, maxWidth, maxHeight, margin = 0) {
		minWidth -= margin;
		maxWidth += margin;
		minHeight -= margin;
		maxHeight += margin;

		if (actor.location.x < minWidth) {
			actor.location.x = maxWidth;
		}
		if (actor.location.y < minHeight) {
			actor.location.y = maxHeight;
		}
		if (actor.location.x > maxWidth) {
			actor.location.x = minWidth;
		}
		if (actor.location.y > maxHeight) {
			actor.location.y = minHeight;
		}
	}

	static disableOutside(actor, minWidth, minHeight, maxWidth, maxHeight, margin = 0) {
		minWidth -= margin;
		maxWidth += margin;
		minHeight -= margin;
		maxHeight += margin;

		if (actor.location.x < minWidth || actor.location.y < minHeight || actor.location.x > maxWidth || actor.location.y > maxHeight) {
			actor.active = false;
			actor.visible = false;
		}
	}

	static destroyOutside(actor, minWidth, minHeight, maxWidth,  maxHeight, margin = 0) {
		minWidth -= margin;
		maxWidth += margin;
		minHeight -= margin;
		maxHeight += margin;
		if (actor.location.x < minWidth || actor.location.y < minHeight || actor.location.x > maxWidth || actor.location.y > maxHeight) {
			actor.dead = true;
		}
	}
}

let hexString = "0123456789abcdef";

class Generate {

    static randomHexString(length) {
        let bytes = "";
        for(let i = 0; i<length; i++) {
            bytes += hexString.substr(Math.floor(Math.random()*hexString.length),1);
        }
        return bytes;
    }
    
    static UUID () {
        return `${Generate.randomHexString(7)}-${Generate.randomHexString(4)}-${Generate.randomHexString(4)}-${Generate.randomHexString(4)}-${Generate.randomHexString(4)}-${Generate.randomHexString(12)}`
    }
    
}

class Actor {
	constructor(className, location = new Vector3(0, 0, 0)) {
		this.type = className;
		this.active = true;
		this.visible = true;
		this.dead = false;
		this.id = Generate.UUID();
		this.location = location;
		this.velocity = new Vector3(0, 0, 0);
		this.acceleration = new Vector3(0, 0, 0);
		this.angle = 0;
		this.maxSpeed = 15;
		this.maxForce = 1;
		this.parent = null;
		this.children = [];
	}

	addForce(vector) {
		this.acceleration.add(vector);
	}

	update() {
		if (this.active) {
			this.move();
			this.velocity.add(this.acceleration);
			this.location.add(this.velocity);
			this.acceleration.set(0,0,0);
		}
	}

	move() {

	}

	render() {
		if (this.visible) {
			this.draw();
		}
	}

	draw() {
		// override this function win your drawing code
	}

	destroy() {
		this.dead = true;
		for(let i = 0; i<this.children.length; i++) {
			this.children[i].destroy();
		}
	}
}

class DOMActor extends Actor {
	constructor(className, location) {
		super(className, location);
		this.element = document.createElement("div");
		this.element.classList.add("actor");
		this.element.classList.add(className);
		this.parentElement = null;
	}

	addToParentElement(parentElement) {
		this.parentElement = parentElement;
		this.parentElement.appendChild(this.element);
	}

	draw() {
		this.element.style.transform =
			`translateX(${this.location.x}px) translateY(${this.location.y}px) rotate(${this.angle}deg)`;
	}

	destroy() {
		this.dead = true;
		this.element.remove();
		this.parentElement = null;
	}
}

class GameLoop {
	constructor() {
		this.gameObjects = [];
		this.controller = [];
	}

	setController(inputController) {
		this.controller.push(inputController);
	}

	getType(type) {
		var matches = [];
		for (var i = 0; i < this.gameObjects.length; i++) {
			if (this.gameObjects[i].type === type) {
				matches.push(this.gameObjects[i]);
			}
		}
		return matches;
	}

	update() {
		this.removeActors();
		for (var i = 0; i < this.gameObjects.length; i++) {
			this.gameObjects[i].update();
		}
	}

	addActor(actor) {
		this.gameObjects.push(actor);
	}

	removeActors() {
		for (var i = 0; i < this.gameObjects.length; i++) {
			if(this.gameObjects[i].dead) {
				this.gameObjects.splice(i, 1);
			}
		}
	}

	render() {
		for (var i = 0; i < this.gameObjects.length; i++) {
			this.gameObjects[i].render();
		}
	}

	loop() {
		this.update();
		this.render();
		window.requestAnimationFrame(this.loop.bind(this));
	}
}

let listeners = {};

class EventLite {
    static on (event, handler) {
        if (listeners[event] === undefined) {
            listeners[event] = [handler];
        } else {
            listeners[event].push(handler);
        }
        return handler;
    }
    static off (event, handler) {
        if (listeners[event]) {
            for (let i = listeners[event].length - 1; i >= 0; i--) {
                if (listeners[event].length === 1) {
                    delete listeners[event];
                } else {
                    listeners[event].splice(i, 1);
                    break;
                }
            }
        }
    }
    static trigger (event, ...data) {
        if (listeners[event]) {
            for (let i = listeners[event].length - 1; i >= 0; i--) {
                if(listeners[event] !== undefined) {
                    if (typeof listeners[event][i] === "function" && listeners[event][i] ) {
                        listeners[event][i](data);
                    } else {
                        throw "Event handler is not a function.";
                    }
                }
            }
        }
    }
    static unbindAll () {
        for (const event in listeners) {
            delete listeners[event];
        }
        return true;
    };
}

var resizeId;
var resizeEvent;
class Screen {
    static get dimensions() {
        return Screen._dimensions;
    }
    static set dimensions(value) {
        if(Screen._dimensions != value) {
            Screen._dimensions = value;
        }
    }
    static get orientation() {
        return Screen._orientation;
    }
    static set orientation(value) {
        if(Screen._orientation != value) {
            Screen._orientation = value;
        }
    }
    static get center() {
        return Screen._center;
    }
    static set center(value) {
        if(Screen._center != value) {
            Screen._center = value;
        }
    }
    static get resizeDelay() {
        return Screen._resizeDelay;
    }
    static set resizeDelay(value) {
        if(Screen._resizeDelay != value) {
            Screen._resizeDelay = value;
        }
    }
    static get anchors() {
        return Screen._anchors;
    }
    static set anchors(value) {
        if(Screen._anchors != value) {
            Screen._anchors = value;
        }
    }
    static get anchorPositions() {
        return Screen._anchorPositions;
    }
    static set anchorPositions(value) {
        if(Screen._anchorPositions != value) {
            Screen._anchorPositions = value;
        }
    }

    static resize(e) {
        clearTimeout(resizeId);
        resizeEvent = e;
        resizeId = setTimeout(Screen.recalculate, Screen.resizeDelay);
    }

    static recalculate() {
        Screen.dimensions.set(window.innerWidth, window.innerHeight);
        if(Screen.dimensions.x > Screen.dimensions.y) {
            Screen.orientation = "landscape";
        } else {
            Screen.orientation = "portrait";
        }
        for(var anchor in Screen.anchors) {
            if(Screen.anchors.hasOwnProperty(anchor)) {
                Screen.anchorPositions[anchor].set(Screen.anchors[anchor].x * Screen.dimensions.x, Screen.anchors[anchor].y * Screen.dimensions.y);
            }
        }

        EventLite.trigger("resize", resizeEvent);
    }

    static getAnchor(name) {
        return Screen.anchorPositions[name].get();
    }

    static setAnchor(name, ratioX, ratioY) {

        if(Screen.anchors[name] == undefined) {
            Screen.anchors[name] = new Vector3(ratioX, ratioY);
            Screen.anchorPositions[name] = new Vector3(Screen.anchors[name].x * Screen.dimensions.x, Screen.anchors[name].y * Screen.dimensions.y);
        } else {
            Screen.anchors[name].set(ratioX, ratioY);
            Screen.anchorPositions[name].set(Screen.anchors[name].x * Screen.dimensions.x, Screen.anchors[name].y * Screen.dimensions.y);
        }

    }
    static removeAnchor (name) {
        delete Screen.anchors[name];
        delete Screen.anchorPositions[name];
    }
    static init() {
        Screen.resizeDelay = 100;
        Screen.anchors = {};
        Screen.anchorPositions = {};
        Screen.dimensions = new Vector3(window.innerWidth, window.innerHeight);
        Screen.setAnchor("center", 0.5, 0.5);
        if(Screen.dimensions.x > Screen.dimensions.y) {
            Screen.orientation = "landscape";
        } else {
            Screen.orientation = "portrait";
        }
    }

}
Screen.init();

class InputController {
	constructor() {
		this.keyMap = {};
		this.mousePos = new Vector3();
	}

	bindEvents() {
		document.addEventListener("mouseup", this.setMouseUp.bind(this));
		document.addEventListener("mousedown", this.setMouseDown.bind(this));
		document.addEventListener("mousemove", this.setMousePos.bind(this));
		onkeydown = onkeyup = this.mapKeys.bind(this);
	}

	unbindEvents() {
		document.removeEventListener("mouseup", this.setMouseUp.bind(this));
		document.removeEventListener("mousedown", this.setMouseDown.bind(this));
		document.removeEventListener("mousemove", this.setMousePos.bind(this));
		onkeydown = onkeyup = null;
	}

	setMousePos(e) {
		this.mousePos.set(e.pageX, e.pageY);
	}

	setMouseUp(e) {
		var fakeKey = {
			key: "mouse" + e.button,
			type: "keyup"
		};
		this.mapKeys(fakeKey);
	}

	setMouseDown(e) {
		var fakeKey = {
			key: "mouse" + e.button,
			type: "keydown"
		};
		this.mapKeys(fakeKey);
	}

	mapKeys(e) {
		e = e || event;
		this.keyMap[e.key] = e.type == 'keydown';
	}

	keyUp(key) {
		console.log(key);
	}

	keyDown(key) {
		console.log(key);
	}

	setKeys() {
		for (var key in this.keyMap) {
			if (this.keyMap[key]) {
				this.keyDown(key);
			} else {
				this.keyUp(key);
			}
		}
	}
}

export { Vector2, Vector3, Matrix3, Matrix4, Behavior as Behaviors, Actor, DOMActor, GameLoop, Screen, InputController, EventLite };

//# sourceMappingURL=vexr.es6.map
