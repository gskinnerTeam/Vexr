export default class Matrix4 {

    constructor (array = new Float32Array([1,0,0,0,
        0,1,0,0,
        0,0,1,0,
        0,0,0,1])) {
        this.setMatrix(array);
    }

    setMatrix (array) {
        this.raw = array;
        this.rawCol1 = [this.raw[0], this.raw[4], this.raw[8], this.raw[12]];
        this.rawCol2 = [this.raw[1], this.raw[5], this.raw[9], this.raw[13]];
        this.rawCol3 = [this.raw[2], this.raw[6], this.raw[10], this.raw[14]];
        this.rawCol4 = [this.raw[3], this.raw[7], this.raw[11], this.raw[15]];
        this.rawRow1 = [this.raw[0], this.raw[1], this.raw[2], this.raw[3]];
        this.rawRow2 = [this.raw[4], this.raw[5], this.raw[6], this.raw[7]];
        this.rawRow3 = [this.raw[8], this.raw[9], this.raw[10], this.raw[11]];
        this.rawRow4 = [this.raw[12], this.raw[13], this.raw[14], this.raw[15]];
    }

    static dot (a,b) {
        var dots = a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
        return dots;
    }

    static multiply(a,b, outputMatrix = new Matrix4()) {
        let matrix = new Float32Array(16);
        //let matrix = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        matrix[0] = Matrix4.dot(a.column1, b.row1);
        matrix[1] = Matrix4.dot(a.column2, b.row1);
        matrix[2] = Matrix4.dot(a.column3, b.row1);
        matrix[3] = Matrix4.dot(a.column4, b.row1);

        matrix[4] = Matrix4.dot(a.column1, b.row2);
        matrix[5] = Matrix4.dot(a.column2, b.row2);
        matrix[6] = Matrix4.dot(a.column3, b.row2);
        matrix[7] = Matrix4.dot(a.column4, b.row2);

        matrix[8] = Matrix4.dot(a.column1, b.row3);
        matrix[9] = Matrix4.dot(a.column2, b.row3);
        matrix[10] = Matrix4.dot(a.column3, b.row3);
        matrix[11] = Matrix4.dot(a.column4, b.row3);

        matrix[12] = Matrix4.dot(a.column1, b.row4);
        matrix[13] = Matrix4.dot(a.column2, b.row4);
        matrix[14] = Matrix4.dot(a.column3, b.row4);
        matrix[15] = Matrix4.dot(a.column4, b.row4);
        outputMatrix.setMatrix(matrix);
        return outputMatrix;
    }

    multiply(matrix) {
        Matrix4.multiply(this, matrix, this);
    }

    get column1 () {
        return this.rawCol1;
    }
    get column2 () {
        return this.rawCol2;
    }
    get column3 () {
        return this.rawCol3;
    }
    get column4 () {
        return this.rawCol4;
    }
    get row1 () {
        return this.rawRow1;
    }
    get row2 () {
        return this.rawRow2;
    }
    get row3 () {
        return this.rawRow3;
    }
    get row4 () {
        return this.rawRow4;
    }
}
