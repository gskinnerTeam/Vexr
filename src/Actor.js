import Vector3 from "./Vector3";
import Generate from "./Generate";

export default class Actor {
	constructor(className = "Actor", location = new Vector3(0, 0, 0)) {
		this.type = className;
		this.active = true;
		this.visible = true;
		this.dead = false;
		this.id = Generate.UUID();
		this.location = location;
		this.velocity = new Vector3(0, 0, 0);
		this.acceleration = new Vector3(0, 0, 0);
		this.angle = 0;
		this.maxSpeed = 15;
		this.maxForce = 1;
	}

	addForce(vector) {
		this.acceleration.add(vector);
	}

	update() {
		if (this.active) {
			this.move();
			this.velocity.add(this.acceleration);
			this.location.add(this.velocity);
			this.acceleration.set(0,0,0);
		}
	}

	move() {

	}

	render() {
		if (this.visible) {
			this.draw();
		}
	}

	draw() {
		// override this function win your drawing code
	}

	destroy() {
		this.dead = true;
	}
}
