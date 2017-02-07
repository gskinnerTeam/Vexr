import Actor from "./Actor";
/**
 * DOMActor is an extension of the Actor class specifically for working with DOM elements.
 * @class DOMActor
 * @extends Actor
 */

export default class DOMActor extends Actor {
    /**
     * @param className {string} the CSS class you want to use for this DOMActor
     * @param location {Vector3} The starting location for this Actor
     * @constructor
     */
    constructor(className, location) {
        super(className, location);
        this.element = document.createElement("div");
        this.element.classList.add("actor");
        this.element.classList.add(className);
        this.parentElement = null;
    }

    /**
     * addToParentElement() will add DOMActor.element to the parentElement
     * @param parentElement {HTMLElement}
     */
    addToParentElement(parentElement) {
        this.parentElement = parentElement;
        this.parentElement.appendChild(this.element);
    }

    /**
     * draw() sets this DOMActor.element.style.transform to `translateX(${this.location.x}px) translateY(${this.location.y}px) rotate(${this.angle}deg)`
     */
    draw() {
        this.element.style.transform =
            `translateX(${this.location.x}px) translateY(${this.location.y}px) rotate(${this.angle}deg)`;
    }

    /**
     * destroy() sets this DOMActor to dead, removes it from the DOM, and nulls its reference to the parentElement
     */
    destroy() {
        this.dead = true;
        this.element.remove();
        this.parentElement = null;
    }
}
