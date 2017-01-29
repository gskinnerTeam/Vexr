let objectPool = new Object();
let usagePool = new Object();
let clean = new Object();

export default class Pool {

    static allocate(object, objectKey, number, cleaner = function(item){return item}) {
        if (object.hasOwnProperty("prototype")) {
            clean[objectKey] = cleaner;
            if (!objectPool[objectKey]) {
                usagePool[objectKey] = [];
                objectPool[objectKey] = [];
            }
            for (var i = 0; i < number; i++) {
                var instance = new object();
                    instance.index = i;
                    instance.pool_key = objectKey;
                usagePool[objectKey][i] = false;
                objectPool[objectKey][i] = instance;
            }
            return objectPool[objectKey];
        } else {
            throw new Error("Object must have a constructor");
        }
    }

    static poolsize(objectKey) {
        return objectPool[objectKey].filter(Pool.notInUse).length;
    }

    static inUse(object) {
        return usagePool[object.pool_key][object.index];
    }

    static notInUse(object) {
        return !usagePool[object.pool_key][object.index];
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
        clean[obj.pool_key](obj);
        usagePool[obj.pool_key][obj.index] = false;
    }
    s
    static returnObjects(objs) {
        for(var i = 0; i<objs.length; i++) {
            Pool.returnObject(objs[i]);
        }
    }

}