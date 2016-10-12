import Vector2 from "./vex";

class Behavior {
	static seek(actor, targetPosition) {
		var desired = Vector2.subtract(targetPosition, actor.location);
		desired.normalize();
		desired.multiply(actor.maxSpeed);
		var steer = Vector2.subtract(desired, actor.velocity);
		steer.limit(actor.maxForce);
		return steer;
	}

	static arrive(actor, target, power = 50) {

		var desired = Vector2.subtract(target, actor.location);
		var dMag = desired.magnitude();
		desired.normalize();
		var mappedPower = Vector2.map(dMag, 0, power, 0, actor.maxSpeed);

		desired.multiply(mappedPower);

		var steer = Vector2.subtract(desired, actor.velocity);
		steer.limit(actor.maxForce);

		return steer;
	}

	static avoidAll(actor, obstacles, avoidRadius) {
		var avoidRadius = 80 || avoidRadius;
		var total = new Vector2(0, 0);
		var count = 0;
		for (var o in obstacles) {
			var obstacle = obstacles[o];
			var distance = Vector2.dist(actor.location, obstacle.location);
			if ((distance > 0) && (distance < avoidRadius) && actor.me != obstacle.me) {
				var difference = Vector2.subtract(actor.location, obstacle.location, obstacle.me);
				difference.normalize();
				difference.divide(distance);
				total.add(difference);
				count++;
			}
		}
		if (count > 0) {
			total.divide(count);
			total.normalize();
			total.multiply(actor.maxSpeed);

			var steer = Vector2.subtract(total, actor.velocity);
			steer.limit(actor.maxForce);

			return steer;
		} else {
			return new Vector2(0, 0);
		}
	}

	static avoid(actor, target, avoidRadius) {
		this.avoidAll(actor, [target], avoidRadius);
	}

	static constrain(actor, width, height) {
		if (actor.location.x < 0) {
			actor.velocity.x *= -1;
			actor.location.x = 0;
		}
		if (actor.location.y < 0) {
			actor.velocity.y *= -1;
			actor.location.y = 0;
		}
		if (actor.location.x > width) {

			actor.velocity.x *= -1;
			actor.location.x = width;
		}
		if (actor.location.y > height) {
			actor.velocity.y *= -1;
			actor.location.y = height;
		}
	}
}

class Actor {
	constructor(className, location) {
		this.type = className;
		this.dead = false;
		this.me = Math.floor(Math.random() * 9007199254740991);
		this.element = document.createElement("div");
		this.element.classList.add("actor");
		this.element.classList.add(className);
		this.location = location || new Vector2(-1000, -1000);
		this.velocity = new Vector2(0, 0);
		this.acceleration = new Vector2(0, 0);
		this.angle = 0;
		this.maxSpeed = 15;
		this.maxForce = 1;
		this.parent = null;
	}

	addToParent(parentElement) {
		this.parent = parentElement;
		this.parent.appendChild(this.element);
	}

	render() {
		this.element.style.transform =
			`translateX(${this.location.x}px) translateY(${this.location.y}px) rotate(${this.angle}deg)`;
	}

	update() {
	}

	destroy() {
		this.dead = true;
		this.element.remove();
	}
}