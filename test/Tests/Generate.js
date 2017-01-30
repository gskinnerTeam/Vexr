var Generate = Vexr.Generate;

describe('Static Generate', function () {
    it("RandomHexString() always returns the right number of characters", function () {
        for(var i = 0; i < 1000; i++) {
            var length = Math.floor(Math.random()*1000);
            var string = Generate.RandomHexString(length);
            assert.equal(string.length, length);
        }
    });
    it("RandomHexString() never produces a string with 'undefined' in it", function () {
       var regex = new RegExp("undefined",'g');
        for(var i = 0; i < 1000; i++) {
            var length = Math.floor(Math.random()*1000);
            var string = Generate.RandomHexString(length);
            assert.equal(regex.test(string), false);
        }
    });
    it("UUID() returns a string with the correct format", function () {
        var regex = new RegExp("[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}");
        for(var i = 0; i < 1000; i++) {
            var string = Generate.UUID();
            assert.equal(regex.test(string), true);
        }
    });
});
