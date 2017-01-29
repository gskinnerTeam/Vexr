import Convert from "./Convert";
import Generate from "./Generate";
import Vector3 from "./Vector3";
import Pool from "./Pool";
const key = Generate.UUID();
export default class Behavior {
	static init () {
		Pool.allocate(Vector3, key, 10, Vector3.reset);
	}
	static seek(actor, targetPosition, scaleForce = 1) {
		var desired = Pool.getObject(key);
		var steer = Pool.getObject(key);

		Vector3.subtract(targetPosition, actor.location, desired);
		desired.normalize();
		desired.multiply(actor.maxSpeed);
		Vector3.subtract(desired, actor.velocity, steer);

		steer.limit(actor.maxForce);
		steer.multiply(scaleForce);
		actor.addForce(steer);

		Pool.returnObject(desired);
		Pool.returnObject(steer);
	}
	static arrive(actor, target, power = 50, scaleForce = 1) {
		var desired = Pool.getObject(key);
		var steer = Pool.getObject(key);
		Vector3.subtract(target, actor.location, desired);
		var mappedPower = Convert.MapRange(desired.magnitude(), 0, power, 0, actor.maxSpeed);
		desired.normalize();
		desired.multiply(mappedPower);
		Vector3.subtract(desired, actor.velocity, steer);
		steer.limit(actor.maxForce);
		steer.multiply(scaleForce);
		actor.addForce(steer);
		Pool.returnObject(desired);
		Pool.returnObject(steer);
	}
	static avoidAll(actor, obstacles, avoidRadius = 80, scaleForce = 1) {
		var difference = Pool.getObject(key);
		var steer = Pool.getObject(key);
		var total = Pool.getObject(key);
		var count = 0;
		for (var o = 0; o < obstacles.length; o++) {
			var obstacle = obstacles[o];
			var distance = Vector3.dist(actor.location, obstacle.location);
			if ((distance > 0) && (distance < avoidRadius) && actor.id != obstacle.id) {
				Vector3.subtract(actor.location, obstacle.location, difference);
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
			Vector3.subtract(total, actor.velocity, steer);
			steer.limit(actor.maxForce);
			steer.multiply(scaleForce);
			actor.addForce(steer);
		}
		Pool.returnObject(difference);
		Pool.returnObject(steer);
		Pool.returnObject(total);
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
Behavior.init();