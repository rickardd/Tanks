/*

	VEHICLE BASE STRUCTURE
	
*/

/**************************************************************************/

var Vehicle = function(){
	this.label = 'Vehicle';
	this.player = false;
	this.width = 100;
	this.height = 200;
	this.x = 100;
	this.y = 100;	
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
	this.left = false;
	this.right = false;
	this.stopFWard = false;
	this.stopBWard = false;
	this.collition = false;
	this.leftOut = false;
	this.rightOut = false;
	this.topOut = false;
	this.bottomOut = false;
	this.stopTurning = false;
	this.turningOnce = false;
	this.weaponInitiated = false;
	
	
	/*
	 	INTELEGENS
	*/

	this.intelegens = 0;
	//this.intelegensRange = 10;
	this.intel = {};
	this.intel.turningSpeed = 2000;
	//this.intel.ranAngleInd = this.intelegensRange + this.intelegens;
	//this.intel.intervalInd = 0; 
	
	

};

Vehicle.prototype.add = function(){
	
	var win = window,
		doc = document,
		canv = doc.createElement('canvas'),
		ctx = canv.getContext('2d');
		width = this.width + this.shadowBlur * 2,
		height = this.height + this.shadowBlur * 2;
	
	ctx.canvas.width = width;
	ctx.canvas.height = height;
	
	if ( this.shadowBlur > 0 ) {

		ctx.shadowOffsetX = 0;   
		ctx.shadowOffsetY = 0;   
		ctx.shadowBlur = this.shadowBlur;   
		ctx.shadowColor = "rgba(0,0,0,.5)";	 
		console.count( 'shadowBlur' );
	};
    
	ctx.fillStyle = this.color;

	ctx.fillRect( this.shadowBlur, this.shadowBlur, this.width, this.height );
	
	this.correctionX = - this.width / 2;
	this.correctionY = - this.height / 2;
	
	this.canvas = canv;
	this.ctx = ctx;
	
};

Vehicle.prototype.addIntelegens = function( intelegens ){

	this.intelegens = intelegens;

	(function(){
		if( this.intelegens > 0 ){
			var interval = 0, that = this;
			setInterval( function(){

				that.autoTurn();

				that.weapon.shot();

			}, that.intel.turningSpeed );
		}
	}).call( this );

};

Vehicle.prototype.autoTurn = function(){

		var randAngle = this.rotationAngle + ( 360 - Math.random() * ( 360 / 90 ) * 100 ),
			pos = angleCalc( randAngle, this.x, this.y, this.speed );
			
		this.rotationAngle = ( randAngle > 360 - this.rotationSpeed ) ? 0: randAngle;

};

Vehicle.prototype.fward = function(){

		var pos = window.angleCalc( this.rotationAngle, this.x, this.y, this.width, this.height, this.speed );
		
		this.move = true;
		this.x += pos.x;
		this.y += pos.y;
		
		this.collitionX = this.x + this.correctionX;
		this.collitionY = this.y + this.correctionY;

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
	
	console.log('turnLeft', this.label);

	var newAngle = this.rotationAngle - this.rotationSpeed,
		pos = angleCalc( newAngle, this.x, this.y, this.speed );
		
	this.rotationAngle = ( newAngle < 0 + this.rotationSpeed  ) ? 360: newAngle;

	if( this.weaponInitiated === true ){

		this.weapon.rotationAngle = this.weapon.rotationAngle - this.rotationSpeed;

	}
};


Vehicle.prototype.turnRight = function(){
	var newAngle = this.rotationAngle + this.rotationSpeed,
		pos = angleCalc( newAngle, this.x, this.y, this.speed );
		
	this.rotationAngle = ( newAngle > 360 - this.rotationSpeed ) ? 0: newAngle;

	if( this.weaponInitiated === true ){

		this.weapon.rotationAngle = this.weapon.rotationAngle + this.rotationSpeed;

	}
};

Vehicle.prototype.draw = function(){

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




/*

	VEHICLE TYPES
	
*/

/**************************************************************************/



/*
	TANK
*/


var Tank = function( x, y ){
	
	// THIS
	this.label = 'Tank';
	this.x = x || 100;
	this.y = y || 100;
	this.width = 100;
	this.height = 50;
	this.rotationAngle = 25;
	this.forward = false;
	this.speed = 10;
	this.add();
	
	// WEAPON
	this.weapon = new Weapon( this, 'cannon', 50, 30 );
};

Tank.prototype = new Vehicle();


/*
	AIRPLANE
*/


var Airplane = function( x, y ){
	
	// THIS
	this.label = 'Airplane';
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

Airplane.prototype = new Vehicle();


/*
	HUMAN
*/


var Human = function( x, y ){
	
	//THIS
	this.label = 'Human';
	this.x = x || 200;
	this.y = y || 200;
	this.width = 20;
	this.height = 20;
	this.rotationAngle = -90;
	this.rotationspeed = 360 / 90;
	this.forward = true;
	this.speed = 3;
	this.color = 'rgba(83, 0, 207, 1)';
	this.shadowBlur = 0;
	this.add();

	// INTELEGENS
	this.intelegens = 10;
	this.turningOnce = true;
	this.addIntelegens( 5 );

	// WEAPON
	this.weapon = new Weapon( this, 'gun', 30, 5 );
	
};

Human.prototype = new Vehicle();




















