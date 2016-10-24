import Vector2 from "./Vector2";

export default class Actor {
	constructor(className, location) {
		this.type = className;
		this.active = true;
		this.visible = true;
		this.dead = false;
		this.me = Math.floor(Math.random() * 9007199254740991);
		this.location = location || new Vector2(-1000, -1000);
		this.velocity = new Vector2(0, 0);
		this.acceleration = new Vector2(0, 0);
		this.angle = 0;
		this.maxSpeed = 15;
		this.maxForce = 1;
		this.parent = null;
	}

	addForce(vector) {
		this.acceleration.add(vector);
	}

	update() {
		if (this.active) {
			this.move();
			this.velocity.add(this.acceleration);
			this.location.add(this.velocity);
			this.acceleration.set(0,0);
		}
	}

	render() {
		if (this.visible) {
			this.draw();
		}
	}

	move() {

	}

	draw() {
		// override this function win your drawing code
	}

	destroy() {
		this.dead = true;
	}
}
