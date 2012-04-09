

var game = (function( win, doc, tank, undef){
	
	var settings = {
		nrOfBubbles: 20	
	},
	createCanvas = function(){
		
		win.canv = doc.createElement('canvas');
		win.ctx = ( canv && canv.getContext('2d') ) ? canv.getContext('2d'): udef;
				
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
			console.info(' Game canvas not built');
		}
		
	},
	createBackground = function(){
		
		var len = settings.nrOfBubbles,
			i = 0;
			
			
		
		for( i; i < len; i++){
	
			background.bubble.push( new Bubble );
			
		}
		
		
	},
	createStatusBar = function(){
		
		win.statusBar = new StatusBar();
		
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

		for (var i = 0; i <= 4; i++) {
			win.humans.push( new Human( 700, 200) );				
		}

		win.player = tank;
		win.player.player = true;


	},
	blank = function(){
		
		var ctx = win.ctx;
		
		ctx.fillStyle = '#cdf1fa';
		ctx.fillRect( 0,0, ctx.canvas.width, ctx.canvas.height );
	
	},
	moveVehicle = function(){
		
		//if ( this.intelegens <= 0 ) { // Normal movment
			if( this.forward === true ){
				this.fward();			
			}
			if( this.backward === true ){
				this.bward();			
			}
			if( this.left === true /*&& this.stopTurning === false*/ ){
				this.turn( 'left' );			
			}
			/*
				DEBUGG
			if( this.label = 'Human' ){

				console.log( 'stop Turning', this.stopTurning);

				//console.log( xxxxxx = (this.left === true) , xxxxxxxxx = (this.stopTurning == false ));

				//debugger;

			}*/
			if( this.right === true /*&& this.stopTurning !== true */ ){
				this.turn( 'right');			
			}
						
			if( this.move === true ){
				this.checkBodyCollition();	
				this.checkPosition();
			}
		//};

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

			Human.update();

			if( Human.dead === true ){
				
				humans.splice( i, 1 );

				console.log( 'Human dead and removed' );
				win.statusBar.enemieKilled.push( { type: Human.label } );
			}
			
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
		
		win.tanks.forEach( function( Vehicle, i ){
			
			if( Vehicle.weaponInitiated === true ){

				rotateWeapon.call( Vehicle.weapon );
				
				Vehicle.weapon.update();
				
				Vehicle.weapon.draw();
			}

			
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
			STATUS
		*/
		( function( win ){
			win.statusBar.update();
			win.statusBar.draw();

		})(win);
		

		
		
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
			createStatusBar();
			createBarrier();
			createVehicle();
			gameLoop();		
		}
	}
	
	
})( window, document, window.tank);

game.start();