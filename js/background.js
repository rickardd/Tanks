

var Bubble = function(){
	
	var ctx = window.ctx;
	
	this.x = Math.round( Math.random() * ctx.canvas.width );
	this.y = Math.round( Math.random() * ctx.canvas.height );
	this.r = Math.round( Math.random() * 50 );
	this.lineWidth = Math.round( Math.random() * 10 + 1 );
	this.xDrift = ( Math.random() * 1 ) * .4 ;
	this.yDrift = ( Math.random() * 1 ) * .2 ;
	this.draw = function(){
		
		ctx.beginPath();
		
		ctx.strokeStyle = '#fff';
		
		ctx.lineWidth = this.lineWidth ;
		
		ctx.arc( this.x, this.y, this.r, 0 * Math.PI / 180 , 360 * Math.PI / 180 , false)
		
		//ctx.fill();
		
		ctx.stroke();
		

	};
	this.update = function(){
		
		if( this.x - (this.r/2) - ( this.lineWidth * 2 ) > ctx.canvas.width ){
			this.x = 0 - this.r - this.lineWidth;
		}
		if( this.y - (this.r/2) > ctx.canvas.width ){
			this.y = - this.r - this.lineWidth;
		}
		
		this.x += this.xDrift;
		this.y += this.yDrift;	
	};
		
}