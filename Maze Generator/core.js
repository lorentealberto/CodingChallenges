let cols, rows;
let size = 30;
let grid = [];
let currentCell;
let stack = [];

function setup() {
	createCanvas(600, 600);

	cols = floor(width / size);
	rows = floor(height / size);

	for(let j = 0; j < rows; j++) {
		for(let i = 0; i < cols; i++) {
			let cell = new Cell(i, j);
			grid.push(cell);
		}
	}

	currentCell = grid[0];

}

function draw() {
	background(51);

	for(let i = 0; i < grid.length; i++) {
		grid[i].show();
	}

	currentCell.visited = true;
	currentCell.hightlight();

	let nextCell = currentCell.checkNeightbors();
	
	if(nextCell) {
		nextCell.visited = true;
		
		stack.push(currentCell);

		removeWalls(currentCell, nextCell);
		currentCell = nextCell;
	} else if(stack.length > 0) {
		currentCell = stack.pop();
	}
}

function Cell(_col, _row) {
	this.i = _col;
	this.j = _row;
	this.walls = {top: true, right: true, bottom: true, left: true};
	this.visited = false;

	this.show = function() {
		let x = this.i * size;
		let y = this.j * size;
		
		stroke(255);
		noFill();
		if(this.walls.top) {
			line(x, y, x + size, y); // UP	
		}
		
		if(this.walls.right) {
			line(x + size, y, x + size, y + size); // RIGHT
		}
		
		if(this.walls.bottom) {
			line(x + size, y + size, x, y + size); // BOTTOM
		}
		
		if(this.walls.left) {
			line(x, y + size, x, y); // LEFT 
		}
	}

	this.hightlight = function() {
		let x = this.i * size;
		let y = this.j * size;

		noStroke();
		fill(0, 0, 255, 100);
		rect(x, y, size, size);
	}

	this.checkNeightbors = function() {
		let neighbors = [];
		
		let top = grid[index(this.i, this.j - 1)];
		let right = grid[index(this.i + 1, this.j)];
		let bottom = grid[index(this.i, this.j + 1)];
		let left = grid[index(this.i - 1, this.j)];

		if(top && !top.visited) {
			neighbors.push(top);
		}

		if(right && !right.visited) {
			neighbors.push(right);
		}

		if(bottom && !bottom.visited) {
			neighbors.push(bottom);
		}

		if(left && !left.visited) {
			neighbors.push(left);
		}

		if(neighbors.length > 0) {
			let randomNeighbor = floor(random(0, neighbors.length));
			return neighbors[randomNeighbor];
		} else {
			return undefined;
		}
	}
}

function removeWalls(cellA, cellB) {
	let x = cellA.i - cellB.i;
	let y = cellA.j - cellB.j;

	if(x === 1) {
		cellA.walls.left = false;
		cellB.walls.right = false;
	} else if(x === -1) {
		cellA.walls.right = false;
		cellB.walls.left = false;
	}

	if(y === 1) {
		cellA.walls.top = false;
		cellB.walls.bottom = false;
	} else if(y === -1) {
		cellA.walls.bottom = false;
		cellB.walls.top = false;
	}
}

function index(i, j) {
	if(i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
		return -1;
	}

	return i + j * cols;
}