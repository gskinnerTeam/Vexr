var Convert = Vexr.Convert;

describe('Static Converters', function () {

    it("Static degreesToRadians", function () {
        var radians = 0.017453292519943295;
        for (var i = 0; i < 360; i++) {
            var radian = Convert.DegreesToRadians(i);
            assert.equal(i * radians, radian);
        }
    });

    it("Static radiansToDegrees", function () {
        var radian = 0.017453292519943295;
        for (var i = 0; i < 360; i++) {
            var degree = Convert.RadiansToDegrees(radian * i);
            assert.equal(i, Math.round(degree));
        }
    });

    it('Static MapRange', function () {
        for(var i = 0; i < 10; i++) {
            var value = Convert.MapRange(i, 0, 10, 0, 100);
            assert.equal(value, i*10);
        }
        for(var i = 0; i < 10; i++) {
            var value = Convert.MapRange(i, 0, 10, 0, 10);
            assert.equal(value, i);
        }
        for(var i = 0; i < 10; i++) {
            var value = Convert.MapRange(i, 0, 10, 0, 350);
            assert.equal(value, i*35);
        }
    });

});