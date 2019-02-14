function Flower(_x, _y) {
	this.x = _x;
	this.y = _y;
	this.r = 30;
	
	this.xDir = 1;
	
	this.draw = function(){
		noStroke();
		fill(255, 0, 200, 150);
		ellipse(this.x, this.y, this.r * 2, this.r * 2);
	}
	
	this.grow = function() {
		this.r += 2;
	}
	
	this.move = function() {
		this.x += this.xDir;
	}
	
	this.shiftDown = function() {
		this.xDir *= -1;
		this.y += this.r;
	}
}