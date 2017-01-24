import Convert from "./Convert";
import Vector3 from "./Vector3";



export default class Behavior {
	static seek(actor, targetPosition) {
		var desired = Vector3.subtract(targetPosition, actor.location);
		desired.normalize();
		desired.multiply(actor.maxSpeed);
		var steer = Vector3.subtract(desired, actor.velocity);
		steer.limit(actor.maxForce);
		return steer;
	}

	static arrive(actor, target, power = 50) {

		var desired = Vector3.subtract(target, actor.location);
		var dMag = desired.magnitude();
		desired.normalize();
		var mappedPower = Convert.MapRange(dMag, 0, power, 0, actor.maxSpeed);

		desired.multiply(mappedPower);

		var steer = Vector3.subtract(desired, actor.velocity);
		steer.limit(actor.maxForce);

		return steer;
	}

	static avoidAll(actor, obstacles, avoidRadius = 80) {
		var avoidRadius = avoidRadius;
		var total = new Vector3(0, 0);
		var count = 0;
		for (var o = 0; o < obstacles.length; o++) {
			var obstacle = obstacles[o];
			var distance = Vector3.dist(actor.location, obstacle.location);
			if ((distance > 0) && (distance < avoidRadius) && actor.id != obstacle.id) {
				var difference = Vector3.subtract(actor.location, obstacle.location, obstacle.id);
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

			var steer = Vector3.subtract(total, actor.velocity);
			steer.limit(actor.maxForce);

			return steer;
		} else {
			return new Vector3(0,0,0);
		}
	}

	static avoid(actor, target, avoidRadius) {
		this.avoidAll(actor, [target], avoidRadius);
	}

	static constrain(actor, minWidth, minHeight, maxWidth, maxHeight, margin = 0) {
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

	static wrap(actor, minWidth, minHeight, maxWidth, maxHeight, margin = 0) {
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

	static disableOutside(actor, minWidth, minHeight, maxWidth, maxHeight, margin = 0) {
		minWidth -= margin;
		maxWidth += margin;
		minHeight -= margin;
		maxHeight += margin;

		if (actor.location.x < minWidth || actor.location.y < minHeight || actor.location.x > maxWidth || actor.location.y > maxHeight) {
			actor.active = false;
			actor.visible = false;
		}
	}

	static destroyOutside(actor, minWidth, minHeight, maxWidth,  maxHeight, margin = 0) {
		minWidth -= margin;
		maxWidth += margin;
		minHeight -= margin;
		maxHeight += margin;
		if (actor.location.x < minWidth || actor.location.y < minHeight || actor.location.x > maxWidth || actor.location.y > maxHeight) {
			actor.dead = true;
		}
	}
}