import Vector3 from "./Vector3";

export default class InputController {
	constructor() {
		this.keyMap = {};
		this.mousePos = new Vector3();
	}

	bindEvents() {
		document.addEventListener("mouseup", this.setMouseUp.bind(this));
		document.addEventListener("mousedown", this.setMouseDown.bind(this));
		document.addEventListener("mousemove", this.setMousePos.bind(this));
		onkeydown = onkeyup = this.mapKeys.bind(this);
	}

	unbindEvents() {
		document.removeEventListener("mouseup", this.setMouseUp.bind(this));
		document.removeEventListener("mousedown", this.setMouseDown.bind(this));
		document.removeEventListener("mousemove", this.setMousePos.bind(this));
		onkeydown = onkeyup = null;
	}

	setMousePos(e) {
		this.mousePos.set(e.pageX, e.pageY);
	}

	setMouseUp(e) {
		var fakeKey = {
			key: "mouse" + e.button,
			type: "keyup"
		};
		this.mapKeys(fakeKey)
	}

	setMouseDown(e) {
		var fakeKey = {
			key: "mouse" + e.button,
			type: "keydown"
		};
		this.mapKeys(fakeKey)
	}

	mapKeys(e) {
		e = e || event;
		this.keyMap[e.key] = e.type == 'keydown';
	}

	keyUp(key) {
		console.log(key);
	}

	keyDown(key) {
		console.log(key);
	}

	setKeys() {
		for (var key in this.keyMap) {
			if (this.keyMap[key]) {
				this.keyDown(key);
			} else {
				this.keyUp(key);
			}
		}
	}
}
