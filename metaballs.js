
class ViewMetaballs
{
	constructor(balls)
	{
		this.balls = balls; 
		
		this.step = 10;
		this.len = 60;
		this.size = this.len * this.step;
		
		this.pg = createGraphics(this.size, this.size); 
		this.pg.noStroke();
		this.update();
	}
	
	update()
	{
		const purple = color(68.0,50.0,120.0);
		const pink = color(255,160.0,186.0);
					
		for(let i = 0; i < this.len; i++)
		{
			for(let j = 0; j < this.len; j++)
			{
				let x = i / this.len;
				let y = j / this.len;
				let value = this.balls.getValue(x, y);
				
				let colour = lerpColor(purple, pink, value);
				this.pg.fill(colour); 
				this.pg.rect(i * this.step, j * this.step, this.step, this.step);
			}
		}
	}
	
	draw()
	{
		image(this.pg, 0, 0);	
	}
}