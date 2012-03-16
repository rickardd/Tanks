

/*************************
 
 
 WEAPONS


**************************/

var Bullet = function( angle, hX, hY ){
	this.angle = angle || 0;
	this.dropped = false;
	this.crater = true;
	this.speed = 10;
	this.xxx = 40;
	this.currentXxx = this.xxx;
	this.r = 6;
	this.currentR = 0;
	this.startX = hX || 100; // The starting x pos. Uses to calc the distanse over time
	this.startY = hY || 100; // The starting y pos. Uses to calc the distanse over time
	this.x = this.startX; // the current x position. Starts width the same position as startX.
	this.y = this.startY; // the current x position. Starts width the same position as startY.
	this.distance = 500;	
	this.currentDistance = 0;
	this.blur = 3;
	this.colorString = 'rgba(0,0,0,1)';
	this.setColor = function( r, g, b, a ){
		this.colorString = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
	};  
	
};

Bullet.prototype.move = function(){
	
	if( this.dropped === false ){
		
		var deg = Math.floor( ( this.currentDistance / this.distance ) * 180  );
				
		this.currentXxx = ( Math.sin( ( deg * Math.PI / 180 ) ) * this.xxx );
		
		var speedVariation = this.xxx - this.currentXxx;
			
		var pos = window.angleCalc( this.angle, this.x, this.y, this.r, this.r, this.speed + speedVariation );
		
		this.x += pos.x;
		this.y += pos.y;
		
		this.currentR = this.r + this.currentXxx;
		
		this.currentDistance = Math.sqrt( Math.pow( this.x - this.startX, 2 ) + Math.pow( this.y - this.startY, 2 ) );
						
		if( this.currentDistance > this.distance ){
			this.dropped = true;
			if( this.crater === true ){
				window.crates.push( new Crate( this.x, this.y ) );	
			}
			
		}
	}
};

Bullet.prototype.draw = function(){
	
	var ctx = window.ctx;

	/*
		DRAW SHADOW
	*/
		
	ctx.save();

	ctx.beginPath();

	ctx.shadowOffsetX = 0;   
	ctx.shadowOffsetY = 0;   
	ctx.shadowBlur = this.blur + this.currentXxx * 3;   
	ctx.shadowColor = 'rgba(0,0,0,1)';	 
		
	ctx.arc( this.x, this.y, this.currentR, 0, 360 * Math.PI / 180, true );

	ctx.closePath();
	
	ctx.fill();
	
	ctx.restore();	
	
	/*
		DRAW BULLET
	*/
	
	ctx.save();

	ctx.beginPath();

	ctx.fillStyle = this.colorString;
	
	
	ctx.arc( this.x, this.y, this.currentR, 0, 360 * Math.PI / 180, true );

	ctx.closePath();
	
	ctx.fill();
	
	ctx.restore();	

};



/*************************
 
 
 TANK Bullet CRATE


**************************/




var Crate = function( x, y ){
	this.x = x;
	this.y = y;
	this.r = 20;
	this.color = 'rgba(0,0,0,.03)';
	this.circles = [];
	this.nrOfCircles = 4;
	( function( that ){
		
		var i = 0;
		
		for( i; i < that.nrOfCircles; i++ ){
			that.circles.push( new Shockwave( that.x, that.y) );	
		}
		
			
	})( this );
}

Crate.prototype.update = function(){
	
	var that = this;
	
	this.circles.forEach( function( Circle, i){
		
		if( Circle.dead === true ){
			that.circles.splice( i, 1 );
		}
			
	});
	
	
}


Crate.prototype.draw = function(){
	
	var ctx = window.ctx;
	
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(this.x, this.y);
	ctx.fillStyle = this.color;
	ctx.arc( this.x, this.y, this.r, this.r, 0, 360 * Math.PI / 180 );
	ctx.fill();
	ctx.restore();
	
		
	this.circles.forEach( function( Circle, i ){
		
		Circle.update();
		Circle.draw();
		
	});
	
		
}





/*************************
 
 
 SHOCKWAVE


**************************/


var Shockwave = function( x, y ){
	
	this.dead = false;
	this.procentalDeath = 0;
	this.x = x;
	this.y = y;
	this.r = 1;
	this.currentR = this.r;
	this.livingRadius = 500; // stämmer inte helt - 500 ger linjer på 100 i radie. Kolla upp
	this.lineDrift = 5;
	this.expandSpeed = 5;
	this.lineWidth = 1;
	this.color = {
		r: 96,
		g: 127,
		b: 200,
		a: 1	
	}
	this.Shockwave = 'rgba(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ',' + this.color.a + ')';  
	this.step = 360 / 90;

	
}

Shockwave.prototype.update = function(){
	this.currentR += this.expandSpeed;
	this.procentalDeath = ( this.currentR / this.livingRadius ) * 100;
	this.procentalDeath = ( this.procentalDeath < 0 ) ? 100: this.procentalDeath;
	this.color.a -= this.procentalDeath / 100;
	this.Shockwave = 'rgba(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ',' + this.color.a + ')';  
		
	if( this.procentalDeath >= 100 ){
		this.dead = true;
	}

};

Shockwave.prototype.draw = function(){

	var ctx = window.ctx;
		
	ctx.save();	
	ctx.beginPath();
	ctx.strokeStyle = this.Shockwave;
	ctx.lineWidth = this.lineWidth;
		
	ctx.moveTo( this.x + this.currentR, this.y );
	
	var deg = 0, x, y;
	
	for( deg; deg <= 360; deg += this.step ){
		
		x = this.currentR * Math.cos( deg * Math.PI / 180 );
		y = this.currentR * Math.sin( deg * Math.PI / 180 );
		
		x += Math.round( Math.random() * this.lineDrift );
		y += Math.round( Math.random() * this.lineDrift );
		
		ctx.lineTo( this.x + x, this.y + y );
		
	}
	
	ctx.lineTo( this.x + this.currentR, this.y );
	
	ctx.stroke();
	ctx.closePath();
	ctx.restore();

};



/**************************************************************************/




var Cannon = function( angle, hX, hY){
	this.angle = angle || 0;
	this.startX = hX || 100; // The starting x pos. Uses to calc the distanse over time
	this.startY = hY || 100; // The starting y pos. Uses to calc the distanse over time
	this.x = this.startX; // the current x position. Starts width the same position as startX.
	this.y = this.startY; // the current x position. Starts width the same position as startY.
	this.r = 6;
	this.crater = true;
	this.setColor( 100, 100, 100, 1);
	this.init();		
};

Cannon.prototype = new Bullet();

//Cannon.prototype = window.extend( Bullet );

Cannon.prototype.init = function(){
	
};




var Gun = function( angle, hX, hY ){
	this.angle = angle || 0;
	this.startX = hX || 100; // The starting x pos. Uses to calc the distanse over time
	this.startY = hY || 100; // The starting y pos. Uses to calc the distanse over time
	this.x = this.startX; // the current x position. Starts width the same position as startX.
	this.y = this.startY; // the current x position. Starts width the same position as startY.
	this.r = 3;
	this.xxx = 0;
	this.crater = false;
	this.distance = window.ctx.canvas.width + 100;
	this.speed = 30;
	this.blur = 0;
	this.setColor( 30, 30, 30, 1);
	this.init();		
};

Gun.prototype = new Bullet();
//Gun.prototype = window.extend( Bullet );

Gun.prototype.init = function(){
	
};


























