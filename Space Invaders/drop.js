function Drop(_x, _y) {
	this.x = _x;
	this.y = _y;
	this.r = 8;
	this.toDelete = false;
	
	this.draw = function() {
		noStroke();
		fill(150, 0, 255);
		
		ellipse(this.x, this.y, this.r * 2, this.r * 2);
	}
	
	this.move = function() {
		this.y -= 5;
	}
	
	this.hits = function(flower) {
		let d = dist(this.x, this.y, flower.x, flower.y);
		
		if(d < this.r + flower.r) {
			return true;
		}
		
		return false;
	}
	
	this.evaporate = function() {
		this.toDelete = true;
	}
}