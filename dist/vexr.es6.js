/**
 * Small library of converters needed for the various Vexr operations
 * @class Convert
 */

class Convert {
    /**
     * @static RadiansToDegrees() returns degrees you pass in as radians
     * @param radians {number}
     * @returns {number}
     */
    static RadiansToDegrees(radians) {
        return radians * (180 / Math.PI);
    }

    /**
     * @static DegreesToRadians() returns returns radians you pass in as degrees
     * @param degrees {number}
     * @returns {number}
     */
    static DegreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    /**
     * MapRange takes a set of values and maps another set of values to that range.
     * @param value {number}
     * @param bottomA {number}
     * @param topA {number}
     * @param bottomB {number}
     * @param topB {number}
     * @returns {number}
     */
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

    /**
     * Resets the supplied Vector to 0.
     * @param v {Vector3}
     * @static
     */
    static reset(v) {
        v.set(0, 0, 0, 0);
    }

    /**
     * angleBetween() gets the angle between two vectors
     * @param a {Vector3}
     * @param b {Vector3}
     * @returns {number}
     * @static
     */
    static angleBetween(a, b) {
        var mag = a.magnitude() * b.magnitude();
        var dot = Vector3.dot(a, b);
        return Math.acos(dot / mag);
    }

    /**
     * Linear interpolation between two vector locations
     * @param a {Vector3} Starting point
     * @param b {Vector3} Ending point
     * @param t {number} The ratio between the two points 0: Start. 1: End.
     * @param v {Vector3} [v= new Vector()] an optional reference instead of allocating a new vector
     * @returns {Vector3}
     * @static
     */
    static lerp(a, b, t, v = new Vector3()) {
        v.set(
            a.raw[0] + t * (b.raw[0] - a.raw[0]),
            a.raw[1] + t * (b.raw[1] - a.raw[1]),
            a.raw[2] + t * (b.raw[2] - a.raw[2])
        );
        return v;
    }

    /**
     * Normalize a Vector
     * @param vector {Vector3}
     * @param v {Vector3} [v= new Vector()] an optional reference instead of allocating a new vector
     * @returns {Vector3}
     * @static
     */
    static normalize(vector, v = new Vector3()) {
        var vec = vector.get(v);
        vec.normalize();
        return vec;
    }

    /**
     * Get the Magnitude of a vector
     * @param vector {Vector3}
     * @returns {number}
     * @static
     */
    static magnitude(vector) {
        return Math.sqrt(Vector3.dot(vector, vector));
    }

    /**
     * Add two vectors
     * @param a {Vector3}
     * @param b {Vector3}
     * @param v {Vector3} [v= new Vector()] an optional reference instead of allocating a new vector
     * @returns {Vector3}
     * @static
     */
    static add(a, b, v = new Vector3()) {
        v.set(a.raw[0] + b.raw[0], a.raw[1] + b.raw[1], a.raw[2] + b.raw[2]);
        return v;
    }

    static subtract(a, b, v = new Vector3()) {
        v.set(a.raw[0] - b.raw[0], a.raw[1] - b.raw[1], a.raw[2] - b.raw[2]);
        return v;
    }

    /**
     * Subtract two vectors
     * @param a {Vector3}
     * @param b {Vector3}
     * @param v {Vector3} [v= new Vector()] an optional reference instead of allocating a new vector
     * @returns {Vector3}
     * @static
     */
    static multiply(a, scalar, v = new Vector3()) {
        v.set(a.raw[0] * scalar, a.raw[1] * scalar, a.raw[2] * scalar);
        return v;
    }

    /**
     * Multiply two vectors
     * @param a {Vector3}
     * @param b {Vector3}
     * @param v {Vector3} [v= new Vector()] an optional reference instead of allocating a new vector
     * @returns {Vector3}
     * @static
     */
    static divide(a, scalar, v = new Vector3()) {
        scalar = 1 / scalar;
        v.set(a.raw[0] * scalar, a.raw[1] * scalar, a.raw[2] * scalar);
        return v;
    }

    /**
     * Gets the dot product of two vectors
     * @param a {Vector3}
     * @param b {Vector3}
     * @returns {number}
     * @static
     */
    static dot(a, b) {
        return a.raw[0] * b.raw[0] + a.raw[1] * b.raw[1] + a.raw[2] * b.raw[2];
    }

    /**
     * Get the cross product of two vectors
     * @param a {Vector3}
     * @param b {Vector3}
     * @param v {Vector3} [v= new Vector()] an optional reference instead of allocating a new vector
     * @returns {Vector3}
     */
    static cross(a, b, v = new Vector3()) {
        v.set(
            a.raw[1] * b.raw[2] - b.raw[1] * a.raw[2],
            a.raw[2] * b.raw[0] - b.raw[2] * a.raw[0],
            a.raw[0] * b.raw[1] - b.raw[0] * a.raw[1]);
        return v;
    }

    /**
     * Get the distance between two vectors
     * @param a {Vector3}
     * @param b {Vector3}
     * @returns {number}
     */
    static dist(a, b) {
        var vec1 = a.raw[0] - b.raw[0];
        var vec2 = a.raw[1] - b.raw[1];
        var vec3 = a.raw[2] - b.raw[2];
        return Math.sqrt((vec1 * vec1) + (vec2 * vec2) + (vec3 * vec3));
    }

    /**
     * Creates a new Vector
     * @param x {number}
     * @param y {number}
     * @param z {number}
     * @param w {number}
     * @constructor
     */
    constructor(x = 0, y = 0, z = 0, w = 0) {
        this.raw = new Float32Array(4);
        this.raw[0] = x;
        this.raw[1] = y;
        this.raw[2] = z;
        this.raw[3] = w;
    }

    get x() {
        return this.raw[0];
    }

    set x(value) {
        this.raw[0] = value;
    }

    get y() {
        return this.raw[1];
    }

    set y(value) {
        this.raw[1] = value;
    }

    get z() {
        return this.raw[2];
    }

    set z(value) {
        this.raw[2] = value;
    }

    get w() {
        return this.raw[3];
    }

    set w(value) {
        this.raw[3] = value;
    }

    /**
     * Copy this vector
     * @param v {Vector3} [v= new Vector()] an optional reference instead of allocating a new vector
     * @returns {Vector3}
     */
    get(v = new Vector3()) {
        v.set(this.raw[0], this.raw[1], this.raw[2], this.raw[3]);
        return v;
    }

    /**
     * Sets the vector to the values passed in
     * @param x {number}
     * @param y {number}
     * @param z {number}
     * @param w {number}
     */
    set(x = 0, y = 0, z = 0, w = 0) {
        this.raw[0] = x;
        this.raw[1] = y;
        this.raw[2] = z;
        this.raw[3] = w;
    }

    /**
     * Multiplies this vector by a scalar
     * @param scalar {number}
     */
    multiply(scalar) {
        Vector3.multiply(this, scalar, this);
    }

    /**
     * Adds the vector passed in to this vector
     * @param v {Vector3}
     */
    add(v) {
        Vector3.add(this, v, this);
    }

    /**
     * Subtracts the vector passed in from this vector
     * @param v {Vector3}
     */
    subtract(v) {
        Vector3.subtract(this, v, this);
    }

    /**
     * Divides this vector by the scalar
     * @param scalar {Vector3}
     */
    divide(scalar) {
        Vector3.divide(this, scalar, this);
    }

    /**
     * Inverts this vector
     */
    negate() {
        this.raw[0] = -this.raw[0];
        this.raw[1] = -this.raw[1];
        this.raw[2] = -this.raw[2];
    }

    /**
     * Clamps the vector components to the limit value
     * @param limit {number}
     */
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

    /**
     * limits the vector magnitude to the limit value
     * @param limit {number} the maximum magnitude
     */
    limit(limit) {
        if (this.magnitude() > limit) {
            this.normalize();
            this.multiply(limit);
        }
    }

    /**
     * Rotate this vector
     * @param degrees {number} degrees to rotate the vector by
     * @param pivotVector {Vector3} [pivotVector= new Vector3()] The point that you want to rotate around (default 0,0)
     * @param stabilize {boolean} [stabilize = false] stabilize the rotation of the vector by maintaining it's magnitude
     */
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

    /**
     * The magnitude of this vector
     * @returns {number}
     */
    magnitude() {
        return Math.sqrt(Vector3.dot(this, this));
    }

    /**
     * Normalize this vector
     */
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

    constructor (array = Matrix4.identity()) {
        this.setMatrix(array);
    }

    static identity() {
        return new Float32Array([1,0,0,0,
			0,1,0,0,
			0,0,1,0,
			0,0,0,1])
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

    static multiplyVector (v3, matrix, v = new Vector3()) {
		v.set(  matrix[0]*v3.raw[0],    matrix[1]*v3.raw[1],    matrix[2]*v3.raw[2],    matrix[3]*v3.raw[3],
                matrix[4]*v3.raw[0],    matrix[5]*v3.raw[1],    matrix[6]*v3.raw[2],    matrix[7]*v3.raw[3],
                matrix[8]*v3.raw[0],    matrix[9]*v3.raw[1],    matrix[10]*v3.raw[2],   matrix[11]*v3.raw[3],
                matrix[12]*v3.raw[0],   matrix[13]*v3.raw[1],   matrix[14]*v3.raw[2],   matrix[15]*v3.raw[3]);
		return v;
    }

    static translate(v3) {


    }

    static scale(v3) {}

}

let hexString = "0123456789abcdef";

class Generate {

    static RandomHexString(length) {
        let bytes = "";
        for(let i = 0; i<length; i++) {
            bytes += hexString.substr(Math.floor(Math.random()*hexString.length),1);
        }
        return bytes;
    }
    
    static UUID () {
        return `${Generate.RandomHexString(8)}-${Generate.RandomHexString(4)}-${Generate.RandomHexString(4)}-${Generate.RandomHexString(4)}-${Generate.RandomHexString(12)}`
    }
    
}

let pools = new Object();
let objectPool = new Object();
let usagePool = new Object();
let clean = new Object();

class Pool {

    static allocate(object, objectKey, number, cleaner = function(item){return item}) {

        if (object.hasOwnProperty("prototype")) {
            pools[objectKey] = {
                object: object,
                objectKey: objectKey,
                amount: number,
                cleaner: cleaner
            };
            clean[objectKey] = cleaner;
            usagePool[objectKey] = [];
            objectPool[objectKey] = [];
            for (var i = 0; i < number; i++) {
                var instance = new object();
                    instance.v_pool_index = i;
                    instance.v_pool_key = objectKey;
                usagePool[objectKey][i] = false;
                objectPool[objectKey][i] = instance;
            }
            return objectPool[objectKey];
        } else {
            throw new Error("Object must have a constructor");
        }
    }

    static deallocate(objectKey, force = false) {
        if(Pool.referencesInPool(objectKey) == 0 || force == true) {
            delete clean[objectKey];
            delete usagePool[objectKey];
            delete objectPool[objectKey];
            delete pools[objectKey];
        } else {
            console.warn("You still have objects in this pool checked out. Return them and call deallocate. Or use deallocate(key, true) to force deallocation.");
        }
    }

    static referencesInPool(objectKey){
        return pools[objectKey].amount - Pool.poolsize(objectKey);
    }

    static poolsize(objectKey) {
        return objectPool[objectKey].filter(Pool.notInUse).length;
    }

    static inUse(object) {
        return usagePool[object.v_pool_key][object.v_pool_index];
    }

    static notInUse(object) {
        return !usagePool[object.v_pool_key][object.v_pool_index];
    }

    static returnAll(objectKey) {
        var objects = objectPool[objectKey].filter(Pool.inUse);
        for(var i = 0; i < objects.length; i++) {
            Pool.returnObject(objects[i]);
        }
    }

    static getObject(objectKey) {
        var i = usagePool[objectKey].indexOf(false);
                usagePool[objectKey][i] = true;
        if(i > -1) {
            return objectPool[objectKey][i];
        } else {
            throw new Error("Out of objects");
        }
    }

    static returnObject(obj) {
        clean[obj.v_pool_key](obj);
        usagePool[obj.v_pool_key][obj.v_pool_index] = false;
    }
    static returnObjects(objs) {
        for(var i = 0; i<objs.length; i++) {
            Pool.returnObject(objs[i]);
        }
    }
    static get Pools () {
        return pools;
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
    static get width () {
        return Screen._dimensions.x;
    }
    static get height () {
        return Screen._dimensions.y;
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

/**
 * Behaviors are applied to Actors by passing actors, target actors, and parameters into them.
 * @class Behaviors
 */
const key = Generate.UUID();
class Behavior {
    /**
     * init is a static method that is used to initialize the object pool
     */
    static init() {
        Pool.allocate(Vector3, key, 10, Vector3.reset);
    }

    /**
     * seek() finds the distance between the actor and the targetLcation and applys a force to move the actor toward that target.
     * @param actor {Actor}
     * @param targetPosition {Vector3}
     * @param scaleForce {?number}
     */
    static seek(actor, targetPosition, scaleForce = 1) {
        var desired = Pool.getObject(key);
        var steer = Pool.getObject(key);

        Vector3.subtract(targetPosition, actor.location, desired);
        desired.normalize();
        desired.multiply(actor.maxSpeed);
        Vector3.subtract(desired, actor.velocity, steer);

        steer.limit(actor.maxForce);
        steer.multiply(scaleForce);
        actor.addForce(steer);

        Pool.returnObject(desired);
        Pool.returnObject(steer);
    }

    /**
     * arrive() works similarly to seek, but with the magnitude of the seek mapped to a power that is inversely proportionate to the magnitude of the distance between the actor and the target.
     * @param actor {Actor}
     * @param target {Vector3}
     * @param power {?number}
     * @param scaleForce {?number}
     */
    static arrive(actor, target, power = 50, scaleForce = 1) {
        var desired = Pool.getObject(key);
        var steer = Pool.getObject(key);
        Vector3.subtract(target, actor.location, desired);
        var mappedPower = Convert.MapRange(desired.magnitude(), 0, power, 0, actor.maxSpeed);
        desired.normalize();
        desired.multiply(mappedPower);
        Vector3.subtract(desired, actor.velocity, steer);
        steer.limit(actor.maxForce);
        steer.multiply(scaleForce);
        actor.addForce(steer);
        Pool.returnObject(desired);
        Pool.returnObject(steer);
    }

    /**
     * avoidAll() takes an array of obstacle actors and for each obstacle, the Actor will have the average escape vector of all the obstacles near it applied to it.
     * @param actor {Actor}
     * @param obstacles {Array.<Actor>}
     * @param avoidRadius {?number}
     * @param scaleForce {?number}
     */
    static avoidAll(actor, obstacles, avoidRadius = 80, scaleForce = 1) {
        var difference = Pool.getObject(key);
        var steer = Pool.getObject(key);
        var total = Pool.getObject(key);
        var count = 0;
        for (var o = 0; o < obstacles.length; o++) {
            var obstacle = obstacles[o];
            var distance = Vector3.dist(actor.location, obstacle.location);
            if ((distance > 0) && (distance < avoidRadius) && actor.id != obstacle.id) {
                Vector3.subtract(actor.location, obstacle.location, difference);
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
            Vector3.subtract(total, actor.velocity, steer);
            steer.limit(actor.maxForce);
            steer.multiply(scaleForce);
            actor.addForce(steer);
        }
        Pool.returnObject(difference);
        Pool.returnObject(steer);
        Pool.returnObject(total);
    }

    /**
     * Uses a single obstacle in the avoidAll function
     * @param actor
     * @param target
     * @param avoidRadius
     */
    static avoid(actor, target, avoidRadius) {
        this.avoidAll(actor, [target], avoidRadius);
    }

    /**
     * constrain() will lock your actor to the provided area. Velocity will be inverted with no friction when an Actor hits the wall.
     * @param actor {Actor}
     * @param minWidth {number} Left
     * @param minHeight {number} Uo
     * @param maxWidth {number} Right
     * @param maxHeight {number} Bottom
     * @param margin {number} the amount of offset you want for these values. The margins work by subtracting from minimums and adding to maximums.
     */
    static constrain(actor, minWidth = 0, minHeight = 0, maxWidth = Screen.width, maxHeight = Screen.height, margin = 0) {
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

    /**
     * wrap() will teleport your object to the opposite side of the screen where it left
     * @param actor {Actor}
     * @param minWidth {number} Left
     * @param minHeight {number} Uo
     * @param maxWidth {number} Right
     * @param maxHeight {number} Bottom
     * @param margin {number} the amount of offset you want for these values. The margins work by subtracting from minimums and adding to maximums.
     */
    static wrap(actor, minWidth = 0, minHeight = 0, maxWidth = Screen.width, maxHeight = Screen.height, margin = 0) {
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

    /**
     * disableOutside will set your Actor.active parameter to "false" when it leaves the defined area
     * @param actor {Actor}
     * @param minWidth {number} Left
     * @param minHeight {number} Uo
     * @param maxWidth {number} Right
     * @param maxHeight {number} Bottom
     * @param margin {number} the amount of offset you want for these values. The margins work by subtracting from minimums and adding to maximums.
     */
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

    /**
     * destroyOutside will set Actor.dead to true if it leaves the defined area;
     * @param actor {Actor}
     * @param minWidth {number} Left
     * @param minHeight {number} Uo
     * @param maxWidth {number} Right
     * @param maxHeight {number} Bottom
     * @param margin {number} the amount of offset you want for these values. The margins work by subtracting from minimums and adding to maximums.
     */
    static destroyOutside(actor, minWidth, minHeight, maxWidth, maxHeight, margin = 0) {
        minWidth -= margin;
        maxWidth += margin;
        minHeight -= margin;
        maxHeight += margin;
        if (actor.location.x < minWidth || actor.location.y < minHeight || actor.location.x > maxWidth || actor.location.y > maxHeight) {
            actor.dead = true;
        }
    }
}
Behavior.init();

/**
 *    The Actor class is used by Behaviors to apply behaviors to.
 *  @Class Actor
 */

class Actor {
    /**
     * @constructor
     * @param className {string}
     * @param location {Vector3)
     */
    constructor(className = "Actor", location = new Vector3(0, 0, 0)) {
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
    }

    /**
     * addForce() will add the vector you pass in to the acceleration
     * @param vector {Vector3}
     */
    addForce(vector) {
        this.acceleration.add(vector);
    }

    /**
     * update() will check to see if this actor is active, then call move(), then add the acceleration to the velocity, the velocity to the location, then reset the acceleration.
     */
    update() {
        if (this.active) {
            this.move();
            this.velocity.add(this.acceleration);
            this.location.add(this.velocity);
            this.acceleration.set(0, 0, 0);
        }
    }

    /**
     * move() is unused in the base class and is designed to be overridden. Anything in the move function will be applied before acceleration is added to velocity. See DOMActor for an example.
     */
    move() {

    }

    /**
     * render() checks if the actor is visible then calls the draw() function. See DOMActor for an example.
     */
    render() {
        if (this.visible) {
            this.draw();
        }
    }

    /**
     * draw() is empty in this class but can be extended to render itself in any rendering environment of your choice. See DOMActor for an example.
     */
    draw() {
        // override this function win your drawing code
    }

    /**
     * destroy() sets the Actor.dead state to true. This is used by the GameLoop class to clean up / remove dead objects.
     */
    destroy() {
        this.dead = true;
    }
}

/**
 * DOMActor is an extension of the Actor class specifically for working with DOM elements.
 * @class DOMActor
 * @extends Actor
 */

class DOMActor extends Actor {
    /**
     * @param className {string} the CSS class you want to use for this DOMActor
     * @param location {Vector3} The starting location for this Actor
     * @constructor
     */
    constructor(className, location) {
        super(className, location);
        this.element = document.createElement("div");
        this.element.classList.add("actor");
        this.element.classList.add(className);
        this.parentElement = null;
    }

    /**
     * addToParentElement() will add DOMActor.element to the parentElement
     * @param parentElement {HTMLElement}
     */
    addToParentElement(parentElement) {
        this.parentElement = parentElement;
        this.parentElement.appendChild(this.element);
    }

    /**
     * draw() sets this DOMActor.element.style.transform to `translateX(${this.location.x}px) translateY(${this.location.y}px) rotate(${this.angle}deg)`
     */
    draw() {
        this.element.style.transform =
            `translateX(${this.location.x}px) translateY(${this.location.y}px) rotate(${this.angle}deg)`;
    }

    /**
     * destroy() sets this DOMActor to dead, removes it from the DOM, and nulls its reference to the parentElement
     */
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

class InputController {
	constructor() {
		this.keyMap = {};
		this.mousePos = new Vector3();
	}

	bindEvents() {
		document.addEventListener("mouseup", this.setMouseUp.bind(this));
		document.addEventListener("mousedown", this.setMouseDown.bind(this));
		document.addEventListener("mousemove", this.setMousePos.bind(this));
		document.addEventListener("keyup",this.mapKeys.bind(this));
		document.addEventListener("keydown",this.mapKeys.bind(this));
	}

	unbindEvents() {
		document.removeEventListener("mouseup", this.setMouseUp.bind(this));
		document.removeEventListener("mousedown", this.setMouseDown.bind(this));
		document.removeEventListener("mousemove", this.setMousePos.bind(this));
		document.removeEventListener("keyup",this.mapKeys.bind(this));
		document.removeEventListener("keydown",this.mapKeys.bind(this));
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

export { Vector2, Vector3, Matrix3, Matrix4, Behavior as Behaviors, Actor, DOMActor, GameLoop, Screen, InputController, EventLite, Pool, Convert, Generate };

//# sourceMappingURL=vexr.es6.map
