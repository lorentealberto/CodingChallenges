function Planet(_radius, _distance, _orbitSpeed, _img) {
	this.radius = _radius;
	this.angle = random(TWO_PI);
	this.distance = _distance;
	this.orbitSpeed = _orbitSpeed;
	this.v = p5.Vector.random3D();
	this.v.mult(this.distance);

	noStroke();
	noFill();
	this.globe = createShape(SPHERE, this.radius);
	this.globe.setTexture(_img);

	this.show = function() {
		push();
		fill(255);
		noStroke();
		rotate(this.angle);
		translate(this.v.x, this.v.y, this.v.z);
		
		normalMaterial();
		shape(this.globe);
		//sphere(this.radius);
		//ellipse(0, 0, this.radius * 2, this.radius * 2);

		if(this.planets != null) {
			for(let i = 0; i < this.planets.length; i++) {
				this.planets[i].show();
			}
		}
		pop();
	}

	this.orbit = function() {
		this.angle += this.orbitSpeed;
		if(this.planets != null) {
			for(let i = 0; i < this.planets.length; i++) {
				this.planets[i].orbit();
			}
		}
	}

	this.spawnMoons = function(total, level) {
		this.planets = new Array(total);
		for(let i = 0; i < this.planets.length; i++) {
			let radius = this.radius / (level * 2);
			let distance = random(this.radius + radius, (this.radius + radius) * 2);
			let orbitSpeed = random(-0.1, 0.1);
			this.planets[i] = new Planet(radius, distance, orbitSpeed);
			if(level < 1) {
				let num = 1;
				this.planets[i].spawnMoons(num, level + 1);

			}
		
		}
	}
}