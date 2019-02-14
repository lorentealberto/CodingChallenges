function Food() {
	
	this.draw = function() {
		fill(255, 0, 100);
		rect(this.position.x, this.position.y, scl, scl);
	}
	
	this.pickLocation = function() {
		let cols = floor(width / scl);
		let rows = floor(height / scl);
		this.position = createVector(floor(random(cols)), floor(random(rows)));
		this.position.mult(scl);
	}
}