( function( win, doc, undef ){

	var keyDown = function( event ){

			switch( event.keyCode ){
				case 38: // up	
					tanks[0].forward = true;
					break;
				case 40: // down
					tanks[0].backward = true;
					break;
				case 37: // left
					tanks[0].left = true;	
					break;
				case 39: // right
					tanks[0].right = true;
					break;
				case 65: // a - turn head left
					tanks[0].head.isTurningLeft = true;
					break;
				case 68: // d - turn head right
					tanks[0].head.isTurningRight = true;
					break;
				case 32: // space	
					tanks[0].head.shot();
					break;
			}
		},
		keyUp = function( event ){
		
			switch( event.keyCode ){
				case 38: // up
					tanks[0].forward = false;
					break;
				case 40: // down
					tanks[0].backward = false;
					break;
				case 37: // left
					tanks[0].left = false;	
					break;
				case 39: // right
					tanks[0].right = false;
					break;
				case 65: // a
					tanks[0].head.isTurningLeft = false;
					break;
				case 68: // d
					tanks[0].head.isTurningRight = false;
					break;
			}
	};

	doc.addEventListener( 'keydown', keyDown, false );
	
	doc.addEventListener( 'keyup', keyUp, false );	
	
	
})( window, document );