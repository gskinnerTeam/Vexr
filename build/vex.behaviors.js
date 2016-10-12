"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _vex = require("vex");

var _vex2 = _interopRequireDefault(_vex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Behavior = function () {
	function Behavior() {
		_classCallCheck(this, Behavior);
	}

	_createClass(Behavior, null, [{
		key: "seek",
		value: function seek(actor, targetPosition) {
			var desired = _vex2.default.subtract(targetPosition, actor.location);
			desired.normalize();
			desired.multiply(actor.maxSpeed);
			var steer = _vex2.default.subtract(desired, actor.velocity);
			steer.limit(actor.maxForce);
			return steer;
		}
	}, {
		key: "arrive",
		value: function arrive(actor, target) {
			var power = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;


			var desired = _vex2.default.subtract(target, actor.location);
			var dMag = desired.magnitude();
			desired.normalize();
			var mappedPower = _vex2.default.map(dMag, 0, power, 0, actor.maxSpeed);

			desired.multiply(mappedPower);

			var steer = _vex2.default.subtract(desired, actor.velocity);
			steer.limit(actor.maxForce);

			return steer;
		}
	}, {
		key: "avoidAll",
		value: function avoidAll(actor, obstacles, avoidRadius) {
			var avoidRadius = 80 || avoidRadius;
			var total = new _vex2.default(0, 0);
			var count = 0;
			for (var o in obstacles) {
				var obstacle = obstacles[o];
				var distance = _vex2.default.dist(actor.location, obstacle.location);
				if (distance > 0 && distance < avoidRadius && actor.me != obstacle.me) {
					var difference = _vex2.default.subtract(actor.location, obstacle.location, obstacle.me);
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

				var steer = _vex2.default.subtract(total, actor.velocity);
				steer.limit(actor.maxForce);

				return steer;
			} else {
				return new _vex2.default(0, 0);
			}
		}
	}, {
		key: "avoid",
		value: function avoid(actor, target, avoidRadius) {
			this.avoidAll(actor, [target], avoidRadius);
		}
	}, {
		key: "constrain",
		value: function constrain(actor, width, height) {
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
	}]);

	return Behavior;
}();

var Actor = function () {
	function Actor(className, location) {
		_classCallCheck(this, Actor);

		this.type = className;
		this.dead = false;
		this.me = Math.floor(Math.random() * 9007199254740991);
		this.element = document.createElement("div");
		this.element.classList.add("actor");
		this.element.classList.add(className);
		this.location = location || new _vex2.default(-1000, -1000);
		this.velocity = new _vex2.default(0, 0);
		this.acceleration = new _vex2.default(0, 0);
		this.angle = 0;
		this.maxSpeed = 15;
		this.maxForce = 1;
		this.parent = null;
	}

	_createClass(Actor, [{
		key: "addToParent",
		value: function addToParent(parentElement) {
			this.parent = parentElement;
			this.parent.appendChild(this.element);
		}
	}, {
		key: "render",
		value: function render() {
			this.element.style.transform = "translateX(" + this.location.x + "px) translateY(" + this.location.y + "px) rotate(" + this.angle + "deg)";
		}
	}, {
		key: "update",
		value: function update() {}
	}, {
		key: "destroy",
		value: function destroy() {
			this.dead = true;
			this.element.remove();
		}
	}]);

	return Actor;
}();