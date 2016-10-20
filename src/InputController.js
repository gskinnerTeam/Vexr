import Vector2 from "./Vector2";

export default class InputController {
	constructor() {
		this.keyMap = {};
		this.mousePos = new Vector2();
	}
	bindEvents() {
		document.addEventListener("mousedown", this.setMouseDown.bind(this));
		document.addEventListener("mousemove", this.setMousePos.bind(this));
		onkeydown = onkeyup = this.mapKeys.bind(this);
	}
	unbindEvents() {
		document.removeEventListener("mousedown", this.setMouseDown.bind(this));
		document.removeEventListener("mousemove", this.setMousePos.bind(this));
		onkeydown = onkeyup = null;
	}
	setMousePos(e) {
		this.mousePos.set(e.pageX, e.pageY);
		console.log(this.mousePos);
	}
	setMouseDown(e) {
		console.log(e);
	}
	mapKeys (e) {
		e = e || event;
		this.keyMap[e.key] = e.type == 'keydown';
	}
	keyUp(key) {
		console.log(key);
	}
	keyDown(key) {
		console.log(key);
	}
	setKeys () {
		for(var key in this.keyMap){
			if(this.keyMap[key]) {
				this.keyDown(key);
			} else {
				this.keyUp(key);
			}
		}
	}
}
