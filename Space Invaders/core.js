let ship;
let flowers = [];
let drops = [];

function setup() {
	createCanvas(600, 400);
	ship = new Ship();
	
	for(let i = 0; i < 6; i++) {
		flowers[i] = new Flower(i * 80 + 80, 60);
	}
}
function draw() {
	background(51);
	
	ship.draw();
	ship.move();
	
	let side = false;
	for(let i = 0; i < flowers.length; i++) {
		flowers[i].draw();
		flowers[i].move();
		if(flowers[i].x < 0 || flowers[i].x > width) {
			side = true;
		}
	}
	
	if(side) {
		for(let i = 0; i < flowers.length; i++) {
			flowers[i].shiftDown();
		}
	}
	
	for(let i = 0; i < drops.length; i++) {
		drops[i].draw();
		drops[i].move();
		for(let j = 0; j < flowers.length; j++) {
			if(drops[i].hits(flowers[j])) {
				flowers[j].grow();
				drops[i].evaporate();
			}
		}
	}
	
	for(let i = drops.length - 1; i >= 0; i--) {
		if(drops[i].toDelete) {
			drops.splice(i, 1);
		}
	}
}

function keyReleased() {
	if(key != " ") {
		ship.setDir(0);
	}
}

function keyPressed() {
	if(key == " ") {
		drops.push(new Drop(ship.x, height));
	}

	if(keyCode === RIGHT_ARROW) {
		ship.setDir(1);
	} else if(keyCode === LEFT_ARROW) {
		ship.setDir(-1);
	}
}