export default class GameLoop {
	constructor() {
		this.gameObjects = [];
		this.inputState = null;
		this.controller = [];
	}

	setController(inputController) {
		this.controller.push(inputController);
	}

	getType(type) {
		var matches = [];
		for (var i = 0; i < this.gameObjects.length; i++) {
			if (this.gameObjects[i].type === type) {
				matches.push(this.gameObjects[i]);
			}
		}
		return matches;
	}

	update() {
		if(this.controller != null) {
			this.inputState = this.controller.keyMap;
		}
		this.removeActors();
		for (var i = 0; i < this.gameObjects.length; i++) {
			this.gameObjects[i].update();
		}
	}

	addActor(actor) {
		this.gameObjects.push(actor);
	}

	removeActors() {
		for (var i = 0; i < this.gameObjects.length; i++) {
			if(this.gameObjects[i].dead) {
				this.gameObjects.splice(i, 1);
			}
		}
	}

	render() {
		for (var i = 0; i < this.gameObjects.length; i++) {
			this.gameObjects[i].render();
		}
	}

	loop() {
		this.update();
		this.render();
		window.requestAnimationFrame(this.loop.bind(this));
	}
}