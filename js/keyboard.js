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
				case 65: // a - turn Weapon left
					if( player.weaponInitiated === true ){
						player.weapon.isTurningLeft = true;
					}
					break;
				case 68: // d - turn Weapon right
					if( player.weaponInitiated === true ){
						player.weapon.isTurningRight = true;
					}
					break;
				case 32: // space	
					player.weapon.shot();
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
					if( player.weaponInitiated === true ){
						player.weapon.isTurningLeft = false;
					}
					break;
				case 68: // d
					if( player.weaponInitiated === true ){
						player.weapon.isTurningRight = false;
					}
					break;
			}
	};

	doc.addEventListener( 'keydown', keyDown, false );
	
	doc.addEventListener( 'keyup', keyUp, false );	
	
	
})( window, document );