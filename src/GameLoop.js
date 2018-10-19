export default class GameLoop {
	constructor() {
		this.gameObjects = [];
		this.controller = [];
		this.start = Date.now();
		this.deltaTime = 0;
		this.lastTime = 0;
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
		let time = Date.now() - this.start();
		this.deltaTime = time - this.lastTime;
		this.lastTime = time;
		this.update(this.deltaTime);
		this.render();
		window.requestAnimationFrame(this.loop.bind(this));
	}
}