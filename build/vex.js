"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector2 = function () {
	_createClass(Vector2, null, [{
		key: "angleBetween",
		value: function angleBetween(a, b) {
			return Math.atan2(b.y - a.y, b.x - a.x);
		}
	}, {
		key: "lerp",
		value: function lerp(a, b, t) {
			var x = a.x + t * (b.x - a.x);
			var y = a.y + t * (b.y - a.y);
			return new Vector2(x, y);
		}
	}, {
		key: "map",
		value: function map(value, bottomA, topA, bottomB, topB) {
			return bottomB + (topB - bottomB) * (value - bottomA) / (topA - bottomA);
		}
	}, {
		key: "normalize",
		value: function normalize(vector) {
			var vec = vector.get();
			return vec.normalize();
		}
	}, {
		key: "radiansToDegrees",
		value: function radiansToDegrees(radians) {
			return radians * (180 / Math.PI);
		}
	}, {
		key: "degreesToRadians",
		value: function degreesToRadians(degrees) {
			return degrees * (Math.PI / 180);
		}
	}, {
		key: "add",
		value: function add(a, b) {
			return new Vector2(a.x + b.x, a.y + b.y);
		}
	}, {
		key: "subtract",
		value: function subtract(a, b) {
			var n = new Vector2(b.x, b.y);
			n.negate();
			return Vector2.add(a, n);
		}
	}, {
		key: "multiply",
		value: function multiply(a, scalar) {
			return new Vector2(a.x * scalar, a.y * scalar);
		}
	}, {
		key: "divide",
		value: function divide(a, scalar) {
			scalar = 1 / scalar;
			return Vector2.multiply(a, scalar);
		}
	}, {
		key: "dot",
		value: function dot(a, b) {
			return a.x * b.x + a.y * b.y;
		}
	}, {
		key: "dist",
		value: function dist(a, b) {
			var vec1 = a.x - b.x;
			var vec2 = a.y - b.y;
			return Math.sqrt(vec1 * vec1 + vec2 * vec2);
		}
	}]);

	function Vector2() {
		var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
		var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

		_classCallCheck(this, Vector2);

		this.x = x;
		this.y = y;
	}

	_createClass(Vector2, [{
		key: "get",
		value: function get() {
			return new Vector2(this.x, this.y);
		}
	}, {
		key: "set",
		value: function set(x, y) {
			this.x = x;
			this.y = y;
		}
	}, {
		key: "multiply",
		value: function multiply(scalar) {
			this.x = this.x * scalar;
			this.y = this.y * scalar;
		}
	}, {
		key: "add",
		value: function add(v) {
			this.x = this.x + v.x;
			this.y = this.y + v.y;
		}
	}, {
		key: "subtract",
		value: function subtract(v) {
			var n = new Vector2(v.x, v.y);
			n.negate();
			this.add(n);
		}
	}, {
		key: "divide",
		value: function divide(scalar) {
			scalar = 1 / scalar;
			this.multiply(scalar);
		}
	}, {
		key: "negate",
		value: function negate() {
			this.x = -this.x;
			this.y = -this.y;
		}
	}, {
		key: "clamp",
		value: function clamp(limit) {
			if (this.x > limit) {
				this.x = limit;
			} else if (this.x < 0 && this.x < limit) {
				this.x = -limit;
			}
			if (this.y > limit) {
				this.y = limit;
			} else if (this.y < 0 && this.y < limit) {
				this.y = -limit;
			}
		}
	}, {
		key: "limit",
		value: function limit(_limit) {
			if (this.magnitude() > _limit) {
				this.normalize();
				this.multiply(_limit);
			}
		}
	}, {
		key: "rotate",
		value: function rotate(degrees) {
			var pivotVector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Vector2(0, 0);

			var rads = Vector2.degreesToRadians(degrees);
			var cosineAngle = Math.cos(rads);
			var sineAngle = Math.sin(rads);
			this.x = cosineAngle * (this.x - pivotVector.x) + sineAngle * (this.y - pivotVector.y) + pivotVector.x;
			this.y = cosineAngle * (this.y - pivotVector.y) - sineAngle * (this.x - pivotVector.x) + pivotVector.y;

			// function rotate(cx, cy, x, y, angle) {
			// 	var radians = (Math.PI / 180) * angle,
			// 		cos = Math.cos(radians),
			// 		sin = Math.sin(radians),
			// 		nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
			// 		ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
			// 	return [nx, ny];
			// }


			// var radians = (Math.PI / 180) * angle,
			// 	cos = Math.cos(radians),
			// 	sin = Math.sin(radians),
			// 	nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
			// 	ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
			// return [nx, ny];
		}
	}, {
		key: "magnitude",
		value: function magnitude() {
			return Math.sqrt(Vector2.dot(this, this));
		}
	}, {
		key: "normalize",
		value: function normalize() {
			var m = this.magnitude();
			if (m > 0) {
				this.divide(m);
			}
		}
	}]);

	return Vector2;
}();

exports.default = Vector2;