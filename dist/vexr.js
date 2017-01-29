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

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
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

var Convert = function () {
    function Convert() {
        classCallCheck(this, Convert);
    }

    createClass(Convert, null, [{
        key: "RadiansToDegrees",
        value: function RadiansToDegrees(radians) {
            return radians * (180 / Math.PI);
        }
    }, {
        key: "DegreesToRadians",
        value: function DegreesToRadians(degrees) {
            return degrees * (Math.PI / 180);
        }
    }, {
        key: "MapRange",
        value: function MapRange(value, bottomA, topA, bottomB, topB) {
            return bottomB + (topB - bottomB) * (value - bottomA) / (topA - bottomA);
        }
    }]);
    return Convert;
}();

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
		value: function set() {
			var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
			var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

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
			var rads = Convert.degreesToRadians(degrees);
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
	}, {
		key: "z",
		get: function get() {
			return 0;
		}
	}]);
	return Vector2;
}();

var Vector3 = function () {
	createClass(Vector3, null, [{
		key: "reset",
		value: function reset(v) {
			v.set(0, 0, 0);
		}
	}, {
		key: "angleBetween",
		value: function angleBetween(a, b) {
			var mag = a.magnitude() * b.magnitude();
			var dot = Vector3.dot(a, b);
			return Math.acos(dot / mag);
		}
	}, {
		key: "lerp",
		value: function lerp(a, b, t) {
			var v = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new Vector3();

			v.set(a.x + t * (b.x - a.x), a.y + t * (b.y - a.y), a.z + t * (b.z - a.z));
			return v;
		}
	}, {
		key: "normalize",
		value: function normalize(vector) {
			var v = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Vector3();

			var vec = vector.get(v);
			vec.normalize();
			return vec;
		}
	}, {
		key: "magnitude",
		value: function magnitude(vector) {
			return Math.sqrt(Vector3.dot(vector, vector));
		}
	}, {
		key: "add",
		value: function add(a, b) {
			var v = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Vector3();

			v.set(a.x + b.x, a.y + b.y, a.z + b.z);
			return v;
		}
	}, {
		key: "subtract",
		value: function subtract(a, b) {
			var v = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Vector3();

			v.set(a.x - b.x, a.y - b.y, a.z - b.z);
			return v;
		}
	}, {
		key: "multiply",
		value: function multiply(a, scalar) {
			var v = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Vector3();

			v.set(a.x * scalar, a.y * scalar, a.z * scalar);
			return v;
		}
	}, {
		key: "divide",
		value: function divide(a, scalar) {
			var v = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Vector3();

			v.set(a.x * scalar, a.y * scalar, a.z * scalar);
			return v;
		}
	}, {
		key: "dot",
		value: function dot(a, b) {
			return a.x * b.x + a.y * b.y + a.z * b.z;
		}
	}, {
		key: "cross",
		value: function cross(a, b) {
			var v = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Vector3();

			v.set(a.y * b.z - b.y * a.z, a.z * b.x - b.z * a.x, a.x * b.y - b.x * a.y);
			return v;
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
			var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Vector3();

			v.set(this.x, this.y, this.z);
			return v;
		}
	}, {
		key: "set",
		value: function set() {
			var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
			var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
			var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

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
			var pivotVector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Vector3();
			var stabilize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

			var mag = this.magnitude();
			var rads = Convert.degreesToRadians(degrees);
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

var hexString = "0123456789abcdef";

var Generate = function () {
    function Generate() {
        classCallCheck(this, Generate);
    }

    createClass(Generate, null, [{
        key: "randomHexString",
        value: function randomHexString(length) {
            var bytes = "";
            for (var i = 0; i < length; i++) {
                bytes += hexString.substr(Math.floor(Math.random() * hexString.length), 1);
            }
            return bytes;
        }
    }, {
        key: "UUID",
        value: function UUID() {
            return Generate.randomHexString(7) + "-" + Generate.randomHexString(4) + "-" + Generate.randomHexString(4) + "-" + Generate.randomHexString(4) + "-" + Generate.randomHexString(4) + "-" + Generate.randomHexString(12);
        }
    }]);
    return Generate;
}();

var pools = new Object();
var objectPool = new Object();
var usagePool = new Object();
var clean = new Object();

var Pool = function () {
    function Pool() {
        classCallCheck(this, Pool);
    }

    createClass(Pool, null, [{
        key: "allocate",
        value: function allocate(object, objectKey, number) {
            var cleaner = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (item) {
                return item;
            };


            if (object.hasOwnProperty("prototype")) {
                pools[objectKey] = {
                    object: object,
                    objectKey: objectKey,
                    amount: number,
                    cleaner: cleaner
                };
                clean[objectKey] = cleaner;
                usagePool[objectKey] = [];
                objectPool[objectKey] = [];
                for (var i = 0; i < number; i++) {
                    var instance = new object();
                    instance.v_pool_index = i;
                    instance.v_pool_key = objectKey;
                    usagePool[objectKey][i] = false;
                    objectPool[objectKey][i] = instance;
                }
                return objectPool[objectKey];
            } else {
                throw new Error("Object must have a constructor");
            }
        }
    }, {
        key: "deallocate",
        value: function deallocate(objectKey) {
            var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (Pool.referencesInPool(objectKey) == 0 || force == true) {
                delete clean[objectKey];
                delete usagePool[objectKey];
                delete objectPool[objectKey];
                delete pools[objectKey];
            } else {
                console.warn("You still have objects in this pool checked out. Return them and call deallocate. Or use deallocate(key, true) to force deallocation.");
            }
        }
    }, {
        key: "referencesInPool",
        value: function referencesInPool(objectKey) {
            return pools[objectKey].amount - Pool.poolsize(objectKey);
        }
    }, {
        key: "poolsize",
        value: function poolsize(objectKey) {
            return objectPool[objectKey].filter(Pool.notInUse).length;
        }
    }, {
        key: "inUse",
        value: function inUse(object) {
            return usagePool[object.v_pool_key][object.v_pool_index];
        }
    }, {
        key: "notInUse",
        value: function notInUse(object) {
            return !usagePool[object.v_pool_key][object.v_pool_index];
        }
    }, {
        key: "returnAll",
        value: function returnAll(objectKey) {
            var objects = objectPool[objectKey].filter(Pool.inUse);
            for (var i = 0; i < objects.length; i++) {
                Pool.returnObject(objects[i]);
            }
        }
    }, {
        key: "getObject",
        value: function getObject(objectKey) {
            var i = usagePool[objectKey].indexOf(false);
            usagePool[objectKey][i] = true;
            if (i > -1) {
                return objectPool[objectKey][i];
            } else {
                throw new Error("Out of objects");
            }
        }
    }, {
        key: "returnObject",
        value: function returnObject(obj) {
            clean[obj.v_pool_key](obj);
            usagePool[obj.v_pool_key][obj.v_pool_index] = false;
        }
    }, {
        key: "returnObjects",
        value: function returnObjects(objs) {
            for (var i = 0; i < objs.length; i++) {
                Pool.returnObject(objs[i]);
            }
        }
    }, {
        key: "Pools",
        get: function get() {
            return pools;
        }
    }]);
    return Pool;
}();

var key = Generate.UUID();

var Behavior = function () {
	function Behavior() {
		classCallCheck(this, Behavior);
	}

	createClass(Behavior, null, [{
		key: "init",
		value: function init() {
			Pool.allocate(Vector3, key, 10, Vector3.reset);
		}
	}, {
		key: "seek",
		value: function seek(actor, targetPosition) {
			var scaleForce = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

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
	}, {
		key: "arrive",
		value: function arrive(actor, target) {
			var power = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;
			var scaleForce = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

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
	}, {
		key: "avoidAll",
		value: function avoidAll(actor, obstacles) {
			var avoidRadius = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 80;
			var scaleForce = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

			var difference = Pool.getObject(key);
			var steer = Pool.getObject(key);
			var total = Pool.getObject(key);
			var count = 0;
			for (var o = 0; o < obstacles.length; o++) {
				var obstacle = obstacles[o];
				var distance = Vector3.dist(actor.location, obstacle.location);
				if (distance > 0 && distance < avoidRadius && actor.id != obstacle.id) {
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
	}, {
		key: "avoid",
		value: function avoid(actor, target, avoidRadius) {
			this.avoidAll(actor, [target], avoidRadius);
		}
	}, {
		key: "constrain",
		value: function constrain(actor, minWidth, minHeight, maxWidth, maxHeight) {
			var margin = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

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
	}, {
		key: "wrap",
		value: function wrap(actor, minWidth, minHeight, maxWidth, maxHeight) {
			var margin = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

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
	}, {
		key: "disableOutside",
		value: function disableOutside(actor, minWidth, minHeight, maxWidth, maxHeight) {
			var margin = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

			minWidth -= margin;
			maxWidth += margin;
			minHeight -= margin;
			maxHeight += margin;

			if (actor.location.x < minWidth || actor.location.y < minHeight || actor.location.x > maxWidth || actor.location.y > maxHeight) {
				actor.active = false;
				actor.visible = false;
			}
		}
	}, {
		key: "destroyOutside",
		value: function destroyOutside(actor, minWidth, minHeight, maxWidth, maxHeight) {
			var margin = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

			minWidth -= margin;
			maxWidth += margin;
			minHeight -= margin;
			maxHeight += margin;
			if (actor.location.x < minWidth || actor.location.y < minHeight || actor.location.x > maxWidth || actor.location.y > maxHeight) {
				actor.dead = true;
			}
		}
	}]);
	return Behavior;
}();

Behavior.init();

var Actor = function () {
	function Actor(className) {
		var location = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Vector3(0, 0, 0);
		classCallCheck(this, Actor);

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
		this.parent = null;
		this.children = [];
	}

	createClass(Actor, [{
		key: "addForce",
		value: function addForce(vector) {
			this.acceleration.add(vector);
		}
	}, {
		key: "update",
		value: function update() {
			if (this.active) {
				this.move();
				this.velocity.add(this.acceleration);
				this.location.add(this.velocity);
				this.acceleration.set(0, 0, 0);
			}
		}
	}, {
		key: "move",
		value: function move() {}
	}, {
		key: "render",
		value: function render() {
			if (this.visible) {
				this.draw();
			}
		}
	}, {
		key: "draw",
		value: function draw() {
			// override this function win your drawing code
		}
	}, {
		key: "destroy",
		value: function destroy() {
			this.dead = true;
			for (var i = 0; i < this.children.length; i++) {
				this.children[i].destroy();
			}
		}
	}]);
	return Actor;
}();

var DOMActor = function (_Actor) {
	inherits(DOMActor, _Actor);

	function DOMActor(className, location) {
		classCallCheck(this, DOMActor);

		var _this = possibleConstructorReturn(this, (DOMActor.__proto__ || Object.getPrototypeOf(DOMActor)).call(this, className, location));

		_this.element = document.createElement("div");
		_this.element.classList.add("actor");
		_this.element.classList.add(className);
		_this.parentElement = null;
		return _this;
	}

	createClass(DOMActor, [{
		key: "addToParentElement",
		value: function addToParentElement(parentElement) {
			this.parentElement = parentElement;
			this.parentElement.appendChild(this.element);
		}
	}, {
		key: "draw",
		value: function draw() {
			this.element.style.transform = "translateX(" + this.location.x + "px) translateY(" + this.location.y + "px) rotate(" + this.angle + "deg)";
		}
	}, {
		key: "destroy",
		value: function destroy() {
			this.dead = true;
			this.element.remove();
			this.parentElement = null;
		}
	}]);
	return DOMActor;
}(Actor);

var GameLoop = function () {
	function GameLoop() {
		classCallCheck(this, GameLoop);

		this.gameObjects = [];
		this.controller = [];
	}

	createClass(GameLoop, [{
		key: "setController",
		value: function setController(inputController) {
			this.controller.push(inputController);
		}
	}, {
		key: "getType",
		value: function getType(type) {
			var matches = [];
			for (var i = 0; i < this.gameObjects.length; i++) {
				if (this.gameObjects[i].type === type) {
					matches.push(this.gameObjects[i]);
				}
			}
			return matches;
		}
	}, {
		key: "update",
		value: function update() {
			this.removeActors();
			for (var i = 0; i < this.gameObjects.length; i++) {
				this.gameObjects[i].update();
			}
		}
	}, {
		key: "addActor",
		value: function addActor(actor) {
			this.gameObjects.push(actor);
		}
	}, {
		key: "removeActors",
		value: function removeActors() {
			for (var i = 0; i < this.gameObjects.length; i++) {
				if (this.gameObjects[i].dead) {
					this.gameObjects.splice(i, 1);
				}
			}
		}
	}, {
		key: "render",
		value: function render() {
			for (var i = 0; i < this.gameObjects.length; i++) {
				this.gameObjects[i].render();
			}
		}
	}, {
		key: "loop",
		value: function loop() {
			this.update();
			this.render();
			window.requestAnimationFrame(this.loop.bind(this));
		}
	}]);
	return GameLoop;
}();

var listeners = {};

var EventLite = function () {
    function EventLite() {
        classCallCheck(this, EventLite);
    }

    createClass(EventLite, null, [{
        key: "on",
        value: function on(event, handler) {
            if (listeners[event] === undefined) {
                listeners[event] = [handler];
            } else {
                listeners[event].push(handler);
            }
            return handler;
        }
    }, {
        key: "off",
        value: function off(event, handler) {
            if (listeners[event]) {
                for (var i = listeners[event].length - 1; i >= 0; i--) {
                    if (listeners[event].length === 1) {
                        delete listeners[event];
                    } else {
                        listeners[event].splice(i, 1);
                        break;
                    }
                }
            }
        }
    }, {
        key: "trigger",
        value: function trigger(event) {
            if (listeners[event]) {
                for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    data[_key - 1] = arguments[_key];
                }

                for (var i = listeners[event].length - 1; i >= 0; i--) {
                    if (listeners[event] !== undefined) {
                        if (typeof listeners[event][i] === "function" && listeners[event][i]) {
                            listeners[event][i](data);
                        } else {
                            throw "Event handler is not a function.";
                        }
                    }
                }
            }
        }
    }, {
        key: "unbindAll",
        value: function unbindAll() {
            for (var event in listeners) {
                delete listeners[event];
            }
            return true;
        }
    }]);
    return EventLite;
}();

var resizeId;
var resizeEvent;

var Screen = function () {
    function Screen() {
        classCallCheck(this, Screen);
    }

    createClass(Screen, null, [{
        key: "resize",
        value: function resize(e) {
            clearTimeout(resizeId);
            resizeEvent = e;
            resizeId = setTimeout(Screen.recalculate, Screen.resizeDelay);
        }
    }, {
        key: "recalculate",
        value: function recalculate() {
            Screen.dimensions.set(window.innerWidth, window.innerHeight);
            if (Screen.dimensions.x > Screen.dimensions.y) {
                Screen.orientation = "landscape";
            } else {
                Screen.orientation = "portrait";
            }
            for (var anchor in Screen.anchors) {
                if (Screen.anchors.hasOwnProperty(anchor)) {
                    Screen.anchorPositions[anchor].set(Screen.anchors[anchor].x * Screen.dimensions.x, Screen.anchors[anchor].y * Screen.dimensions.y);
                }
            }

            EventLite.trigger("resize", resizeEvent);
        }
    }, {
        key: "getAnchor",
        value: function getAnchor(name) {
            return Screen.anchorPositions[name].get();
        }
    }, {
        key: "setAnchor",
        value: function setAnchor(name, ratioX, ratioY) {

            if (Screen.anchors[name] == undefined) {
                Screen.anchors[name] = new Vector3(ratioX, ratioY);
                Screen.anchorPositions[name] = new Vector3(Screen.anchors[name].x * Screen.dimensions.x, Screen.anchors[name].y * Screen.dimensions.y);
            } else {
                Screen.anchors[name].set(ratioX, ratioY);
                Screen.anchorPositions[name].set(Screen.anchors[name].x * Screen.dimensions.x, Screen.anchors[name].y * Screen.dimensions.y);
            }
        }
    }, {
        key: "removeAnchor",
        value: function removeAnchor(name) {
            delete Screen.anchors[name];
            delete Screen.anchorPositions[name];
        }
    }, {
        key: "init",
        value: function init() {
            Screen.resizeDelay = 100;
            Screen.anchors = {};
            Screen.anchorPositions = {};
            Screen.dimensions = new Vector3(window.innerWidth, window.innerHeight);
            Screen.setAnchor("center", 0.5, 0.5);
            if (Screen.dimensions.x > Screen.dimensions.y) {
                Screen.orientation = "landscape";
            } else {
                Screen.orientation = "portrait";
            }
        }
    }, {
        key: "dimensions",
        get: function get() {
            return Screen._dimensions;
        },
        set: function set(value) {
            if (Screen._dimensions != value) {
                Screen._dimensions = value;
            }
        }
    }, {
        key: "orientation",
        get: function get() {
            return Screen._orientation;
        },
        set: function set(value) {
            if (Screen._orientation != value) {
                Screen._orientation = value;
            }
        }
    }, {
        key: "center",
        get: function get() {
            return Screen._center;
        },
        set: function set(value) {
            if (Screen._center != value) {
                Screen._center = value;
            }
        }
    }, {
        key: "resizeDelay",
        get: function get() {
            return Screen._resizeDelay;
        },
        set: function set(value) {
            if (Screen._resizeDelay != value) {
                Screen._resizeDelay = value;
            }
        }
    }, {
        key: "anchors",
        get: function get() {
            return Screen._anchors;
        },
        set: function set(value) {
            if (Screen._anchors != value) {
                Screen._anchors = value;
            }
        }
    }, {
        key: "anchorPositions",
        get: function get() {
            return Screen._anchorPositions;
        },
        set: function set(value) {
            if (Screen._anchorPositions != value) {
                Screen._anchorPositions = value;
            }
        }
    }]);
    return Screen;
}();

Screen.init();

var InputController = function () {
	function InputController() {
		classCallCheck(this, InputController);

		this.keyMap = {};
		this.mousePos = new Vector3();
	}

	createClass(InputController, [{
		key: "bindEvents",
		value: function bindEvents() {
			document.addEventListener("mouseup", this.setMouseUp.bind(this));
			document.addEventListener("mousedown", this.setMouseDown.bind(this));
			document.addEventListener("mousemove", this.setMousePos.bind(this));
			onkeydown = onkeyup = this.mapKeys.bind(this);
		}
	}, {
		key: "unbindEvents",
		value: function unbindEvents() {
			document.removeEventListener("mouseup", this.setMouseUp.bind(this));
			document.removeEventListener("mousedown", this.setMouseDown.bind(this));
			document.removeEventListener("mousemove", this.setMousePos.bind(this));
			onkeydown = onkeyup = null;
		}
	}, {
		key: "setMousePos",
		value: function setMousePos(e) {
			this.mousePos.set(e.pageX, e.pageY);
		}
	}, {
		key: "setMouseUp",
		value: function setMouseUp(e) {
			var fakeKey = {
				key: "mouse" + e.button,
				type: "keyup"
			};
			this.mapKeys(fakeKey);
		}
	}, {
		key: "setMouseDown",
		value: function setMouseDown(e) {
			var fakeKey = {
				key: "mouse" + e.button,
				type: "keydown"
			};
			this.mapKeys(fakeKey);
		}
	}, {
		key: "mapKeys",
		value: function mapKeys(e) {
			e = e || event;
			this.keyMap[e.key] = e.type == 'keydown';
		}
	}, {
		key: "keyUp",
		value: function keyUp(key) {
			console.log(key);
		}
	}, {
		key: "keyDown",
		value: function keyDown(key) {
			console.log(key);
		}
	}, {
		key: "setKeys",
		value: function setKeys() {
			for (var key in this.keyMap) {
				if (this.keyMap[key]) {
					this.keyDown(key);
				} else {
					this.keyUp(key);
				}
			}
		}
	}]);
	return InputController;
}();

exports.Vector2 = Vector2;
exports.Vector3 = Vector3;
exports.Matrix3 = Matrix3;
exports.Matrix4 = Matrix4;
exports.Behaviors = Behavior;
exports.Actor = Actor;
exports.DOMActor = DOMActor;
exports.GameLoop = GameLoop;
exports.Screen = Screen;
exports.InputController = InputController;
exports.EventLite = EventLite;
exports.Pool = Pool;

}((this.Vexr = this.Vexr || {})));

//# sourceMappingURL=vexr.map
