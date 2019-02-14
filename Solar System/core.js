let sun;

let sunGFX;

function setup() {
	createCanvas(640, 480, WEBGL);

	sunGFX = loadImage("./Solar System/textures/sun.jpg");
	sun = new Planet(50, 0, 0, sunGFX);
	sun.spawnMoons(1, 1);
}

function draw() {
	background(0);
	sun.show();
	sun.orbit();
}