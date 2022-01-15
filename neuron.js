
class Neuron
{
	constructor(weights, bias)
	{
		this.weights = weights;
		this.bias = bias; 
		
		this.value =  0;
	}
	
	crossproduct(a,b) { return a.map((e,i) => e * b[i]).reduce((sum, e) => sum + e, 0); }
	
	calculate(inputs)
	{
		this.value = 1 / (1 + exp(this.crossproduct(this.weights, inputs) + this.bias)); 
	}
}