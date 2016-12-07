(function (exports) {
'use strict';

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get$1 = function get$1(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get$1(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set$1 = function set$1(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set$1(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var Vector2 = function () {
	createClass(Vector2, null, [{
		key: "angleBetween",
		value: function angleBetween(a, b) {
			var mag = a.magnitude() * b.magnitude();
			var dot = Vector2.dot(a, b);
			return Math.acos(dot / mag);
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
			vec.normalize();
			return vec;
		}
	}, {
		key: "magnitude",
		value: function magnitude(vec) {
			return Math.sqrt(Vector2.dot(vec, vec));
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
		classCallCheck(this, Vector2);

		this.raw = [x, y];
	}

	createClass(Vector2, [{
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
			var stabilize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

			var mag = this.magnitude();
			var rads = Vector2.degreesToRadians(degrees);
			var cosineAngle = Math.cos(rads);
			var sineAngle = Math.sin(rads);
			this.x = cosineAngle * (this.x - pivotVector.x) + sineAngle * (this.y - pivotVector.y) + pivotVector.x;
			this.y = cosineAngle * (this.y - pivotVector.y) - sineAngle * (this.x - pivotVector.x) + pivotVector.y;
			if (stabilize) {
				this.normalize();
				this.multiply(mag);
			}
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
	}, {
		key: "x",
		get: function get() {
			return this.raw[0];
		},
		set: function set(value) {
			this.raw[0] = value;
		}
	}, {
		key: "y",
		get: function get() {
			return this.raw[1];
		},
		set: function set(value) {
			this.raw[1] = value;
		}
	}]);
	return Vector2;
}();

var Vector3 = function () {
	createClass(Vector3, null, [{
		key: "angleBetween",
		value: function angleBetween(a, b) {
			var mag = a.magnitude() * b.magnitude();
			var dot = Vector3.dot(a, b);
			return Math.acos(dot / mag);
		}
	}, {
		key: "lerp",
		value: function lerp(a, b, t) {
			var x = a.x + t * (b.x - a.x);
			var y = a.y + t * (b.y - a.y);
			var z = a.z + t * (b.z - a.z);
			return new Vector3(x, y, z);
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
			vec.normalize();
			return vec;
		}
	}, {
		key: "magnitude",
		value: function magnitude(vector) {
			return Math.sqrt(Vector3.dot(vector, vector));
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
			return new Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
		}
	}, {
		key: "subtract",
		value: function subtract(a, b) {
			var n = new Vector3(b.x, b.y, b.z);
			n.negate();
			return Vector3.add(a, n);
		}
	}, {
		key: "multiply",
		value: function multiply(a, scalar) {
			return new Vector3(a.x * scalar, a.y * scalar, a.z * scalar);
		}
	}, {
		key: "divide",
		value: function divide(a, scalar) {
			scalar = 1 / scalar;
			return Vector3.multiply(a, scalar);
		}
	}, {
		key: "dot",
		value: function dot(a, b) {
			return a.x * b.x + a.y * b.y + a.z * b.z;
		}
	}, {
		key: "cross",
		value: function cross(a, b) {
			var x = a.y * b.z - b.y * a.z;
			var y = a.z * b.x - b.z * a.x;
			var z = a.x * b.y - b.x * a.y;
			return new Vector3(x, y, z);
		}
	}, {
		key: "dist",
		value: function dist(a, b) {
			var vec1 = a.x - b.x;
			var vec2 = a.y - b.y;
			var vec3 = a.z - b.z;
			return Math.sqrt(vec1 * vec1 + vec2 * vec2 + vec3 * vec3);
		}
	}]);

	function Vector3() {
		var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
		var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
		var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
		classCallCheck(this, Vector3);

		this.raw = [x, y, z];
	}

	createClass(Vector3, [{
		key: "get",
		value: function get() {
			return new Vector3(this.x, this.y, this.z);
		}
	}, {
		key: "set",
		value: function set(x, y, z) {
			this.x = x;
			this.y = y;
			this.z = z;
		}
	}, {
		key: "multiply",
		value: function multiply(scalar) {
			this.x = this.x * scalar;
			this.y = this.y * scalar;
			this.z = this.z * scalar;
		}
	}, {
		key: "add",
		value: function add(v) {
			this.x = this.x + v.x;
			this.y = this.y + v.y;
			this.z = this.z + v.z;
		}
	}, {
		key: "subtract",
		value: function subtract(v) {
			var n = new Vector3(v.x, v.y, v.z);
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
			this.z = -this.z;
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
			if (this.z > limit) {
				this.z = limit;
			} else if (this.z < 0 && this.z < limit) {
				this.z = -limit;
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
			var pivotVector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Vector3(0, 0);
			var stabilize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

			var mag = this.magnitude();
			var rads = Vector3.degreesToRadians(degrees);
			var cosineAngle = Math.cos(rads);
			var sineAngle = Math.sin(rads);
			this.x = cosineAngle * (this.x - pivotVector.x) + sineAngle * (this.y - pivotVector.y) + pivotVector.x;
			this.y = cosineAngle * (this.y - pivotVector.y) - sineAngle * (this.x - pivotVector.x) + pivotVector.y;
			if (stabilize) {
				this.normalize();
				this.multiply(mag);
			}
		}
	}, {
		key: "magnitude",
		value: function magnitude() {
			return Math.sqrt(Vector3.dot(this, this));
		}
	}, {
		key: "normalize",
		value: function normalize() {
			var m = this.magnitude();
			if (m > 0) {
				this.divide(m);
			}
		}
	}, {
		key: "x",
		get: function get() {
			return this.raw[0];
		},
		set: function set(value) {
			this.raw[0] = value;
		}
	}, {
		key: "y",
		get: function get() {
			return this.raw[1];
		},
		set: function set(value) {
			this.raw[1] = value;
		}
	}, {
		key: "z",
		get: function get() {
			return this.raw[2];
		},
		set: function set(value) {
			this.raw[2] = value;
		}
	}]);
	return Vector3;
}();

var Matrix3 = function () {
	function Matrix3() {
		var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [1, 0, 0, 0, 1, 0, 0, 0, 1];
		classCallCheck(this, Matrix3);

		this.raw = new Float32Array(array);
	}

	createClass(Matrix3, [{
		key: "setMatrix",
		value: function setMatrix(array) {
			this.raw = array;
		}
	}, {
		key: "multiply",
		value: function multiply(matrix) {
			var newMatrix = Matrix3.multiply(this, matrix);
			this.raw = newMatrix.raw;
		}
	}, {
		key: "column1",
		get: function get() {
			return [this.raw[0], this.raw[3], this.raw[6]];
		},
		set: function set(array) {
			this.raw[0] = array[0];
			this.raw[3] = array[1];
			this.raw[6] = array[2];
		}
	}, {
		key: "column2",
		get: function get() {
			return [this.raw[1], this.raw[4], this.raw[7]];
		},
		set: function set(array) {
			this.raw[1] = array[0];
			this.raw[4] = array[1];
			this.raw[7] = array[2];
		}
	}, {
		key: "column3",
		get: function get() {
			return [this.raw[2], this.raw[5], this.raw[8]];
		},
		set: function set(array) {
			this.raw[2] = array[0];
			this.raw[5] = array[1];
			this.raw[68] = array[2];
		}
	}, {
		key: "row1",
		get: function get() {
			return [this.raw[0], this.raw[1], this.raw[2]];
		},
		set: function set(array) {
			this.raw[0] = array[0];
			this.raw[1] = array[1];
			this.raw[2] = array[2];
		}
	}, {
		key: "row2",
		get: function get() {
			return [this.raw[3], this.raw[4], this.raw[5]];
		},
		set: function set(array) {
			this.raw[3] = array[0];
			this.raw[4] = array[1];
			this.raw[5] = array[2];
		}
	}, {
		key: "row3",
		get: function get() {
			return [this.raw[6], this.raw[7], this.raw[8]];
		},
		set: function set(array) {
			this.raw[6] = array[0];
			this.raw[7] = array[1];
			this.raw[8] = array[2];
		}
	}], [{
		key: "dot",
		value: function dot(a, b) {
			var dots = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
			console.log(dots);
			return dots;
		}
	}, {
		key: "multiply",
		value: function multiply(a, b) {
			var matrix = new Float32Array(9);
			matrix[0] = Matrix3.dot(a.column1, b.row1);
			matrix[1] = Matrix3.dot(a.column2, b.row1);
			matrix[2] = Matrix3.dot(a.column3, b.row1);
			matrix[3] = Matrix3.dot(a.column1, b.row2);
			matrix[4] = Matrix3.dot(a.column2, b.row2);
			matrix[5] = Matrix3.dot(a.column3, b.row2);
			matrix[6] = Matrix3.dot(a.column1, b.row3);
			matrix[7] = Matrix3.dot(a.column2, b.row3);
			matrix[8] = Matrix3.dot(a.column3, b.row3);
			var newMatrix = new Matrix3();
			newMatrix.setMatrix(matrix);
			return newMatrix;
		}
	}]);
	return Matrix3;
}();

var Matrix4 = function () {
    function Matrix4() {
        var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        classCallCheck(this, Matrix4);

        this.setMatrix(array);
    }

    createClass(Matrix4, [{
        key: "setMatrix",
        value: function setMatrix(array) {
            this.raw = array;
        }
    }, {
        key: "transpose",
        value: function transpose() {
            var row1 = [this.raw[0], this.raw[1], this.raw[2], this.raw[3]];
            var row2 = [this.raw[4], this.raw[5], this.raw[6], this.raw[7]];
            var row3 = [this.raw[8], this.raw[9], this.raw[10], this.raw[11]];
            var row4 = [this.raw[12], this.raw[13], this.raw[14], this.raw[15]];

            this.raw[0] = row1[0];
            this.raw[4] = row1[1];
            this.raw[8] = row1[2];
            this.raw[12] = row1[3];

            this.raw[1] = row2[0];
            this.raw[5] = row2[1];
            this.raw[9] = row2[2];
            this.raw[13] = row2[3];

            this.raw[2] = row3[0];
            this.raw[6] = row3[1];
            this.raw[10] = row3[2];
            this.raw[14] = row3[3];

            this.raw[3] = row4[0];
            this.raw[7] = row4[1];
            this.raw[11] = row4[2];
            this.raw[15] = row4[3];
        }
    }, {
        key: "multiply",
        value: function multiply(matrix) {
            Matrix4.multiply(this, matrix, this);
        }
    }], [{
        key: "dot",
        value: function dot(c1, c2, c3, c4, r1, r2, r3, r4) {
            return c1 * r1 + c2 * r2 + c3 * r3 + c4 * r4;
        }
    }, {
        key: "multiply",
        value: function multiply(a, b) {
            var outputMatrix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Matrix4();

            var matrix = new Float32Array(16);
            //let matrix = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
            matrix[0] = Matrix4.dot(a.raw[0], a.raw[4], a.raw[8], a.raw[12], b.raw[0], b.raw[1], b.raw[2], b.raw[3]);
            matrix[1] = Matrix4.dot(a.raw[1], a.raw[5], a.raw[9], a.raw[13], b.raw[0], b.raw[1], b.raw[2], b.raw[3]);
            matrix[2] = Matrix4.dot(a.raw[2], a.raw[6], a.raw[10], a.raw[14], b.raw[0], b.raw[1], b.raw[2], b.raw[3]);
            matrix[3] = Matrix4.dot(a.raw[3], a.raw[7], a.raw[11], a.raw[15], b.raw[0], b.raw[1], b.raw[2], b.raw[3]);

            matrix[4] = Matrix4.dot(a.raw[0], a.raw[4], a.raw[8], a.raw[12], b.raw[4], b.raw[5], b.raw[6], b.raw[7]);
            matrix[5] = Matrix4.dot(a.raw[1], a.raw[5], a.raw[9], a.raw[13], b.raw[4], b.raw[5], b.raw[6], b.raw[7]);
            matrix[6] = Matrix4.dot(a.raw[2], a.raw[6], a.raw[10], a.raw[14], b.raw[4], b.raw[5], b.raw[6], b.raw[7]);
            matrix[7] = Matrix4.dot(a.raw[3], a.raw[7], a.raw[11], a.raw[15], b.raw[4], b.raw[5], b.raw[6], b.raw[7]);

            matrix[8] = Matrix4.dot(a.raw[0], a.raw[4], a.raw[8], a.raw[12], b.raw[8], b.raw[9], b.raw[10], b.raw[11]);
            matrix[9] = Matrix4.dot(a.raw[1], a.raw[5], a.raw[9], a.raw[13], b.raw[8], b.raw[9], b.raw[10], b.raw[11]);
            matrix[10] = Matrix4.dot(a.raw[2], a.raw[6], a.raw[10], a.raw[14], b.raw[8], b.raw[9], b.raw[10], b.raw[11]);
            matrix[11] = Matrix4.dot(a.raw[3], a.raw[7], a.raw[11], a.raw[15], b.raw[8], b.raw[9], b.raw[10], b.raw[11]);

            matrix[12] = Matrix4.dot(a.raw[0], a.raw[4], a.raw[8], a.raw[12], b.raw[12], b.raw[13], b.raw[14], b.raw[15]);
            matrix[13] = Matrix4.dot(a.raw[1], a.raw[5], a.raw[9], a.raw[13], b.raw[12], b.raw[13], b.raw[14], b.raw[15]);
            matrix[14] = Matrix4.dot(a.raw[2], a.raw[6], a.raw[10], a.raw[14], b.raw[12], b.raw[13], b.raw[14], b.raw[15]);
            matrix[15] = Matrix4.dot(a.raw[3], a.raw[7], a.raw[11], a.raw[15], b.raw[12], b.raw[13], b.raw[14], b.raw[15]);
            //console.log(outputMatrix);
            outputMatrix.setMatrix(matrix);
            return outputMatrix;
        }
    }]);
    return Matrix4;
}();

// export Behaviors from "./Behaviors";

exports.Vector2 = Vector2;
exports.Vector3 = Vector3;
exports.Matrix3 = Matrix3;
exports.Matrix4 = Matrix4;

}((this.Vexr = this.Vexr || {})));

//# sourceMappingURL=vexr.map
