( function( win, doc, undef ){

	var keyDown = function( event ){

		var player = win.player;

			switch( event.keyCode ){
				case 38: // up	
					player.forward = true;
					break;
				case 40: // down
					player.backward = true;
					break;
				case 37: // left
					player.left = true;	
					if( player.turningOnce === true ){
						player.stopTurning = true;
					}
					break;
				case 39: // right
					player.right = true;
					break;
				case 65: // a - turn head left
					player.head.isTurningLeft = true;
					break;
				case 68: // d - turn head right
					player.head.isTurningRight = true;
					break;
				case 32: // space	
					player.head.shot();
					break;
			}
		},
		keyUp = function( event ){
		
			switch( event.keyCode ){
				case 38: // up
					player.forward = false;
					break;
				case 40: // down
					player.backward = false;
					break;
				case 37: // left
					player.left = false;
					if( player.turningOnce === true ){
						player.stopTurning = false;
					}	
					break;
				case 39: // right
					player.right = false;
					break;
				case 65: // a
					player.head.isTurningLeft = false;
					break;
				case 68: // d
					player.head.isTurningRight = false;
					break;
			}
	};

	doc.addEventListener( 'keydown', keyDown, false );
	
	doc.addEventListener( 'keyup', keyUp, false );	
	
	
})( window, document );