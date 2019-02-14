function Snake() {
	this.x = 0;
	this.y = 0;
	this.xSpeed = 1;
	this.ySpeed = 0;
	this.total = 1;
	this.tail = [];
	
	this.update = function() {
		if(this.total === this.tail.length) {
			for(let i = 0; i < this.tail.length; i++) {
				this.tail[i] = this.tail[i + 1];
			}
		}
		this.tail[this.total - 1] = createVector(this.x, this.y);
		
		
		this.x += this.xSpeed * scl;
		this.y += this.ySpeed * scl;
		
		this.x = constrain(this.x, 0, width - scl);
		this.y = constrain(this.y, 0, height - scl);
	}
	
	this.death = function() {
		for(let i = 0; i < this.tail.length; i++) {
			let pos = this.tail[i];
			let d = dist(this.x, this.y, pos.x, pos.y);
			
			if(d < 1) {
				this.total = 1;
				this.tail = [];
			}
		}
	}
	
	this.show = function() {
		fill(255);
		for(let i = 0; i < this.total; i++) {
			rect(this.tail[i].x, this.tail[i].y, scl, scl);
		}
	}
	
	this.dir = function(xSpeed, ySpeed) {
		this.xSpeed = xSpeed;
		this.ySpeed = ySpeed;
	}
	
	this.eat = function(food) {
		let d = dist(this.x, this.y, food.position.x, food.position.y);
		if(d < 1) {
			this.total++;
			return true;
		} else {
			return false;
		}
	}
}
