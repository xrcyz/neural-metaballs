
class Diagram
{
	constructor(nn)
	{
		this.network = nn;
		
		this.pg = createGraphics(600, 600);
		this.pg.textAlign(CENTER, CENTER); 
		
		this.update();
	}
	
	update()
	{
		this.pg.background(228);
		
		//layer 0
		let stepx = this.pg.width / 5;
		
		//lines
		//layer 1
		this.pg.stroke(66, 139, 201, 100);
		let stepy = this.pg.height / (this.network.layer1.length + 1); 
		let weight, bias, c;
		let a = this.network.layer1.map(neuron => neuron.weights[0]);
		let b = this.network.layer1.map(neuron => neuron.weights[1]);
		let wmin1 = Math.min(...a);
		let wmax1 = Math.max(...a);
		let wmin2 = Math.min(...b);
		let wmax2 = Math.max(...b);
		for(let i = 1; i <= this.network.layer1.length; i++)
		{
			weight = this.network.layer1[i-1].weights[0];
			c = map(weight,wmin1,wmax1,0,100);
			this.pg.stroke(66, 139, 201, c);
			this.pg.line(2 * stepx, i * stepy,stepx, this.pg.height/2 - 100);
						
			weight = this.network.layer1[i-1].weights[1];
			c = map(weight,wmin2,wmax2,0,200);
			this.pg.stroke(66, 139, 201, c);
			this.pg.line(2 * stepx, i * stepy,stepx, this.pg.height/2 );
			
			bias = this.network.layer1[i-1].bias;
			
			c = map(bias,-10,10,0,255);
			this.pg.stroke(210);
			this.pg.line(2 * stepx, i * stepy,stepx, this.pg.height/2 + 100 );
			
			c = map(bias,-20,20,0,1);
			this.pg.fill(20);
			this.pg.ellipse( lerp(stepx, 2 * stepx, c), lerp(this.pg.height/2 + 100, i * stepy, c), 3);
		}
		
		//layer 2
		let py = stepy;
		stepy = this.pg.height / (this.network.layer2.length + 1); 
		this.pg.stroke(66, 139, 201, 100);
		for(let i = 1; i <= this.network.layer2.length; i++)
		{
			for(let j = 1; j <= this.network.layer1.length; j++)
			{
				weight = this.network.layer2[i-1].weights[j-1];
				c = map(weight, 20, -20, 0, 255);
				this.pg.stroke(66, 139, 201, weight < 0 ? 100 : 0);
				this.pg.line(3 * stepx, i * stepy,2 * stepx, j * py);
			}
		}
		
		//layer 3
		for(let i = 1; i <= this.network.layer2.length; i++)
		{
			this.pg.line(3 * stepx, i * stepy, 4 * stepx, this.pg.height/2);
		}
		
		//nodes
		this.pg.fill(189, 215, 238);
		this.pg.stroke(66, 139, 201);
		this.pg.ellipse(stepx, this.pg.height/2 - 100, 30);
		this.pg.ellipse(stepx, this.pg.height/2 , 30);
		this.pg.ellipse(stepx, this.pg.height/2 + 100, 30);
		
		this.pg.fill(0);
		this.pg.text("x", stepx, this.pg.height/2 - 100);
		this.pg.text("y", stepx, this.pg.height/2 );
		this.pg.text("bias", stepx, this.pg.height/2 + 100);
		this.pg.fill(189, 215, 238);
		
		//layer 1
		stepy = this.pg.height / (this.network.layer1.length + 1); 
		for(let i = 1; i <= this.network.layer1.length; i++)
		{
			this.pg.ellipse(2 * stepx, i * stepy, 10);
		}
		
		//layer 2
		stepy = this.pg.height / (this.network.layer2.length + 1); 
		for(let i = 1; i <= this.network.layer2.length; i++)
		{
			this.pg.ellipse(3 * stepx, i * stepy, 30);
		}
		
		//layer 3
		this.pg.ellipse(4 * stepx, this.pg.height/2, 30);
		this.pg.fill(0);
		this.pg.text("out", 4 * stepx, this.pg.height/2);
		
	}
	
	draw()
	{
		image(this.pg, 600, 0);	
	}
}