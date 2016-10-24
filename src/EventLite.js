let listeners = {};

export default class EventLite {
    static on (event, handler) {
        if (listeners[event] === undefined) {
            listeners[event] = [handler];
        } else {
            listeners[event].push(handler);
        }
        return handler;
    }
    static off (event, handler) {
        if (listeners[event]) {
            for (let i = listeners[event].length - 1; i >= 0; i--) {
                if (listeners[event].length === 1) {
                    delete listeners[event];
                } else {
                    listeners[event].splice(i, 1);
                    break;
                }
            }
        }
    }
    static trigger (event, ...data) {
        if (listeners[event]) {
            for (let i = listeners[event].length - 1; i >= 0; i--) {
                if(listeners[event] !== undefined) {
                    if (typeof listeners[event][i] === "function" && listeners[event][i] ) {
                        listeners[event][i](data);
                    } else {
                        throw "Event handler is not a function.";
                    }
                }
            }
        }
    }
    static unbindAll () {
        for (const event in listeners) {
            delete listeners[event];
        }
        return true;
    };
}
