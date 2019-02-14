function Ship() {
	this.x = width / 2;
	this.dir = 0;
	
	this.draw = function(){
		fill(255);
		rectMode(CENTER);
		rect(this.x, height - 20, 20, 20);
	}
	
	this.move = function() {
		this.x += this.dir * 5;
	}
	
	this.setDir = function(dir) {
		this.dir = dir;
	}
}