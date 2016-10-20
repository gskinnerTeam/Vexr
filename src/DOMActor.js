import Vector2 from "./Vector2";
import Actor from "./Actor";

export default class DOMActor extends Actor{
	constructor(className, location) {
		super(className, location);
		this.element = document.createElement("div");
		this.element.classList.add("actor");
		this.element.classList.add(className);
		this.parent = null;
	}

	addToParent(parentElement) {
		this.parent = parentElement;
		this.parent.appendChild(this.element);
	}

	draw() {
		this.element.style.transform =
			`translateX(${this.location.x}px) translateY(${this.location.y}px) rotate(${this.angle}deg)`;
	}

	move() {
		if(this.active) {
			// extend this class and build your own update function;
		}
	}

	destroy() {
		this.dead = true;
		this.element.remove();
	}
}
