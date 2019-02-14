let drop;

function setup() {
	createCanvas(640, 360);
	drop = new Array(100);
	for(let i = 0; i < drop.length; i++) {
		drop[i] = new Drop();
	}
}

function draw() {
	background(230, 230, 250);
	
	for(let i = 0; i < drop.length; i++) {
		drop[i].fall();
		drop[i].show();
	}
}

function Drop() {
	this.x = random(width);
	this.y = random(-500, -50);
	this.z = random(0, 20);
	this.len = map(this.z, 0, 20, 10, 20);
	
	this.ySpeed = map(this.z, 0, 20, 1, 20);
	
	this.fall = function() {
		this.y += this.ySpeed;
		
		let gravity = map(this.z, 0, 20, 0, 0.2);
		this.ySpeed += gravity;
		
		if(this.y > height) {
			this.y = random(-500, -50);
			this.ySpeed = map(this.z, 0, 20, 4, 10);
		}
	}
	
	this.show = function() {
		let thick = map(this.z, 0, 20, 1, 3);
		strokeWeight(thick);
		stroke(138, 43, 226);
		line(this.x, this.y, this.x, this.y + this.len);
	}
}