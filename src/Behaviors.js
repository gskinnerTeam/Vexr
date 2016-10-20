import Vector2 from "./Vector2";

export default class Behavior {
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
	static wrap(actor, width, height) {
		if (actor.location.x < 0) {
			actor.location.x = width;
		}
		if (actor.location.y < 0) {
			actor.location.y = 0;
		}
		if (actor.location.x > width) {
			actor.location.x = width;
		}
		if (actor.location.y > height) {
			actor.location.y = 0;
		}
	}
}