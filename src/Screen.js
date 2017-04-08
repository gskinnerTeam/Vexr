import Events from "./EventLite";
import Vector3 from "./Vector3";


let resizeId;
let resizeEvent;

/**
 * Screen is a bunch of helper functions to give you control over where you want things to go on the screen using Vectors
 *
 * When setting the anchor you do it as an expression of the ratio of where you want to show up on the screen.
 * For example 0.5, 0.5 would give you the center of the screen
 *
 * Set an anchor point by calling setAnchor("PinnedLeftCenter", 0, 0.5);
 *
 * If you want to know the absolute position of an anchor on the screen, pass the key for your anchor to Screen.getAnchor("PinnedLeftCenter");
 *
 */
export default class Screen {
	/**
     * Returns the screen dimensions as a vector x = width, y = height
	 * @returns {Vector3}
	 */
	static get dimensions() {
        return Screen._dimensions;
    }

	/**
     * Sets the screen dimensions as a vector x = width, y = height
	 * @param value {Vector3}
	 */
	static set dimensions(value) {
        if(Screen._dimensions != value) {
            Screen._dimensions = value;
        }
    }
	/**
     * Returns the screen dimensions as an orientation value. "portrait" or "landscape"
	 * @returns {string}
	 */
	static get orientation() {
        return Screen._orientation;
    }
	/**
	 * sets the screen dimensions as an orientation value.
	 * @param value {string}
	 */
    static set orientation(value) {
        if(Screen._orientation != value) {
            Screen._orientation = value;
        }
    }

	/**
     * Retures a vector at the center of the screen
	 * @returns {Vector3}
	 */
	static get center() {
        return Screen._center;
    }
	/**
	 * sets a vector at the center of the screen
	 * @param value {Vector3}
	 */
    static set center(value) {
        if(Screen._center != value) {
            Screen._center = value;
        }
    }

	/**
     * The debounce value for the resize
	 * @returns {number}
	 */
	static get resizeDelay() {
        return Screen._resizeDelay;
    }

	/**
     * The debounce value for the resize
	 * @param value {number}
	 */
	static set resizeDelay(value) {
        if(Screen._resizeDelay != value) {
            Screen._resizeDelay = value;
        }
    }

	/**
     * returns all the screen anchors
	 * @returns {Array}
	 */
	static get anchors() {
        return Screen._anchors;
    }

	/**
     * sets all the screen anchors
	 * @param value {Array}
	 */
	static set anchors(value) {
        if(Screen._anchors != value) {
            Screen._anchors = value;
        }
    }

	/**
     * Returns all the anchor positions
	 * @returns {Array}
	 */
	static get anchorPositions() {
        return Screen._anchorPositions;
    }

	/**
     * Sets all the anchor positions
	 * @param value {Array}
	 */
	static set anchorPositions(value) {
        if(Screen._anchorPositions != value) {
            Screen._anchorPositions = value;
        }
    }

	/**
     * static getter for width
	 * @returns {number}
	 */
	static get width () {
        return Screen._dimensions.x;
    }
	/**
	 * static getter for width
	 * @returns {number}
	 */
    static get height () {
        return Screen._dimensions.y;
    }

	/**
     * The function called on resize that buffers the event to resize
	 * @param e {event}
	 */
	static resize(e) {
        clearTimeout(resizeId);
        resizeEvent = e;
        resizeId = setTimeout(Screen.recalculate, Screen.resizeDelay);
    }

	/**
     * Loops through all the anchors and properties and updates their real coordinates
	 */
	static recalculate() {
        Screen.dimensions.set(window.innerWidth, window.innerHeight);
        if(Screen.dimensions.x > Screen.dimensions.y) {
            Screen.orientation = "landscape";
        } else {
            Screen.orientation = "portrait";
        }
        for(let anchor in Screen.anchors) {
            if(Screen.anchors.hasOwnProperty(anchor)) {
                Screen.anchorPositions[anchor].set(Screen.anchors[anchor].x * Screen.dimensions.x, Screen.anchors[anchor].y * Screen.dimensions.y);
            }
        }

        Events.trigger("resize", resizeEvent);
    }

	/**
     * Returns a vector for your anchor point at it's real position on screen
	 * @param name {string}
	 */
	static getAnchor(name) {
        return Screen.anchorPositions[name].get();
    }

	/**
     * Sets an anchor point at the provided ratio
	 * @param name {string}
	 * @param ratioX {number}
	 * @param ratioY {number}
	 */
	static setAnchor(name, ratioX, ratioY) {

        if(Screen.anchors[name] == undefined) {
            Screen.anchors[name] = new Vector3(ratioX, ratioY);
            Screen.anchorPositions[name] = new Vector3(Screen.anchors[name].x * Screen.dimensions.x, Screen.anchors[name].y * Screen.dimensions.y);
        } else {
            Screen.anchors[name].set(ratioX, ratioY);
            Screen.anchorPositions[name].set(Screen.anchors[name].x * Screen.dimensions.x, Screen.anchors[name].y * Screen.dimensions.y);
        }

    }

	/**
     * Deletes an anchor
	 * @param name
	 */
	static removeAnchor (name) {
        delete Screen.anchors[name];
        delete Screen.anchorPositions[name]
    }

	/**
     * Initializes the static class (ES6 no static property workaround)
	 */
	static init() {
        Screen.resizeDelay = 100;
        Screen.anchors = {};
        Screen.anchorPositions = {};
        Screen.dimensions = new Vector3(window.innerWidth, window.innerHeight);
        Screen.setAnchor("center", 0.5, 0.5);
        if(Screen.dimensions.x > Screen.dimensions.y) {
            Screen.orientation = "landscape";
        } else {
            Screen.orientation = "portrait";
        }
    }

}
Screen.init();