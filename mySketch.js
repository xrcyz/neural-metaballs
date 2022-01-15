
let network;
let metaballs;
let diagram;

function setup() 
{
	network = new NeuralMetaballs();
	metaballs = new ViewMetaballs(network); 
	diagram = new Diagram(network);
	
	createCanvas(windowWidth, windowHeight);
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