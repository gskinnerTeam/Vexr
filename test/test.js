// karma puts the Vexr global module in the test environment.
var Vector2 = Vexr.Vector2;

function errorTolerance(error, tolerance) {
    tolerance = tolerance || 2.1316282072803006e-14;
    return Math.abs(error) <= tolerance;
}

describe('Vector2 Methods', function () {

    describe('New Vector2()', function () {
        it('New Vector should be zero', function () {
            var vec = new Vector2();
            assert.equal(0, vec.x);
            assert.equal(0, vec.y);
        });
    });

    describe('New Vector2(1,2)', function () {
        it('New Vector should be x = 1, y = 2', function () {
            var vec = new Vector2(1, 2);
            assert.equal(1, vec.x);
            assert.equal(2, vec.y);
        });
    });

    describe('Get Vector', function () {
        it('Original Vector should remain unchanged', function () {
            var vec = new Vector2(Math.random()*10, Math.random()*10);
            var vec2 = vec.get();
            assert.equal(vec.x, vec2.x);
            assert.equal(vec.y, vec2.y);
            vec2.multiply(2);
            assert.equal(vec.x*2, vec2.x);
            assert.equal(vec.y*2, vec2.y);
        });
    });

    describe('Set Vector', function () {
        it('Original vec2 should be set to vec1 values', function () {
            var vec = new Vector2(Math.random()*10, Math.random()*10);
            var vec2 = vec.get();
            vec2.multiply(2);
            vec2.set(vec.x, vec.y);
            assert.equal(vec.x, vec2.x);
            assert.equal(vec.y, vec2.y);
        });
    });


    describe('Vector2.negate()', function () {
        it('Negated XY shoud equal -1', function () {
            var vec = new Vector2(1, 1);
            vec.negate();
            assert.equal(-1, vec.x);
            assert.equal(-1, vec.y);
        });
    });

    describe('Vector Add', function () {
        it('Adding Vectors should equal 3', function () {
            var vec = new Vector2(1, 1);
            var vec2 = new Vector2(2, 2);
            vec.add(vec2);
            assert.equal(3, vec.x);
            assert.equal(3, vec.y);
        });
    });

    describe('Vector Subtract', function () {
        it('Subtracting Vectors should equal -1', function () {
            var vec = new Vector2(1, 1);
            var vec2 = new Vector2(2, 2);
            vec.subtract(vec2);
            assert.equal(-1, vec.x);
            assert.equal(-1, vec.y);
        });
    });

    describe('Vector Multiply', function () {
        it('Multiplying Vector should equal 2', function () {
            var vec = new Vector2(1, 1);
            vec.multiply(2);
            assert.equal(2, vec.x);
            assert.equal(2, vec.y);
        });
    });

    describe('Vector Divide', function () {
        it('Dividing Vector should equal 5', function () {
            var vec = new Vector2(10, 10);
            vec.divide(2);
            assert.equal(5, vec.x);
            assert.equal(5, vec.y);
        });
    });

    describe('Vector Clamp', function () {
        it('Clamping Vector to 2 should equal 2', function () {
            var vec = new Vector2(10, 10);
            vec.clamp(2);
            assert.equal(2, vec.x);
            assert.equal(2, vec.y);
        });
    });

    describe('Magnitude', function () {
        it('Magnitude Should Equal 1', function () {
            var vec = new Vector2(1, 0);
            vec.magnitude();
            assert.equal(1, vec.magnitude());
        });
        it('Magnitude Should Equal 1.4142135623730951', function () {
            var vec = new Vector2(1, 1);
            vec.magnitude();
            assert.equal(1.4142135623730951, vec.magnitude());
        });
        it('Magnitude Should Equal 14.142135623730951', function () {
            var vec = new Vector2(10, 10);
            vec.magnitude();
            assert.equal(14.142135623730951, vec.magnitude());
        });
        it('Magnitude Should Equal 14.142135623730951', function () {
            var vec = new Vector2(-10, -10);
            vec.magnitude();
            assert.equal(14.142135623730951, vec.magnitude());
        });
    });
    describe('Normalize', function () {
        it('Normalized Vector Should Equal 1', function () {
            var vec = new Vector2(10, 0);
            vec.normalize();
            assert.equal(1, vec.x);
            assert.equal(0, vec.y);
        });

        it('Normalized Vector Magnitude Should Equal 1', function () {
            for (var i = 0; i < 10000; i++) {
                var vec = new Vector2(Math.random() * 1000, Math.random() * 1000);
                vec.normalize();
                assert.equal(1, errorTolerance(vec.magnitude() - 1));
            }

        });

        it('Random Normalized Vector Magnitude Is Within Tolerance for 50000 vectors ( <= 2.1316282072803006e-14 )', function () {
            for (var i = 0; i < 100000; i++) {
                var vec = new Vector2(25000 - (Math.random() * 50000), 25000 - (Math.random() * 50000));
                vec.normalize();
                assert.equal(true, errorTolerance(vec.magnitude() - 1));
            }
        });


        it('Normalized Vector Operations', function () {
            var vec = new Vector2(10, 10);
            var vecMag = vec.magnitude();
            assert.equal(14.142135623730951, vecMag);
            vec.normalize();
            assert.equal(0.7071067811865475, vec.x);
            assert.equal(0.7071067811865475, vec.y);
            assert.equal(true, errorTolerance(vec.magnitude() - 1));
            vec.multiply(vecMag);
            assert.equal(10, vec.x);
            assert.equal(10, vec.y);
        });

    });

    describe('Static Converters', function () {
        it("Static Vector degreesToRadians", function () {
            var radians = 0.017453292519943295;
            for (var i = 0; i < 360; i++) {
                var radian = Vector2.degreesToRadians(i);
                assert.equal(i * radians, radian);
            }
        });
        it("Static Vector radiansToDegrees", function () {
            var radian = 0.017453292519943295;
            for (var i = 0; i < 360; i++) {
                var degree = Vector2.radiansToDegrees(radian * i);
                assert.equal(i, Math.round(degree));
            }
        });
    });

    describe('Static Vector Methods', function () {
        it("Add Two Vectors", function () {
            var vec1 = new Vector2(5,0);
            var vec2 = new Vector2(0,5);
            var added = Vector2.add(vec1, vec2);
            assert.equal(5, added.x);
            assert.equal(5, added.y);
        });
        it("Subtract Two Vectors", function () {
            var vec1 = new Vector2(10,5);
            var vec2 = new Vector2(5,10);
            var added = Vector2.subtract(vec1, vec2);
            assert.equal(5, added.x);
            assert.equal(-5, added.y);
        });
        it("Multiply Vector by scalar", function () {
            var vec1 = new Vector2(5,5);
            var added = Vector2.multiply(vec1, 2);
            assert.equal(10, added.x);
            assert.equal(10, added.y);
        });
        it("Divide Vector by scalar", function () {
            var vec1 = new Vector2(20,20);
            var added = Vector2.divide(vec1, 2);
            assert.equal(10, added.x);
            assert.equal(10, added.y);
        });
        it("Dot Two Vectors", function () {
            var vec1 = new Vector2(2,5);
            var vec2 = new Vector2(5,2);
            var added = Vector2.dot(vec1, vec2);
            assert.equal(20, added);
        });
        it("Normalize a Vector", function () {
            var vec1 = new Vector2(10,5);
            var vec2 = Vector2.normalize(vec1);

            assert.equal(true, errorTolerance(vec2.magnitude()-1));

        });
        it("Distance between Two Vectors", function () {
            var vec1 = new Vector2(1,0);
            var vec2 = new Vector2(-1,0);
            var added = Vector2.dist(vec1, vec2);
            assert.equal(2, added);
            vec1 = new Vector2(0,5);
            vec2 = new Vector2(0,-5);
            added = Vector2.dist(vec1, vec2);
            assert.equal(10, added);
            vec1 = new Vector2(0.5,0);
            vec2 = new Vector2(0,0.5);
            added = Vector2.dist(vec1, vec2);
            assert.equal(0.7071067811865476, added);
        });
        it("Angle Between Two Vectors", function () {
            var vec1 = new Vector2(1,0);
            var vec2 = new Vector2(-1,0);
            var angle = Vector2.angleBetween(vec1, vec2);
            var degrees = Vector2.radiansToDegrees(angle);
            assert.equal(180, degrees);

            vec1 = new Vector2(1,1);
            vec2 = new Vector2(0,1);
            angle = Vector2.angleBetween(vec1, vec2);
            degrees = Vector2.radiansToDegrees(angle);
            assert.equal(45, Math.round(degrees));

            // vec1 = new Vector2(100,100);
            // vec2 = vec1.get();
            // vec2.rotate(45);
            // angle = Vector2.angleBetween(vec1, vec2);
            // degrees = Vector2.radiansToDegrees(angle);
            // assert.equal(45, Math.round(degrees));

            vec1 = new Vector2(1,1);
            vec2 = new Vector2(0,-1);
            angle = Vector2.angleBetween(vec1, vec2);
            degrees = Vector2.radiansToDegrees(angle);
            assert.equal(135, Math.round(degrees));

            vec1 = new Vector2(1,1);
            vec2 = vec1.get();
            angle = Vector2.angleBetween(vec1, vec2);
            degrees = Vector2.radiansToDegrees(angle);
            assert.equal(0, Math.round(degrees));

            vec1 = new Vector2(1,1);
            vec2 = vec1.get();
            vec2.rotate(1);
            angle = Vector2.angleBetween(vec1, vec2);
            degrees = Vector2.radiansToDegrees(angle);
            assert.equal(1, Math.round(degrees));

            vec1 = new Vector2(1,1);
            vec2 = vec1.get();
            vec2.rotate(90);
            angle = Vector2.angleBetween(vec1, vec2);
            degrees = Vector2.radiansToDegrees(angle);
            assert.equal(90, Math.round(degrees));

            // vec1 = new Vector2(1,0);
            // vec2 = vec1.get();
            // for (var i = 0; i < 360; i++) {
            //     vec2.rotate(1, new Vector2(0,0), true);
            //     angle = Vector2.angleBetween(vec1, vec2);
            //     degrees = Vector2.radiansToDegrees(angle);
            //     console.log(degrees, i+1)
            //     assert.equal(i+1, Math.round(degrees));
            // }
        });
    });

    describe('Rotation', function () {
        it("Rotate Vector 360 degrees forward and backward", function () {
            var vec = new Vector2(10, 0);
            var vec2 = new Vector2(0, 0);
            for (var i = 0; i < 360; i++) {
                vec.rotate(1, vec2, true); // stabilize the vector as we rotate it;
            }
            for (var i = 0; i < 360; i++) {
                vec.rotate(-1, vec2, true); // stabilize the vector as we rotate it;
            }
            assert.equal(true, errorTolerance(vec.x - 10));
        });
        it("Rotate Vector 180 degrees, X should equal -10", function () {
            var vec = new Vector2(10, 0);
            vec.rotate(180);
            assert.equal(-10, vec.x);
        });
        it("Rotate Vector 180 degrees, Y should equal -10", function () {
            var vec = new Vector2(0, 10);
            vec.rotate(180);
            assert.equal(-10, vec.y);
        });
        it("Rotate Vector 45 degrees", function () {
            var vec = new Vector2(10, 0);
            vec.rotate(45);
            assert.equal(7.0710678118654755, vec.x);
        });
        it("Rotate Vector 180 degrees", function () {
            var vec = new Vector2(1, 0);
            var vec2 = new Vector2(-1, 0);
            vec.rotate(180, vec2);
            assert.equal(-3, vec.x);
            assert.equal(0, errorTolerance(vec.y - 1));
        });
    });

    describe('Interpolators', function () {
        it('Linear Interpolation', function () {
            var vec1 = new Vector2(0,10);
            var vec2 = new Vector2(10,0);

            for(var i = 0; i < 10; i++) {
                var lerp = Vector2.lerp(vec1, vec2, i/10);
                assert.equal(lerp.x, i);
            }

            var count = 0;
            for(var i = 10; i > 0; i--) {
                var lerp = Vector2.lerp(vec1, vec2, count);
                count+=0.1;
                assert.equal(Math.round(lerp.y), i);
            }

        });
        it('Map', function () {

            for(var i = 0; i < 10; i++) {
                var value = Vector2.map(i, 0, 10, 0, 100);
                assert.equal(value, i*10);
            }

            for(var i = 0; i < 10; i++) {
                var value = Vector2.map(i, 0, 10, 0, 10);
                assert.equal(value, i);
            }

            for(var i = 0; i < 10; i++) {
                var value = Vector2.map(i, 0, 10, 0, 350);
                assert.equal(value, i*35);
            }

        });
    });

});
