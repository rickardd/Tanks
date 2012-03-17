

var game = (function( win, doc, tank, undef){
	
	var settings = {
		nrOfBubbles: 20	
	},
	createCanvas = function(){
		
		win.canv = doc.createElement('canvas');
		win.ctx = ( canv && canv.getContext('2d') ) ? canv.getContext('2d'): udef;
		
		//doc.body.appendChild( win.canv );
		
		if( ctx ){
			canv.width = win.innerWidth ;
			canv.height = win.innerHeight - 10;
		}
		
		win.canvPlay = doc.createElement('canvas');
		win.ctxPlay = ( canvPlay && canvPlay.getContext('2d') ) ? canvPlay.getContext('2d'): udef;
		
		win.canvPlay.setAttribute( 'name', 'canv-play' );
		
		doc.body.appendChild( win.canvPlay );
		
		if( ctxPlay ){
			canvPlay.width = win.innerWidth ;
			canvPlay.height = win.innerHeight - 10;
		}
		else{
			console.debug('canvas not built');
		}
		
	},
	createBackground = function(){
		
		var len = settings.nrOfBubbles,
			i = 0;
			
			
		
		for( i; i < len; i++){
	
			background.bubble.push( new Bubble );
			
		}
		
		
	},
	createBarrier = function(){
	
		win.barriers.push( new Barrier() );			
		
	},
	createVehicle = function(){
		
		var human = new Human(),
			tank = new Tank(),
			airplane = new Airplane( 600, -100);
		
		win.tanks.push( tank );
		win.airplanes.push( airplane );
		win.humans.push( human );


		/*
			Set the player
		*/

		win.player = human;
		win.player.player = true;


	},
	blank = function(){
		
		var ctx = win.ctx;
		
		ctx.fillStyle = '#cdf1fa';
		ctx.fillRect( 0,0, ctx.canvas.width, ctx.canvas.height );
	
	},
	moveVehicle = function(){
		
		
			if( this.forward === true ){
				this.fward();			
			}
			if( this.backward === true ){
				this.bward();			
			}
			if( this.left === true /*&& this.stopTurning === false*/ ){
				this.turnLeft();			
			}
			/*
				DEBUGG
			if( this.type = 'Human' ){

				console.log( 'stop Turning', this.stopTurning);

				//console.log( xxxxxx = (this.left === true) , xxxxxxxxx = (this.stopTurning == false ));

				//debugger;

			}*/
			if( this.right === true /*&& this.stopTurning !== true */ ){
				this.turnRight();			
			}
						
			if( this.move === true ){
				this.checkBodyCollition();	
				this.checkPosition();
			}
		

	},
	rotateWeapon = function(){
		if( this.isTurningRight === true ){
				this.turnRight();			
		}
		if( this.isTurningLeft === true ){
			this.turnLeft();			
		}
	},
	gameLoop = function(){
		
		/*
			CLEAR STAGE
		*/

		blank();
		
		/*
			BACKGROUND
		*/
		
		win.background.bubble.forEach( function( Bubble, i ){
			
			Bubble.update();
			Bubble.draw();
						
		});

		/*
			HUMAN
		*/

		win.humans.forEach( function( Human, i ){
			
			moveVehicle.call( Human );

			Human.draw();
			
		});

		/*
			TANK
		*/
			
		win.tanks.forEach( function( Tank, i ){
			
			
			moveVehicle.call( Tank );

			Tank.draw();
			
		});
		
		
		/*
			BARRIER
		*/
		
		win.barriers.forEach( function( Barrier, i ){
		
			Barrier.draw();
			
		});

		/*
			SHOT
		*/
		
		win.shots.forEach( function( Shot, i ){
			
			if( Shot.dropped === true ){
				
				shots.splice( i, 1 );
				
			}
			else{
				Shot.move();
				Shot.draw();	
			}
			
		});
		
		/*
			HUMAN WEAPON
		*/
		
		win.humans.forEach( function( Human, i ){
			
			rotateWeapon.call( Human.weapon );
			
			Human.weapon.update();
			
			Human.weapon.draw();
			
		});		

		/*
			TANK WEAPON
		*/
		
		win.tanks.forEach( function( Tank, i ){
			
			rotateWeapon.call( Tank.weapon );
			
			Tank.weapon.update();
			
			Tank.weapon.draw();
			
		});		

		
		
		/*
			CRATE
		*/
		
		win.crates.forEach( function( Crate, i ){
			
			Crate.update();
			
			Crate.draw();
			
		});
				
		/*
			AIRPLANE
		*/
		
		win.airplanes.forEach( function( Airplane, i ){
			
			moveVehicle.call( Airplane );
			
			Airplane.draw();
			
		});
		
		
		/*
			DRAW PLAY-CANVAS
		*/
		
		win.ctxPlay.drawImage( win.canv, 0,0,ctxPlay.canvas.width, ctxPlay.canvas.height);

		/*
			LOOP GAMELOOP
		*/

		win.requestAnimFrame( gameLoop );
	};
	
	return {
		start: function(){
			createCanvas();
			createBackground();
			createBarrier();
			createVehicle();
			gameLoop();		
		}
	}
	
	
})( window, document, window.tank);

game.start();