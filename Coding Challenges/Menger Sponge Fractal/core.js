/**Autor: Alberto E. Lorente
	DigitalToyz - 2019
*/

let a = 0; //Ángulo del cubo
let sponge = new Array(); //Vector de cubos

function setup() {
	//Se crea un nuevo lienzo y se establece el método de renderizado
	createCanvas(400, 400, WEBGL);
	
	/*Se aplica el material normal, ya que en la versión actual no se aplica
	por defecto*/
	normalMaterial();
	
	//Crea una nueva caja en el centro de la pantalla con un tamaño de 200
	let b = new Box(0, 0, 0, 200);
	//Mete la caja creada anteriormente en el vector creado anteriormente
	sponge.push(b);
}

function draw() {
	background(51); //Color de fondo
	
	//Rota la esponja a la velocidad especificada anteriormente
	rotateX(a);
	rotateY(a * 0.4);
	rotateZ(a * 0.1);
	
	//Muestra todas las cajas que haya en el array
	for(let i = 0; i < sponge.length; i++) {
		sponge[i].show();
	}
	
	/*Incremenet el ángulo de rotación para que para que parezca una animación*/
	a += 0.01;
}
	

/*Función que genera nuevas cajas a partir de las anteriores cada vez que se
hace click*/
function mousePressed() {
	//Crea un nuevo array
	let next = new Array();
	//Recorre el array anterior
	for(let i = 0; i < sponge.length; i++) {
		let b = sponge[i]; //Obtiene una de las cajas que esté en el array
		let newBoxes = b.generate();//Crea las nuevas cajas
		next = next.concact(newBoxes);//Une esas nuevas cajas a las creadas anteriormente
	}
	sponge = next; //Sustituye el array viejo con el nuevo
}

/**Objeto que representa una caja
param x: Posición X de la caja
param y: Posición Y de la caja
param z: Posición Z de la caja
param tam: Tamaño de la caja*/
function Box(x, y, z, tam) {
	this.pos = createVector(x, y, z);
	this.tam = tam;
	
	/*Por cada caja que haya actulmente en el vector de cajas, genera 3 nuevas
		cajas con un tamaño inferior. Estas nuevas cajas también las posiciona
		en la posición adecuada*/
	this.generate = function() {
		let boxes = new Array();
		
		for(let x = -1; x < 2; x++) {//Recorre tres veces la posición X
			for(let y = -1; y < 2; y++) { //Recorre tres veces la posición Y
				for(let z = -1; z < 2; z++) { //Recorre tres veces la posición Z
					let sum = abs(x) + abs(y) + abs(z); //Suma los valores absolutos de las posiciones
					let newTam = this.tam / 3; //Establece un nuevo tamaño para la caja de un 33% del que tenía la original
					
					if(sum > 1) { //Se añaden todas las cajas excepto la del centro
						let b = new Box(this.pos.x + x + newTam, this.pos.y + y + newTam, this.pos.z + z + newTam, newTam);
					}
				}
			}
		}
		return boxes;
	}
	
	//Muestra las cajas
	this.show = function() {
		push();
		translate(this.pos.x, this.pos.y, this.pos.z);
		box(this.tam);
		pop();
	}
}