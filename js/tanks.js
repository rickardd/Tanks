
/*

	TANK CONSTRUKTOR
	
*/

var Vehicle = function( x, y ){

	var	ctx = window.ctx;
	
	this.width = 100;
	this.height = 200;
	this.x = x || 0;
	this.y = y || 0;	
	this.correctionX = 0;
	this.correctionY = 0;
	this.collitionX = 0;
	this.collitionY = 0;
	this.rotationAngle = 0;
	this.rotationSpeed = 6; 
	this.color = '#f55168';
	this.shadowBlur = 6;
	this.speed = 2;
	this.bodyCollition = false;
	this.move = false;
	this.forward = false;
	this.backward = false;
	this.stopFWard = false;
	this.stopBWard = false;
	this.collition = false;
	this.leftOut = false,
	this.rightOut = false;
	this.topOut = false,
	this.bottomOut = false;
	//this.head = new Head( this );
}

Vehicle.prototype.add = function(){
	
	var win = window,
		doc = document,
		canv = doc.createElement('canvas'),
		ctx = canv.getContext('2d');
		width = this.width + this.shadowBlur * 2,
		height = this.height + this.shadowBlur * 2;


	
	ctx.canvas.width = width;
	ctx.canvas.height = height;
	
    ctx.shadowOffsetX = 0;   
	ctx.shadowOffsetY = 0;   
	ctx.shadowBlur = this.shadowBlur;   
	ctx.shadowColor = "rgba(0,0,0,.5)";	 

	ctx.fillStyle = this.color;

	ctx.fillRect( this.shadowBlur, this.shadowBlur, this.width, this.height );
	
	this.correctionX = - this.width / 2;
	this.correctionY = - this.height / 2;
	
	
	//win.tankElements.body.canv.push( canv );
	//win.tankElements.body.ctx.push( ctx );

	this.canvas = canv;
	this.ctx = ctx;
	
};

Vehicle.prototype.fward = function(){
	
	if( this.stopFWard === false ){
		
		var pos = window.angleCalc( this.rotationAngle, this.x, this.y, this.width, this.height, this.speed );
		
		this.move = true;
		this.x += pos.x;
		this.y += pos.y;
		
		this.collitionX = this.x + this.correctionX;
		this.collitionY = this.y + this.correctionY;
	}	
};



Vehicle.prototype.bward = function(){
	
	if( this.stopBWard === false ){
		
		var pos = window.angleCalc( this.rotationAngle, this.x, this.y, this.width, this.height, this.speed );
		
		this.move = true;
		this.y -= pos.y;
		this.x -= pos.x;
		
		this.collitionX = this.x + this.correctionX;
		this.collitionY = this.y + this.correctionY;
	
	}
};

Vehicle.prototype.turnLeft = function(){
	var newAngle = this.rotationAngle - this.rotationSpeed,
		pos = angleCalc( this.rotationAngle, this.x, this.y, this.speed );
		
	this.rotationAngle = ( newAngle < 0 + this.rotationSpeed  ) ? 360: newAngle;
};


Vehicle.prototype.turnRight = function(){
	var newAngle = this.rotationAngle + this.rotationSpeed,
		pos = angleCalc( this.rotationAngle, this.x, this.y, this.speed );
		
	this.rotationAngle = ( newAngle > 360 - this.rotationSpeed ) ? 0: newAngle;
};

Vehicle.prototype.draw = function(){

	/*var tankCanv = window.tankElements.body.canv[0],
		tankCtx = window.tankElements.body.ctx[0],				
		ctx = window.ctx; */

	var ctx = window.ctx,
		tankCanv = this.canvas,
		tankCtx = this.ctx;




	
	ctx.save();

	ctx.translate( this.x , this.y);
    ctx.rotate( this.rotationAngle * Math.PI / 180 );
    ctx.translate( -tankCtx.canvas.width/2, -tankCtx.canvas.height/2 );
	
	//ctx.fillStyle = 'rgba(0,0,0,0.2)';
    //ctx.fillRect( 0, 0, tankCtx.canvas.width, tankCtx.canvas.height);
	    
	ctx.drawImage( tankCanv, 0,0, tankCtx.canvas.width, tankCtx.canvas.height  );
	


	ctx.restore();
			
	/*
		To make the tank turning round the center point the drawing starting -half-height and width.
		Is it posible to turnit and draw the tank at 0,0?
		
	*/
	

};

Vehicle.prototype.checkPosition = function(){
		
	var margin = 200;
	
	/*
		Horisontal check
	*/
	
	// Vehicle moving out of window right
	if( this.x > ctx.canvas.width + margin && this.leftOut === false ){
		this.x = - 200;
		this.rightOut = true;
		console.log( 'rightOut' );
	}
	// Vehicle moving out of window left
	else if( this.x < -margin && this.rightOut === false ){
		this.x = ctx.canvas.width + 200;
		this.leftOut = true;
		console.log( 'leftOut' );
	}		
	// Vehicle moving on stage
	else if( this.x > 0 && this.x < ctx.canvas.width ){
		this.leftOut = false;
		this.rightOut = false;
	}
		
	/*
		Vertical check
	*/

	// Vehicle moving out of window top
	if( this.y > ctx.canvas.height + margin && this.bottomOut === false ){
		this.y = - 200;
		this.bottomOut = true;
	}
	// Vehicle moving out of window bottom
	else if( this.y < -margin && this.topOut === false ){
		this.y = ctx.canvas.height + 200;
		this.topOut = true;
	}		
	// Vehicle moving on stage
	else if( this.y > 0 && this.y < ctx.canvas.height ){
		this.topOut = false;
		this.bottomOut = false;
	}

};

Vehicle.prototype.checkBodyCollition = function(){
	window.checkCollition.call( this );	
};

Vehicle.prototype.stop = function(){
	this.move = false;
};





/*************************
 
 
 TANK HEAD


**************************/


var Head = function( body ){
	this.body = body;
	this.x = this.body.x;
	this.y = this.body.y;
	this.width = 50;
	this.height = 30;
	this.color = '#345678';
	this.rotationAngle = this.body.rotationAngle;
	this.rotationSpeed = 3; 
	this.nrOfShots = 10;
	this.nrOfShoten = 0;
	
	( function( win, doc ){
		
		var canv = doc.createElement('canvas'),
			ctx = canv.getContext('2d');
		
		canv.x = this.x;
		canv.y = this.y;
		
		//win.tankElements.head.canv.push( canv );
		//win.tankElements.head.ctx.push( ctx );
		
		ctx.fillStyle = this.color;
		
	    ctx.shadowOffsetX = 0;   
		ctx.shadowOffsetY = 0;   
		ctx.shadowBlur = 6;   
		ctx.shadowColor = this.shadowColor;	 

		ctx.fillRect( 0, 0, this.width, this.height );
		
		this.canvas = canv;
		this.ctx = ctx;

	}).call( this, window, document );
};

Head.prototype.turnRight = function(){
	var newAngle = this.rotationAngle + this.rotationSpeed,
		pos = angleCalc( this.rotationAngle, this.x, this.y, this.speed );
		
	this.rotationAngle = ( newAngle > 360 - this.rotationSpeed ) ? 0: newAngle;
};

Head.prototype.turnLeft = function(){
	var newAngle = this.rotationAngle - this.rotationSpeed,
		pos = angleCalc( this.rotationAngle, this.x, this.y, this.speed );
		
	this.rotationAngle = ( newAngle < 0 + this.rotationSpeed  ) ? 360: newAngle;

};

Head.prototype.shot = function(){
	
	this.nrOfShots --;
	this.nrOfShoten ++;
	
	window.shots.push( new Cannon( this.rotationAngle, this.x, this.y ) );
	
	//window.shots.push( new Gun( this.rotationAngle, this.x, this.y ) );
}

Head.prototype.update = function(){
	this.x = this.body.x;
	this.y = this.body.y;
	//this.rotationAngle = this.body.rotationAngle
}

Head.prototype.draw = function(){

	var headCanv = this.canvas, //window.tankElements.head.canv[0],
		headCtx = this.ctx, //window.tankElements.head.ctx[0],				
		ctx = window.ctx;
	
	ctx.save();

	ctx.translate( this.x, this.y);
    ctx.rotate( this.rotationAngle * Math.PI / 180 );

	ctx.drawImage( headCanv, -this.width/2 , -this.height/2  );

	ctx.restore();
			
	/*
		To make the tank turning round the center point the drawing starting -half-height and width.
		Is it posible to turnit and draw the tank at 0,0?
		
		maby it posible to draw the hole tank object into a new tank canvas and the draw that one into game canvas. 
		
	*/
	

};


/*
	*********************************************************************************************
*/



/*
	TANK
*/


var Tank = function( x, y ){
	this.x = x || 100;
	this.y = y || 100;
	this.width = 100;
	this.height = 50;
	this.rotationAngle = 25;
	this.forward = false;
	this.speed = 10;	
	this.add();
	this.head = new Head( this );
};

Tank.prototype = new Vehicle( 100, 100);


/*
	AIRPLANE
*/


var Airplane = function( x, y ){
	this.x = x || 100;
	this.y = y || 100;
	this.width = 50;
	this.height = 20;
	this.rotationAngle = 25;
	this.forward = true;
	this.speed = 10;
	this.color = 'rgba(83, 224, 207, 1)';
	this.shadowBlur = 15;
	this.shadowColor = 'rgba(0, 0, 0, .3)';
	
	this.add();
	
};

Airplane.prototype = new Vehicle( 100, 100);

























