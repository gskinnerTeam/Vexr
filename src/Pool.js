let pools = new Object();
let objectPool = new Object();
let usagePool = new Object();
let clean = new Object();

export default class Pool {

    static allocate(object, objectKey, number, cleaner = function(item){return item}) {

        if (object.hasOwnProperty("prototype")) {
            pools[objectKey] = {
                object: object,
                objectKey: objectKey,
                amount: number,
                cleaner: cleaner
            }
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
            delete pools[objectKey]
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