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

	static constrain(actor, minWidth, maxWidth, minHeight, maxHeight, margin = 0) {
		minWidth -= margin;
		maxWidth += margin;
		minHeight -= margin;
		maxHeight += margin;

		if (actor.location.x < minWidth) {
			actor.velocity.x *= -1;
			actor.location.x = minWidth;
		}
		if (actor.location.y < minHeight) {
			actor.velocity.y *= -1;
			actor.location.y = minHeight;
		}
		if (actor.location.x > maxWidth) {

			actor.velocity.x *= -1;
			actor.location.x = maxWidth;
		}
		if (actor.location.y > maxHeight) {
			actor.velocity.y *= -1;
			actor.location.y = maxHeight;
		}
	}

	static wrap(actor, minWidth, maxWidth, minHeight, maxHeight, margin = 0) {
		minWidth -= margin;
		maxWidth += margin;
		minHeight -= margin;
		maxHeight += margin;

		if (actor.location.x < minWidth) {
			actor.location.x = maxWidth;
		}
		if (actor.location.y < minHeight) {
			actor.location.y = maxHeight;
		}
		if (actor.location.x > maxWidth) {
			actor.location.x = minWidth;
		}
		if (actor.location.y > maxHeight) {
			actor.location.y = minHeight;
		}
	}

	static disableOutside(actor, margin = 10) {
		if (actor.location.x < 0 - margin || actor.location.y < 0 - margin || actor.location.x > width + margin || actor.location.y > height + margin) {
			actor.active = false;
			actor.visible = false;
		}
	}

	static destroyOutside(actor, margin = 10) {
		if (actor.location.x < 0 - margin || actor.location.y < 0 - margin || actor.location.x > width + margin || actor.location.y > height + margin) {
			actor.dead = true;
		}
	}
}