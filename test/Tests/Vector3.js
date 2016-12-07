function errorTolerance(error, tolerance) {
	tolerance = tolerance || 2.1316282072803006e-14;
	return Math.abs(error) <= tolerance;
}

// karma puts the Vexr global module in the test environment.
var Vector3 = Vexr.Vector3;
describe('Vector3 Methods', function () {
	describe('New Vector3()', function () {
		it('New Vector should be zero', function () {
			var vec = new Vector3();
			assert.equal(0, vec.x);
			assert.equal(0, vec.y);
			assert.equal(0, vec.z);
		});
	});
	describe('New Vector3(1,2,3)', function () {
		it('New Vector should be x = 1, y = 2, z = 3', function () {
			var vec = new Vector3(1, 2, 3);
			assert.equal(1, vec.x);
			assert.equal(2, vec.y);
			assert.equal(3, vec.z);
		});
	});
	describe('Get Vector', function () {
		it('Original Vector should remain unchanged', function () {
			var vec = new Vector3(Math.random()*10, Math.random()*10, Math.random()*10);
			var vec3 = vec.get();
			assert.equal(vec.x, vec3.x);
			assert.equal(vec.y, vec3.y);
			assert.equal(vec.z, vec3.z);
			vec3.multiply(2);
			assert.equal(vec.x*2, vec3.x);
			assert.equal(vec.y*2, vec3.y);
			assert.equal(vec.z*2, vec3.z);
		});
	});
	describe('Set Vector', function () {
		it('Original vec3 should be set to vec1 values', function () {
			var vec = new Vector3(Math.random()*10, Math.random()*10, Math.random()*10);
			var vec3 = vec.get();
			vec3.multiply(Math.random());
			vec3.set(vec.x, vec.y, vec.z);
			console.log(vec.z, vec3.z);
			assert.equal(vec.x, vec3.x);
			assert.equal(vec.y, vec3.y);
			assert.equal(vec.z, vec3.z);
		});
	});
	describe('Vector3.negate()', function () {
		it('Negated XY shoud equal -1', function () {
			var vec = new Vector3(1, 1, 1);
			vec.negate();
			assert.equal(-1, vec.x);
			assert.equal(-1, vec.y);
			assert.equal(-1, vec.z);
		});
	});
	describe('Vector Add', function () {
		it('Adding Vectors should equal 3', function () {
			var vec = new Vector3(1, 1, 1);
			var vec3 = new Vector3(2, 2, 2);
			vec.add(vec3);
			assert.equal(3, vec.x);
			assert.equal(3, vec.y);
			assert.equal(3, vec.z);
		});
	});
	describe('Vector Subtract', function () {
		it('Subtracting Vectors should equal -1', function () {
			var vec = new Vector3(1, 1, 1);
			var vec3 = new Vector3(2, 2, 2);
			vec.subtract(vec3);
			assert.equal(-1, vec.x);
			assert.equal(-1, vec.y);
			assert.equal(-1, vec.z);
		});
	});
	describe('Vector Multiply', function () {
		it('Multiplying Vector should equal 2', function () {
			var vec = new Vector3(1, 1, 1);
			vec.multiply(2);
			assert.equal(2, vec.x);
			assert.equal(2, vec.y);
			assert.equal(2, vec.z);
		});
	});
	describe('Vector Divide', function () {
		it('Dividing Vector should equal 5', function () {
			var vec = new Vector3(10, 10, 10);
			vec.divide(2);
			assert.equal(5, vec.x);
			assert.equal(5, vec.y);
			assert.equal(5, vec.z);
		});
	});
	describe('Vector Clamp', function () {
		it('Clamping Vector to 2 should equal 2', function () {
			var vec = new Vector3(10, 10, 10);
			vec.clamp(2);
			assert.equal(2, vec.x);
			assert.equal(2, vec.y);
			assert.equal(2, vec.z);
		});
	});
	describe('Magnitude', function () {
		it('Magnitude Should Equal 1', function () {
			var vec = new Vector3(1, 0, 0);
			assert.equal(1, vec.magnitude());
		});
		it('Magnitude Should Equal 1.7320508075688772', function () {
			var vec = new Vector3(1, 1, 1);
			assert.equal(1.7320508075688772, vec.magnitude());
		});
		it('Magnitude Should Equal 17.320508075688775', function () {
			var vec = new Vector3(10, 10, 10);
			assert.equal(17.320508075688775, vec.magnitude());
		});
		it('Magnitude Should Equal 17.320508075688775', function () {
			var vec = new Vector3(-10, -10, -10);
			assert.equal(17.320508075688775, vec.magnitude());
		});
	});
	describe('Normalize', function () {
		it('Normalized Vector Should Equal 1', function () {
			var vec = new Vector3(10, 10, 10);

			vec.normalize();

			assert.equal(0.5773502691896257, vec.x);
			assert.equal(0.5773502691896257, vec.y);
			assert.equal(0.5773502691896257, vec.z);
		});
		it('Normalized Vector Magnitude Should Equal 1', function () {
			for (var i = 0; i < 10000; i++) {
				var vec = new Vector3(Math.random() * 1000, Math.random() * 1000, Math.random() * 1000);
				vec.normalize();
				assert.equal(1, errorTolerance(vec.magnitude() - 1));
			}
		});
		it('Random Normalized Vector Magnitude Is Within Tolerance for 50000 vectors ( <= 2.1316282072803006e-14 )', function () {
			for (var i = 0; i < 100000; i++) {
				var vec = new Vector3(25000 - (Math.random() * 50000), 25000 - (Math.random() * 50000),  25000 - (Math.random() * 50000));
				vec.normalize();
				assert.equal(true, errorTolerance(vec.magnitude() - 1));
			}
		});
		it('Normalized Vector Operations', function () {
			var vec = new Vector3(10, 10, 10);
			var vecMag = vec.magnitude();
			assert.equal(14.142135623730951, vecMag);
			vec.normalize();
			assert.equal(0.7071067811865475, vec.x);
			assert.equal(0.7071067811865475, vec.y);
			assert.equal(0.7071067811865475, vec.z);
			assert.equal(true, errorTolerance(vec.magnitude() - 1));
			vec.multiply(vecMag);
			assert.equal(10, vec.x);
			assert.equal(10, vec.y);
			assert.equal(10, vec.z);
		});
	});
	describe('Static Converters', function () {
		it("Static Vector degreesToRadians", function () {
			var radians = 0.017453292519943295;
			for (var i = 0; i < 360; i++) {
				var radian = Vector3.degreesToRadians(i);
				assert.equal(i * radians, radian);
			}
		});
		it("Static Vector radiansToDegrees", function () {
			var radian = 0.017453292519943295;
			for (var i = 0; i < 360; i++) {
				var degree = Vector3.radiansToDegrees(radian * i);
				assert.equal(i, Math.round(degree));
			}
		});
	});
	describe('Static Vector Methods', function () {
		it("Add Two Vectors", function () {
			var vec1 = new Vector3(5,0, 2.5);
			var vec3 = new Vector3(0,5, 2.5);
			var added = Vector3.add(vec1, vec3);
			assert.equal(5, added.x);
			assert.equal(5, added.y);
			assert.equal(5, added.z);
		});
		it("Subtract Two Vectors", function () {
			var vec1 = new Vector3(10,5, 5);
			var vec3 = new Vector3(5,10, 5);
			var added = Vector3.subtract(vec1, vec3);
			assert.equal(5, added.x);
			assert.equal(-5, added.y);
			assert.equal(0, added.z);
		});
		it("Multiply Vector by scalar", function () {
			var vec1 = new Vector3(5,5,5);
			var added = Vector3.multiply(vec1, 2);
			assert.equal(10, added.x);
			assert.equal(10, added.y);
			assert.equal(10, added.z);
		});
		it("Divide Vector by scalar", function () {
			var vec1 = new Vector3(20,20, 20);
			var added = Vector3.divide(vec1, 2);
			assert.equal(10, added.x);
			assert.equal(10, added.y);
			assert.equal(10, added.z);
		});
		it("Dot Two Vectors", function () {
			var vec1 = new Vector3(2, 5, 2);
			var vec3 = new Vector3(5, 2, 5);
			var added = Vector3.dot(vec1, vec3);
			assert.equal(24, added);
		});
		it("Normalize a Vector", function () {
			var vec1 = new Vector3(10, 5, 5);
			var vec3 = Vector3.normalize(vec1);
			assert.equal(true, errorTolerance(vec3.magnitude()-1));
		});
		it("Distance between Two Vectors", function () {
			var vec1 = new Vector3(1,0);
			var vec3 = new Vector3(-1,0);
			var added = Vector3.dist(vec1, vec3);
			assert.equal(2, added);
			vec1 = new Vector3(0,5);
			vec3 = new Vector3(0,-5);
			added = Vector3.dist(vec1, vec3);
			assert.equal(10, added);
			vec1 = new Vector3(0.5,0);
			vec3 = new Vector3(0,0.5);
			added = Vector3.dist(vec1, vec3);
			assert.equal(0.7071067811865476, added);
		});
		it("Angle Between Two Vectors", function () {
			var vec1 = new Vector3(1,0);
			var vec3 = new Vector3(-1,0);
			var angle = Vector3.angleBetween(vec1, vec3);
			var degrees = Vector3.radiansToDegrees(angle);
			assert.equal(180, degrees);

			vec1 = new Vector3(1,1);
			vec3 = new Vector3(0,1);
			angle = Vector3.angleBetween(vec1, vec3);
			degrees = Vector3.radiansToDegrees(angle);
			assert.equal(45, Math.round(degrees));

			vec1 = new Vector3(1,1);
			vec3 = new Vector3(0,-1);
			angle = Vector3.angleBetween(vec1, vec3);
			degrees = Vector3.radiansToDegrees(angle);
			assert.equal(135, Math.round(degrees));

			vec1 = new Vector3(1,1);
			vec3 = vec1.get();
			angle = Vector3.angleBetween(vec1, vec3);
			degrees = Vector3.radiansToDegrees(angle);
			assert.equal(0, Math.round(degrees));

			vec1 = new Vector3(1,1);
			vec3 = vec1.get();
			vec3.rotate(1);
			angle = Vector3.angleBetween(vec1, vec3);
			degrees = Vector3.radiansToDegrees(angle);
			assert.equal(1, Math.round(degrees));

			vec1 = new Vector3(1,1);
			vec3 = vec1.get();
			vec3.rotate(90);
			angle = Vector3.angleBetween(vec1, vec3);
			degrees = Vector3.radiansToDegrees(angle);
			assert.equal(90, Math.round(degrees));
		});
	});

	describe('Rotation', function () {
		it("Rotate Vector 360 degrees forward and backward", function () {
			var vec = new Vector3(10, 0);
			var vec3 = new Vector3(0, 0);
			for (var i = 0; i < 360; i++) {
				vec.rotate(1, vec3, true); // stabilize the vector as we rotate it;
			}
			for (var i = 0; i < 360; i++) {
				vec.rotate(-1, vec3, true); // stabilize the vector as we rotate it;
			}
			assert.equal(true, errorTolerance(vec.x - 10));
		});
		it("Rotate Vector 180 degrees, X should equal -10", function () {
			var vec = new Vector3(10, 0);
			vec.rotate(180);
			assert.equal(-10, vec.x);
		});
		it("Rotate Vector 180 degrees, Y should equal -10", function () {
			var vec = new Vector3(0, 10);
			vec.rotate(180);
			assert.equal(-10, vec.y);
		});
		it("Rotate Vector 45 degrees", function () {
			var vec = new Vector3(10, 0);
			vec.rotate(45);
			assert.equal(7.0710678118654755, vec.x);
		});
		it("Rotate Vector 180 degrees", function () {
			var vec = new Vector3(1, 0);
			var vec3 = new Vector3(-1, 0);
			vec.rotate(180, vec3);
			assert.equal(-3, vec.x);
			assert.equal(0, errorTolerance(vec.y - 1));
		});
	});

	describe('Interpolators', function () {
		it('Linear Interpolation', function () {
			var vec1 = new Vector3(0,10);
			var vec3 = new Vector3(10,0);

			for(var i = 0; i < 10; i++) {
				var lerp = Vector3.lerp(vec1, vec3, i/10);
				assert.equal(lerp.x, i);
			}

			var count = 0;
			for(var i = 10; i > 0; i--) {
				var lerp = Vector3.lerp(vec1, vec3, count);
				count+=0.1;
				assert.equal(Math.round(lerp.y), i);
			}

		});
		it('Map', function () {

			for(var i = 0; i < 10; i++) {
				var value = Vector3.map(i, 0, 10, 0, 100);
				assert.equal(value, i*10);
			}

			for(var i = 0; i < 10; i++) {
				var value = Vector3.map(i, 0, 10, 0, 10);
				assert.equal(value, i);
			}

			for(var i = 0; i < 10; i++) {
				var value = Vector3.map(i, 0, 10, 0, 350);
				assert.equal(value, i*35);
			}

		});
	});

});
