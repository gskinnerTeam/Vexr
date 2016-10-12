var assert = require('assert');
var vex = require('../build/vex');
var Vector2 = vex.default;

describe('Vector2 Methods', function() {

describe('New Vector2()', function() {
		it('New Vector should be zero', function() {
			var vec = new Vector2();
			assert.equal(0, vec.x);
			assert.equal(0, vec.y);
		});
	});

	describe('New Vector2(1,2)', function() {
		it('New Vector should be x = 1, y = 2', function() {
			var vec = new Vector2(1,2);
			assert.equal(1, vec.x);
			assert.equal(2, vec.y);
		});
	});

	describe('Vector2.negate()', function() {
		it('Negated XY shoud equal -1', function() {
			var vec = new Vector2(1, 1);
			vec.negate();
			assert.equal(-1, vec.x);
			assert.equal(-1, vec.y);
		});
	});

	describe('Vector Add', function() {
		it('Adding Vectors should equal 3', function() {
			var vec = new Vector2(1, 1);
			var vec2 = new Vector2(2,2);
			vec.add(vec2);
			assert.equal(3, vec.x);
			assert.equal(3, vec.y);
		});
	});

	describe('Vector Subtract', function() {
		it('Subtracting Vectors should equal -1', function() {
			var vec = new Vector2(1, 1);
			var vec2 = new Vector2( 2, 2);
			vec.subtract(vec2);
			assert.equal(-1, vec.x);
			assert.equal(-1, vec.y);
		});
	});

	describe('Vector Multiply', function() {
		it('Multiplying Vector should equal 2', function() {
			var vec = new Vector2(1, 1);
				vec.multiply(2);
			assert.equal(2, vec.x);
			assert.equal(2, vec.y);
		});
	});

	describe('Vector Divide', function() {
		it('Dividing Vector should equal 5', function() {
			var vec = new Vector2(10, 10);
			vec.divide(2);
			assert.equal(5, vec.x);
			assert.equal(5, vec.y);
		});
	});

	describe('Vector Clamp', function() {
		it('Clamping Vector to 2 should equal 2', function() {
			var vec = new Vector2(10, 10);
			vec.clamp(2);
			assert.equal(2, vec.x);
			assert.equal(2, vec.y);
		});
	});

	describe('Magnitude', function() {
		it('Magnitude Should Equal 1', function() {
			var vec = new Vector2(1, 0);
			vec.magnitude();
			assert.equal(1, vec.magnitude());
		});
		it('Magnitude Should Equal 1.4142135623730951', function() {
			var vec = new Vector2(1, 1);
			vec.magnitude();
			assert.equal(1.4142135623730951, vec.magnitude());
		});
		it('Magnitude Should Equal 14.142135623730951', function() {
			var vec = new Vector2(10, 10);
			vec.magnitude();
			assert.equal(14.142135623730951, vec.magnitude());
		});
		it('Magnitude Should Equal 14.142135623730951', function() {
			var vec = new Vector2(-10, -10);
			vec.magnitude();
			assert.equal(14.142135623730951, vec.magnitude());
		});
	});
	describe('Normalize', function() {
		it('Normalized Vector Should Equal 1', function() {
			var vec = new Vector2(10, 0);
			vec.normalize();
			assert.equal(1, vec.x);
			assert.equal(0, vec.y);
		});

		it('Normalized Vector Magnitude Should Equal 1', function() {
			var vec = new Vector2(62, 34);
			vec.normalize();
			assert.equal(1, vec.magnitude());
		});

		it('Random Normalized Vector Magnitude Is Within Tolerance for 1000 vectors ( <= 2.220446049250313e-16 )', function() {
			for(var i = 0; i < 1000; i++) {
				var vec = new Vector2(50 - (Math.random() * 1000), 50 - (Math.random() * 1000));
				vec.normalize();
				assert.equal(true, Math.abs(vec.magnitude() - 1) <= 2.220446049250313e-16
				);
			}
		});

		it('Normalized Vector Operations', function() {
			var vec = new Vector2(10,10);
			var vecMag = vec.magnitude();
			assert.equal(14.142135623730951, vecMag);
			vec.normalize();
			assert.equal(0.7071067811865475, vec.x);
			assert.equal(0.7071067811865475, vec.y);
			assert.equal(true, Math.abs(vec.magnitude()-1) <= 0.02);
			vec.multiply(vecMag);
			assert.equal(10, vec.x);
			assert.equal(10, vec.y);
		});
	});


});
