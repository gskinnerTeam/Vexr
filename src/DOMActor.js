import Vector2 from "./Vector2";
import Actor from "./Actor";

export default class DOMActor extends Actor {
	constructor(className, location) {
		super(className, location);
		this.element = document.createElement("div");
		this.element.classList.add("actor");
		this.element.classList.add(className);
		this.parentElement = null;
	}

	addToParentElement(parentElement) {
		this.parentElement = parentElement;
		this.parentElement.appendChild(this.element);
	}

	draw() {
		this.element.style.transform =
			`translateX(${this.location.x}px) translateY(${this.location.y}px) rotate(${this.angle}deg)`;
	}

	destroy() {
		this.dead = true;
		this.element.remove();
		this.parentElement = null;
	}
}
