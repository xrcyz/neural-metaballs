
class NeuralEllipse
{
	constructor(center, radius, edgeCount)
	{
		this.seed = random(1000);
		this.position = center;
		this.radius = radius; 
		this.edgeCount = edgeCount; 
		this.edges = [];
		
		let vec = createVector(radius, 0);//.rotate(random(TWO_PI)); 
		let p1, p2;
		
		for(let i = 0; i < edgeCount; i++)
		{
			p1 = 
			{
				x: center.x + vec.x,
				y: center.y + vec.y,
			};
			
			vec.rotate(TWO_PI / edgeCount);
			
			p2 = 
			{
				x: center.x + vec.x,
				y: center.y + vec.y,
			};
			
			if(p1.x != p2.x)
				this.edges.push(new NeuralEdge(p1, p2));
		}
	}
	
	move(offset)
	{
		this.position.add(offset);
		
		if(this.position.x < 0) this.position.x +=1;
		if(this.position.y < 0) this.position.x +=1;
		if(this.position.x > 1) this.position.x -=1;
		if(this.position.y > 1) this.position.x -=1;
		
		let vec = createVector(this.radius, 0); 
		let p1, p2;
		
		for(let i = 0; i < this.edgeCount; i++)
		{
			p1 = 
			{
				x: this.position.x + vec.x,
				y: this.position.y + vec.y,
			};
			
			vec.rotate(TWO_PI / this.edgeCount);
			
			p2 = 
			{
				x: this.position.x + vec.x,
				y: this.position.y + vec.y,
			};
			
			if(p1.x != p2.x) 
				this.edges[i].setPosition(p1, p2);
		}
	}
}

class NeuralEdge
{
	constructor(point1, point2)
	{
		this.scale = 4.3; //sharpness of the transition boundary
		
		this.setPosition(point1, point2);
	}
	
	setPosition(point1, point2)
	{
		//y = mx + b
		//[m, a, b]
		
		this.slope = (point2.y - point1.y) / (point2.x - point1.x);
		this.yintersect = point1.y - this.slope * point1.x; 
		
		//we have to honour the order of the points
		//so if they go right to left, then "above" the line is below
		//so we put a negative in there somewhere
		
		this.normal = (point2.x - point1.x) > 0 ? 1 : -1; 
	}
	
	getWeights()
	{
		//given inputs [x,y]
		//calculate cross-product = normal * (mx + b - y) = normal * m * x - normal * y + normal * b
		
		return [this.scale * this.normal * this.slope, -1 * this.scale * this.normal];
	}
	
	getBias()
	{
		return this.scale * this.normal * this.yintersect;
	}
}