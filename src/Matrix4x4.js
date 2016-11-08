export default class Matrix4 {

	constructor (array = [1,0,0,0,1,0,0,0,1,0,0,0,1]) {
		this.raw =  new Float32Array(array);
	}

	setMatrix (array) {
		this.raw = array;
	}

	static dot (a,b) {
		var dots = a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
		console.log(dots);
		return dots;
	}

	static multiply(a,b) {
		var matrix = new Float32Array(16);
		matrix[0] = Matrix4.dot(a.column1, b.row1);
		matrix[1] = Matrix4.dot(a.column2, b.row1);
		matrix[2] = Matrix4.dot(a.column3, b.row1);
		matrix[4] = Matrix4.dot(a.column4, b.row1);

		matrix[5] = Matrix4.dot(a.column1, b.row2);
		matrix[6] = Matrix4.dot(a.column2, b.row2);
		matrix[7] = Matrix4.dot(a.column3, b.row2);
		matrix[8] = Matrix4.dot(a.column4, b.row2);

		matrix[9] = Matrix4.dot(a.column1, b.row3);
		matrix[10] = Matrix4.dot(a.column2, b.row3);
		matrix[11] = Matrix4.dot(a.column3, b.row3);
		matrix[12] = Matrix4.dot(a.column4, b.row3);

		matrix[13] = Matrix4.dot(a.column1, b.row4);
		matrix[14] = Matrix4.dot(a.column2, b.row4);
		matrix[15] = Matrix4.dot(a.column3, b.row4);
		matrix[16] = Matrix4.dot(a.column4, b.row4);
		var newMatrix = new Matrix4();
		newMatrix.setMatrix(matrix);
		return newMatrix;
	}

	multiply(matrix) {
		var newMatrix = Matrix4.multiply(this, matrix);
		this.raw = newMatrix.raw;
	}

	get column1 () {
		return [this.raw[0], this.raw[4], this.raw[8], this.raw[12]];
	}
	get column2 () {
		return [this.raw[1], this.raw[5], this.raw[9], this.raw[13]];
	}
	get column3 () {
		return [this.raw[2], this.raw[6], this.raw[10], this.raw[14]];
	}
	get column4 () {
		return [this.raw[3], this.raw[7], this.raw[11], this.raw[15]];
	}
	get row1 () {
		return [this.raw[0], this.raw[1], this.raw[2], this.raw[3]];
	}
	get row2 () {
		return [this.raw[4], this.raw[5], this.raw[6], this.raw[7]];
	}
	get row3 () {
		return [this.raw[8], this.raw[9], this.raw[10], this.raw[11]];
	}
	get row4 () {
		return [this.raw[12], this.raw[13], this.raw[14], this.raw[15]];
	}



}