
( function( win, doc, undef ){

	this.StatusBar = function(){

		this.name = 'Statusbar';
		this.damageName = 'Damage';
		this.killsName = 'Kills';
		this.damageText = '';
		this.killsText = '';
	};	


	StatusBar.prototype.update = function(){
		this.damageText = this.damageName + ': ' + win.player.damage;
		this.killsText = this.killsName + ': ' + win.player.kills;
	};

	StatusBar.prototype.draw = function(){

		var ctx = win.ctx, 
			rows = 3,
			fontSize = 12,						
			padding = 10,
			lineHeight = fontSize + 5,
			width = 200,
			height = ( rows *  lineHeight ) + ( padding * 2 ),
			x = ctx.canvas.width - width - 10,
			y = 10;

		ctx.save();

		ctx.translate(x,y);
		ctx.fillStyle = '#fff';
		ctx.fillRect( 0, 0, width, height );

		ctx.translate( padding, padding );

		ctx.fillStyle = '#000';
		ctx.stokeStyle = '#000';
		ctx.font = fontSize + 'px arial';
		ctx.textBaseline = 'top';
		ctx.fillText( this.name, 0,0 );

		ctx.translate( 0, lineHeight );
		
		ctx.fillText( this.damageText, 0,0 );

		ctx.translate( 0, lineHeight );

		ctx.fillText( this.killsText, 0,0 );

		ctx.restore();

	};

})( window, document);

