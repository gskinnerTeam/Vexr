import Events from "./EventLite";
import Vector2 from "../Libs/Vexr/Vector2";

var resizeId;
var resizeEvent;
export default class Screen {
    static get dimensions() {
        return Screen._dimensions;
    }
    static set dimensions(value) {
        if(Screen._dimensions != value) {
            Screen._dimensions = value;
        }
    }
    static get orientation() {
        return Screen._orientation;
    }
    static set orientation(value) {
        if(Screen._orientation != value) {
            Screen._orientation = value;
        }
    }
    static get center() {
        return Screen._center;
    }
    static set center(value) {
        if(Screen._center != value) {
            Screen._center = value;
        }
    }
    static get resizeDelay() {
        return Screen._resizeDelay;
    }
    static set resizeDelay(value) {
        if(Screen._resizeDelay != value) {
            Screen._resizeDelay = value;
        }
    }
    static get anchors() {
        return Screen._anchors;
    }
    static set anchors(value) {
        if(Screen._anchors != value) {
            Screen._anchors = value;
        }
    }
    static get anchorPositions() {
        return Screen._anchorPositions;
    }
    static set anchorPositions(value) {
        if(Screen._anchorPositions != value) {
            Screen._anchorPositions = value;
        }
    }

    static resize(e) {
        clearTimeout(resizeId);
        resizeEvent = e;
        resizeId = setTimeout(Screen.recalculate, Screen.resizeDelay);
    }

    static recalculate() {
        Screen.dimensions.set(window.innerWidth, window.innerHeight);
        if(Screen.dimensions.x > Screen.dimensions.y) {
            Screen.orientation = "landscape";
        } else {
            Screen.orientation = "portrait";
        }
        for(var anchor in Screen.anchors) {
            if(Screen.anchors.hasOwnProperty(anchor)) {
                Screen.anchorPositions[anchor].set(Screen.anchors[anchor].x * Screen.dimensions.x, Screen.anchors[anchor].y * Screen.dimensions.y);
            }
        }

        Events.trigger("resize", resizeEvent);
    }

    static getAnchor(name) {
        return Screen.anchorPositions[name].get();
    }

    static setAnchor(name, ratioX, ratioY) {

        if(Screen.anchors[name] == undefined) {
            Screen.anchors[name] = new Vector2(ratioX, ratioY);
            Screen.anchorPositions[name] = new Vector2(Screen.anchors[name].x * Screen.dimensions.x, Screen.anchors[name].y * Screen.dimensions.y);
        } else {
            Screen.anchors[name].set(ratioX, ratioY);
            Screen.anchorPositions[name].set(Screen.anchors[name].x * Screen.dimensions.x, Screen.anchors[name].y * Screen.dimensions.y);
        }

    }
    static removeAnchor (name) {
        delete Screen.anchors[name];
        delete Screen.anchorPositions[name]
    }
    static init() {
        Screen.resizeDelay = 100;
        Screen.anchors = {};
        Screen.anchorPositions = {};
        Screen.dimensions = new Vector2(window.innerWidth, window.innerHeight);
        Screen.setAnchor("center", 0.5, 0.5);
        if(Screen.dimensions.x > Screen.dimensions.y) {
            Screen.orientation = "landscape";
        } else {
            Screen.orientation = "portrait";
        }
    }

}
Screen.init();