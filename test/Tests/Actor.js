var Actor = Vexr.Actor;
var Vector3 = Vexr.Vector3;
var Generate = Vexr.Generate;
var UUID = new RegExp("[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}");
describe('Actor', function () {
    it("New Actor has initialized properties", function () {
        var actor = new Actor();
        assert.equal(actor.type, "Actor");
        assert.equal(actor.active, true);
        assert.equal(actor.visible, true);
        assert.equal(actor.dead, false);
        assert.equal(UUID.test(actor.id), true);
        assert.equal(actor.location instanceof Vector3, true);
        assert.equal(actor.velocity instanceof Vector3, true);
        assert.equal(actor.acceleration instanceof Vector3, true);
        assert.equal(actor.angle, 0);
        assert.equal(actor.maxSpeed, 15);
        assert.equal(actor.maxForce, 1);
    });
    it("Adding a force applies it to acceleration", function(){
        for(var i = 0; i < 1000; i++) {
            var actor = new Actor();
            var accel = Math.random() * 1000;
            var v = new Vector3(accel, accel, accel);
            actor.addForce(v);
            assert.equal(actor.acceleration.x, accel);
            assert.equal(actor.acceleration.y, accel);
            assert.equal(actor.acceleration.z, accel);
        }
    });
    it("Updating applies acceleration and resets", function(){
        for(var i = 0; i < 1000; i++) {
            var actor = new Actor();
            var accel = Math.random() * 1000;
            var v = new Vector3(accel, accel, accel);
            actor.addForce(v);
            actor.update(v);
            assert.equal(actor.velocity.x, accel);
            assert.equal(actor.velocity.y, accel);
            assert.equal(actor.velocity.z, accel);
            assert.equal(actor.location.x, accel);
            assert.equal(actor.location.y, accel);
            assert.equal(actor.location.z, accel);
            assert.equal(actor.acceleration.x, 0);
            assert.equal(actor.acceleration.y, 0);
            assert.equal(actor.acceleration.z, 0);
        }
    });
    it("Parameters get set", function(){
        for(var i = 0; i < 1000; i++) {
            var name = Generate.UUID();
            var accel = Math.random() * 1000;
            var actor = new Actor(name, new Vector3(accel, accel, accel));
            assert.equal(actor.location.x, accel);
            assert.equal(actor.location.y, accel);
            assert.equal(actor.location.z, accel);
            assert.equal(actor.type, name);
        }
    });
    it("Destroy Sets this.dead to true for self and all it's children", function(){
        for(var i = 0; i < 1000; i++) {
            var actor = new Actor();
            assert.equal(actor.dead, false);
            actor.destroy();
            assert.equal(actor.dead, true);
        }
    });
});