
let network;
let metaballs;
let diagram;

function setup() 
{
	network = new NeuralMetaballs();
	metaballs = new ViewMetaballs(network); 
	diagram = new Diagram(network);
	
	let canvas = createCanvas(1200, 600);
	canvas.style('display', 'block'); 
}

function draw() 
{
	background(10);
	network.update();
	metaballs.update();
	metaballs.draw();
	diagram.update();
	diagram.draw();
}