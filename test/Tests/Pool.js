var Pool = Vexr.Pool;
var Vector3 = Vexr.Vector3;
var Behaviors = Vexr.Behaviors;
describe('Pool Tests', function () {
    it('Object without constructor error', function () {
        var err = new Error();
        expect(function() {
            Pool.allocate({me: 1}, "myObject", 50,
                function(item){
                    item.raw[0] = 0;
                    item.raw[1] = 0;
                    item.raw[2] = 0;
                });
        }).to.throw("Object must have a constructor");
    });
    it('Allocate Pool', function () {
        var pool = Pool.allocate(Vector3, "Vector3", 50, function(item){
                    item.raw[0] = 0;
                    item.raw[1] = 0;
                    item.raw[2] = 0;
                });
        assert.equal(pool.length, 50);
    });
    it('Gat an instance of and Object', function () {
        var obj = Pool.getObject("Vector3");
        assert.equal(obj instanceof Vector3, true);
    });
    it('Object from pool has pool properties set', function () {
        var obj = Pool.getObject("Vector3");
        assert.equal(obj.v_pool_key, "Vector3");
        expect(obj.v_pool_index).to.be.above(-1);
    });
    it('Object poolsize has shrunk', function () {
        var obj = Pool.poolsize("Vector3");
        assert.equal(obj, 48);
    });
    it('Return an instance of an object', function () {
        var obj = Pool.getObject("Vector3");
        assert.equal(obj.x, 0);
        assert.equal(obj.y, 0);
        assert.equal(obj.z, 0);
            obj.set(5,5,5);
        assert.equal(obj.x, 5);
        assert.equal(obj.y, 5);
        assert.equal(obj.z, 5);
        Pool.returnObject(obj);
        assert.equal(obj.x, 0);
        assert.equal(obj.y, 0);
        assert.equal(obj.z, 0);
    });
    it('Stress Test: Cycle through the pool.', function () {
        for(var i = 0; i < 30; i++) {
            var obj = Pool.getObject("Vector3");
                assert.equal(obj.x, 0);
                assert.equal(obj.y, 0);
                assert.equal(obj.z, 0);
                obj.set(5, 5, 5);
                assert.equal(obj.x, 5);
                assert.equal(obj.y, 5);
                assert.equal(obj.z, 5);
        }
        assert.equal(Pool.poolsize("Vector3"), 18);
        Pool.returnAll("Vector3");
        assert.equal(Pool.poolsize("Vector3"), 50);
        var obj = Pool.getObject("Vector3");
        assert.equal(Pool.poolsize("Vector3"), 49);
        assert.equal(obj.x, 0);
        assert.equal(obj.y, 0);
        assert.equal(obj.z, 0);
    });
    it('Stress Test: Cycle through the pool A LOT. 25000 ops.', function () {
        for(var j = 0; j < 100; j++) {
            Pool.returnAll("Vector3");
            for (var i = 0; i < 50; i++) {
                var obj = Pool.getObject("Vector3");
                assert.equal(obj.x, 0);
                assert.equal(obj.y, 0);
                assert.equal(obj.z, 0);
                obj.set(5, 5, 5);
                assert.equal(obj.x, 5);
                assert.equal(obj.y, 5);
                assert.equal(obj.z, 5);
            }
            assert.equal(Pool.poolsize("Vector3"), 0);
            Pool.returnAll("Vector3");
            assert.equal(Pool.poolsize("Vector3"), 50);
            var obj = Pool.getObject("Vector3");
            assert.equal(Pool.poolsize("Vector3"), 49);
            assert.equal(obj.x, 0);
            assert.equal(obj.y, 0);
            assert.equal(obj.z, 0);
        }
    });
    // it('Stress Test: Cycle through the pool A LOT.', function () {
    //     var tot = 0;
    //     for(var j = 0; j < 500; j++) {
    //
    //         Pool.returnAll("Vector3");
    //
    //         for (var i = 0; i < 50; i++) {
    //             var start = performance.now();
    //             var obj = Pool.getObject("Vector3");
    //             obj.set(5, 5, 5);
    //             tot += performance.now()-start;
    //         }
    //     }
    //     //console.log(tot);
    // });
    it('Stress Test: Context', function () {
        Pool.returnAll("Vector3");
        for(var j = 0; j < 21; j++) {
            var v1 = Pool.getObject("Vector3");
            v1.set(Math.random(),Math.random(),Math.random());
            var v2 = Pool.getObject("Vector3");
            v2.set(Math.random(),Math.random(),Math.random());

            function blah () {
                var v = Pool.getObject("Vector3");
                Vector3.add(v1, v2, v);
                return v;
            }

            var act = new Vexr.Actor();
            var v3 = blah();
            var v4 = Pool.getObject("Vector3");
                v3.add(v4);
                act.addForce(v4);
            Pool.returnObjects([v1, v2, v3, v4]);
        }
        assert.equal(Pool.poolsize("Vector3"), 50);

    });

    it('Deallocate Pool', function () {
        assert.equal(Pool.Pools["Vector3"].amount, 50);
        Pool.deallocate("Vector3");

        expect(function() {
            Pool.poolsize("Vector3");

        }).to.throw(/undefined/);
    });
    
});