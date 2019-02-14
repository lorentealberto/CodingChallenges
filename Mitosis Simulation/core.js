let cells = [];

function setup() {
	createCanvas(640, 480);
	cells.push(new Cell());
}
function draw() {
	background(200);
	for(let i = 0; i < cells.length; i++) {
		cells[i].move();
		cells[i].show();
	}
}

function mousePressed() {
	for(let i = cells.length - 1; i >= 0; i--) {
		if(cells[i].clicked(mouseX, mouseY)) {
			cells.push(cells[i].mitosis());
			cells.push(cells[i].mitosis());
			cells.splice(i, 1);
		}
	}
}

function Cell(_position, _radius, _color) {
	if(_position) {
		this.position = _position.copy();
	} else {
		this.position = createVector(random(width), random(height));
	}

	this.radius = _radius || 60;
	this.color = _color || color(random(100, 255), 0, random(100, 255), 100);
	
	this.show = function() {
		noStroke();
		fill(this.color);
		ellipse(this.position.x, this.position.y, this.radius, this.radius);
	}
	
	this.move = function() {
		let vel = p5.Vector.random2D();
		this.position.add(vel);
	}
	
	this.mitosis = function() {
		//this.position.x += random(-this.radius, this.radius);
		let cell = new Cell(this.position, this.radius * 0.8, this.color);
		return cell;
	}
	
	this.clicked = function(_x, _y) {
		let d = dist(this.position.x, this.position.y, _x, _y);
		if(d < this.radius) {
			return true;
		}
		
		return false;
	}
}