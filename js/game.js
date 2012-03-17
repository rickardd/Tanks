

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
	createTanks = function(){
		
		
		var player = new Human();
		win.player = player;

		win.tanks.push( new Tank() );

		win.airplanes.push( new Airplane( 600, -100) );


		
		win.humans.push( player );
		
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
	gameLoop = function(){
		blank();
		
		/*
			BACKGROUND
		*/
		
		win.background.bubble.forEach( function( Bubble, i ){
			
			Bubble.update();
			Bubble.draw();
						
		});

		win.humans.forEach( function( Human, i ){
			
			
			moveVehicle.call( Human );
			
			Human.draw();
			
		});

		/*
			TANKS BODY
		*/
			
		win.tanks.forEach( function( Tank, i ){
			
			
			moveVehicle.call( Tank );

			/*if( Tank.forward === true ){
				Tank.fward();			
			}
			if( Tank.backward === true ){
				Tank.bward();			
			}
			if( Tank.left === true ){
				Tank.turnLeft();			
			}
			if( Tank.right === true ){
				Tank.turnRight();			
			}
						
			if( Tank.move === true ){
				Tank.checkBodyCollition();	
				Tank.checkPosition();
			}*/
			
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
			TANK HEAD
		*/
		
		win.tanks.forEach( function( Tank, i ){
			
			/*
				HEAD
			*/
			
			/*if( Tank.head.isTurningRight === true ){
				Tank.head.turnRight();			
			}
			if( Tank.head.isTurningLeft === true ){
				Tank.head.turnLeft();			
			}*/

			moveVehicle.call( Tank.head );
			
			Tank.head.update();
			
			Tank.head.draw();
			
		});
		
		win.crates.forEach( function( Crate, i ){
			
			Crate.update();
			
			Crate.draw();
			
		});
		
		win.airplanes.forEach( function( Airplane, i ){
			
			
			if( Airplane.forward === true ){
				Airplane.fward();			
			}
			if( Airplane.backward === true ){
				Airplane.bward();			
			}
			if( Airplane.left === true ){
				Airplane.turnLeft();			
			}
			if( Airplane.right === true ){
				Airplane.turnRight();			
			}
						
			if( Airplane.move === true ){
				Airplane.checkBodyCollition();	
				Airplane.checkPosition();
			}
			
			
			Airplane.draw();
			
		});
		

		win.ctxPlay.drawImage( win.canv, 0,0,ctxPlay.canvas.width, ctxPlay.canvas.height);

		

		
		win.requestAnimFrame( gameLoop );
	};
	
	return {
		start: function(){
			createCanvas();
			createBackground();
			createBarrier();
			createTanks();
			gameLoop();		
		}
	}
	
	
})( window, document, window.tank);

game.start();