/*Autor: Alberto E. Lorente
	DigitalToyz
	06/02/2019*/
	
//Se crean los objetos necesarios
let marker = new Marker();
let player = new Player();
let ball = new Ball(marker);
let ai = new AI(ball);

//Crea el canvas
function setup() {
	createCanvas(320, 240);
}

//Actualiza y dibuja todos los elementos en la pantalla
function draw() {
	//Limpia el color de fondo y lo dibuja negro
	background(0);
	
	//Dibuja y controla al jugar
	player.draw();
	player.controls();
	
	//Dibuja y actualiza la IA
	ai.draw();
	ai.update();
	
	//Dibuja y actualiza la pelota
	ball.draw();
	ball.update();
	
	//Dibuja la línea del medio, sólo sirve como decoración
	middleLine();
	
	//Dibuja el marcador
	marker.draw();
	
	//Compruebas las colisiones entre la pelota y las palas
	if(checkCollision(player, ball)) {
		ball.bounds.x = ball.bounds.d / 2 + player.bounds.x + player.bounds.w;
		ball.maxSpeed.x *= -1;
	} else if(checkCollision(ai, ball)) {
		ball.bounds.x = ai.bounds.x - ball.bounds.d / 2;
		ball.maxSpeed.x *= -1;
	}
}

//Comprueba las colisiones. Devuelve false si no hay calisión y true si sí.
function checkCollision(paddle, ball) {
	if(ball.bounds.x + ball.bounds.d / 2 < paddle.bounds.x ||
		ball.bounds.x - ball.bounds.d / 2 > paddle.bounds.x + paddle.bounds.w ||
		ball.bounds.y + ball.bounds.d / 2 < paddle.bounds.y ||
		ball.bounds.y - ball.bounds.d / 2 > paddle.bounds.y + paddle.bounds.h) {
			return false;
	}
	
	return true;
}

//Dibuja la línea del medio
function middleLine() {
	for(let i = 0; i < 320 / 35; i++) {
		fill(255);
		rect(160 - 2, i * (15 + 10), 2, 15);
	}
}

//Clase que representa el marcador
function Marker(player, ai) {
	this.pScore = 0;
	this.AIScore = 0;
	
	this.draw = function() {
		textSize(32);
		text(this.pScore, width / 4 - 10, 40);
		text(this.AIScore, width / 4 * 3, 40);
	}
}

//Clase que representa el rival
function AI(ball) {
	this.ball = ball;
	
	this.bounds = {x: 300, y: 5, w: 15, h: 50};
	this.maxSpeed = 5;
	this.currentSpeed = 0;
	
	//Dibuja la pala
	this.draw = function() {
		fill(255);
		noStroke();
		rect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
	}
	
	//Actualiza la pala para que no se salga de los bordes
	this.update = function() {
		this.bounds.y = this.ball.bounds.y;
		
		if(this.bounds.y + this.bounds.h > height) {
			this.bounds.y = height - this.bounds.h;
		} else if(this.bounds.y < 0) {
			this.bounds.y = 0;
		}
	}
}

//Clase que representa el jugador
function Player() {
	this.bounds = {x: 5, y: 5, w: 15, h: 50};
	this.speed = 5;
	
	//Dibuja el jugador
	this.draw = function() {
		fill(255);
		noStroke();
		rect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
	}
	
	//Gestiona las pulsaciones del teclado para mover el jugador
	this.controls = function() {
		if(keyIsDown(UP_ARROW)) {
			this.bounds.y -= this.speed;
		} else if(keyIsDown(DOWN_ARROW)) {
			this.bounds.y += this.speed;
		}
		
		this.checkBounds();
	}
	
	//Comprueba los bordes para que no se pueda salir de la pantalla
	this.checkBounds = function() {
		if(this.bounds.y < 0) {
			this.bounds.y = 0;
		} else if(this.bounds.y + this.bounds.h > height) {
			this.bounds.y = height - this.bounds.h;
		}
	}
}

//Clase que representa la pelota
function Ball(marker) {
	this.bounds = {x: 160, y: 120, d: 10};
	this.maxSpeed = {x: 5, y: 5};
	this.speed = {x: 0, y: 0};
	this.marker = marker;
	
	//Dibuja la pelota en la pantalla
	this.draw = function() {
		fill(255);
		noStroke();
		ellipse(this.bounds.x, this.bounds.y, this.bounds.d);
	}
	
	//Actualiza la pelota
	this.update = function() {
		this.move();
		this.checkBounds();
		this.checkScore();
	}
	
	/*Comprueba quién ha metido un punto
		Dependiendo de por cual lado haya salido la pelota*/
	this.checkScore = function() {
		if(this.bounds.x < 0) {
			this.marker.AIScore++;
			this.bounds.x = width / 2;
			this.bounds.y = height / 2;
		} else if(this.bounds.x + this.bounds.d / 2 > width) {
			this.marker.pScore++;
		}
	}
	
	//Mueve la pelota
	this.move = function() {
		this.speed.x = this.maxSpeed.x;
		this.speed.y = this.maxSpeed.y;
		
		this.bounds.x += this.speed.x;
		this.bounds.y += this.speed.y;
	}
	
	//Comprueba los bordes para que la pelota no pueda abandonar la pantalla
	this.checkBounds = function() {	
		if(this.bounds.y - this.bounds.d / 2 < 0) {
			this.bounds.y = this.bounds.d / 2;
			this.maxSpeed.y *= -1;
		} else if(this.bounds.y + this.bounds.d / 2 > height) {
			this.bounds.y = height - this.bounds.d / 2;
			this.maxSpeed.y *= -1;
		}
	}
}