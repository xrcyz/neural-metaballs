
class NeuralMetaballs
{
	constructor()
	{
        
        this.ellipses = [];
		this.ellipseCount = 4;
		this.edgeCount = 8;
		let scale = 5;
		
		for(let i = 0; i < this.ellipseCount; i++)
		{
			let radius = random(0.4, 0.5);
			let position = p5.Vector.random2D().mult(random(0.2, 0.4));
			position.x += 0.5;
			position.y += 0.5;
			this.ellipses.push(new NeuralEllipse(position, radius, this.edgeCount));
		}
		
		this.inputs = [];
		this.layer1 = [];
		this.layer2 = [];
		this.layer3 = [];
		
		//init layer 1
		for(let i = 0; i < this.ellipseCount; i++)
		{
			for(let j = 0; j < this.edgeCount; j++)
			{
				let weights = this.ellipses[i].edges[j].getWeights();
				let bias = this.ellipses[i].edges[j].getBias();
				
				this.layer1.push(new Neuron(weights, bias));
			}
		}
		
		//init layer 2
		scale = 8;
		for(let i = 0; i < this.ellipseCount; i++)
		{
			let weights = [];
			
			for(let j = 0; j < this.layer1.length; j++)
			{
				let ellipse = floor(j / this.edgeCount); 
				weights[j] = (ellipse == i) ? -scale : 0;
			}
			
			let bias = scale * (this.edgeCount - 0.5);
			
			this.layer2.push(new Neuron(weights, bias));
		}
		
		//init layer 3
		scale = 10;
		{
			let weights = [];
			
			for(let j = 0; j < this.layer2.length; j++)
			{
				weights[j] = -scale;
			}
			
			let bias = scale/2;
			
			this.layer3.push(new Neuron(weights, bias));
		}
		
	}
	
	update()
	{
		for(let ellipse of this.ellipses)
		{
			let n1 = noise(0.25 * ellipse.position.x + ellipse.seed, 0.25 * ellipse.position.y + ellipse.seed, frameCount / 2000, ellipse.seed);
			let n2 = noise(2 * ellipse.position.x + ellipse.seed, 2 * ellipse.position.y + ellipse.seed, frameCount / 2000, ellipse.seed);
			
			let c = createVector(0.5,0.5)
			let pos = p5.Vector.sub(ellipse.position, c).rotate(n1 * TWO_PI/50 * ellipse.radius * 6).setMag(map(n2,0,1,0.1,0.4)).add(c); 
			let offset = p5.Vector.sub(pos, ellipse.position); 
			offset.limit(0.01);
			
			ellipse.move(offset);
			//ellipse.seed += 0.01;
		}
		
		//update layer 1
		for(let i = 0; i < this.ellipseCount; i++)
		{
			for(let j = 0; j < this.edgeCount; j++)
			{
				this.layer1[i * this.edgeCount + j].weights = this.ellipses[i].edges[j].getWeights();
				this.layer1[i * this.edgeCount + j].bias = this.ellipses[i].edges[j].getBias();
				
			}
		}
		
		//console.log(this.layer1[0].weights[0]);
	}
	
	getValue(x, y)
	{
		for(let i = 0; i < this.layer1.length; i++)
		{
			this.layer1[i].calculate([x,y]);
		}
		
		let L1 = this.layer1.map(neuron => neuron.value); 
		for(let i = 0; i < this.layer2.length; i++)
		{
			this.layer2[i].calculate(L1);
		}
		
		let L2 = this.layer2.map(neuron => neuron.value); 
		for(let i = 0; i < this.layer3.length; i++)
		{
			this.layer3[i].calculate(L2);
		}
		
		return this.layer3[0].value; 
		
	}
	
}