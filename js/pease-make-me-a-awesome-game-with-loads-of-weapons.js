

( function(win, doc, undef){




	var scriptss = ['global', 'background', 'statistics', 'barriers', 'weapon', 'vehicle', 'game', 'keyboard'];

	scriptss.forEach(function( scriptName, i ){

		var script = doc.createElement( 'script' );
		
		script.src = 'js/' + scriptName + '.js';

		doc.body.appendChild( script );	

	});

	doc.body.removeChild( doc.scripts[0] );

	

})(window, document);



/*  <script src="js/global.js"></script>
	<script src="js/background.js"></script>	
	<script src="js/barriers.js"></script>
	<script src="js/weapon.js"></script>
	<script src="js/vehicle.js"></script>
	<script src="js/game.js"></script>
	<script src="js/keyboard.js"></script> */