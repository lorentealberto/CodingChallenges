let snake;
let scl = 20;
let food;

function setup() {
	createCanvas(600, 600);
	snake = new Snake();
	food = new Food();
	food.pickLocation();
	frameRate(10);
}

function draw() {
	background(51);
	
	snake.death();
	snake.update();
	snake.show();
	
	food.draw();
	
	if(snake.eat(food)) {
		food.pickLocation();
	}
}

function keyPressed() {
	if(keyCode === UP_ARROW) {
		snake.dir(0, -1);
	} else if(keyCode === DOWN_ARROW) {
		snake.dir(0, 1);
	} else if(keyCode === LEFT_ARROW) {
		snake.dir(-1, 0);
	} else if(keyCode === RIGHT_ARROW) {
		snake.dir(1, 0);
	}
}
