/**Autor: Alberto E. Lorente
 * Digital Toyz
 * Starfield
 */

//Define un vector de 800 estrellas
let stars = new Array(800);

//Constructor de P5
function setup() {
    //Crea el canvas, ventana donde se verá el script
    createCanvas(800, 800);

    //Rellena el vector creado anteriormente con estrellas
    for(let i = 0; i < stars.length; i++) {
        stars[i] = new  Star();
    }
}

//Función que se repite indefinidamente
function draw() {
    background(0); //Color del fondo
    
	/**Pone el punto de origen en el centro de la pantalla para que las estrellas
	salgan de ahí*/
    translate(width / 2, height / 2);

    //Actualiza y dibuja todas las estrellas que haya en el vector de estrellas
    for(let i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].draw();
    }
}

/*Clase que representa una estrella*/
function Star() {
    //Establece una posición aleatoria
	this.pos = {
		x: Math.random() * (width * 2) - width,
		y: Math.random() * (height * 2) - height,
		z: Math.random() * width
	};

	//Punto donde se encontraba anteriormente z
    this.pz = this.z;

	/*Función que actualiza la estrella*/
    this.update = function() {
        this.pos.z -= 20; //Decrementa la posición z
        if(this.pos.z < 1) { //Comprueba que Z sea mayor a 1
            //Si Z es menor que uno, significa que la estrella ha salido de la pantalla
			//Por lo que es necesario volver a asignarla una nueva posición
			this.pos.z = width;
            this.pos.x = Math.random() * (width * 2) - width;
            this.pos.y = Math.random() * (height * 2) - height;
            
			this.pz = this.pos.z;
        }
    }

	/*Función que dibuja la estrella en su posición
	También se dibuja una línea que representa el movimiento de la estrella*/
    this.draw = function() {
        let sx = map(this.pos.x / this.pos.z, 0, 1, 0, width);
        let sy = map(this.pos.y / this.pos.z, 0, 1, 0, height);

        fill(255);
        noStroke();

        let r = map(this.pos.z, 0, width, 16, 0);
        ellipse(sx, sy, r, r);

        let px = map(this.pos.x / this.pz, 0, 1, 0, width);
        let py = map(this.pos.y / this.pz, 0, 1, 0, height);
        stroke(255);
        line(px, py, sx, sy);
    }
}