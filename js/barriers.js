var Barrier = function(){
	
	this.x = 500;
	this.y = 150;
	this.width = 100;
	this.height = 50;
	
	this.draw = function(){
		window.ctx.fillStyle = '#fff';
		window.ctx.fillRect( this.x, this.y, this.width, this.height );
	}
	
	window.collitionArray.push( { x: this.x, y: this.y, width: this.width, height: this.height } );
		
}