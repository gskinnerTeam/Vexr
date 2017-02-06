let pools = new Object();
let objectPool = new Object();
let clean = new Object();

export default class Pool {

    static allocate(object, objectKey, cleaner = function(item){return item}) {
        if (object.hasOwnProperty("prototype")) {
            pools[objectKey] = {
                object: object,
                objectKey: objectKey,
                cleaner: cleaner
            };
            clean[objectKey] = cleaner;
            objectPool[objectKey] = [];
        } else {
            throw new Error("Object must have a constructor");
        }
    }

    static deallocate(objectKey) {
            delete clean[objectKey];
            delete objectPool[objectKey];
            delete pools[objectKey]
    }

    static referencesInPool(objectKey){
        return pools[objectKey].size - Pool.poolsize(objectKey);
    }

    static poolsize(objectKey) {
        return objectPool[objectKey].length;
    }

    static getObject(objectKey) {
		if (objectPool[objectKey].length > 0) {
			return objectPool[objectKey].pop();
		} else {
			var obj = new pools[objectKey].object();
			obj.v_pool_key = objectKey;
			return obj;
		}
	}

    static returnObject(obj) {
        clean[obj.v_pool_key](obj);
		objectPool[obj.v_pool_key].push(obj);
    }
    static returnObjects(objs) {
        for(var i = 0; i<objs.length; i++) {
            Pool.returnObject(objs[i]);
        }
    }

    static get pools () {
        return pools;
    }

}