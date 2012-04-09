
( function( win, doc, undef ){

	this.StatusBar = function(){

		this.name = 'Statusbar';
		this.damageName = 'Damage';
		this.killsName = 'Kills';
		this.damageText = '';
		this.killsText = '';

		this.eDamageName = 'Enemie Damage';
		this.eKillsName = 'Enemie Kills';
		this.eDamageText = '';
		this.eKillsText = '';

		this.enemieKilled = [];
	};	


	StatusBar.prototype.update = function(){
		this.damageText = this.damageName + ': ' + win.player.damage;
		this.killsText = this.killsName + ': ' + win.player.kills;

		if( win.humans[0] ){
			this.eDamageText = this.eDamageName + ': ' + Math.ceil( win.humans[0].damage * 100 );
		}
		this.eKillsText = this.eKillsName + ': ' + this.enemieKilled.length;
	};

	StatusBar.prototype.draw = function(){

		var ctx = win.ctx, 
			rows = 5,
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

		/* Player */

		ctx.translate( 0, lineHeight );
		
		ctx.fillText( this.damageText, 0,0 );

		ctx.translate( 0, lineHeight );

		ctx.fillText( this.killsText, 0,0 );

		/* Enemie */

		ctx.translate( 0, lineHeight );
		
		ctx.fillText( this.eDamageText, 0,0 );

		ctx.translate( 0, lineHeight );

		ctx.fillText( this.eKillsText, 0,0 );

		ctx.restore();

	};

})( window, document);

