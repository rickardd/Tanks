/*
 *
 *	Global constants, variables and methods
 *
 *
*/


window.requestAnimFrame = (function(){
	return window.mozRequestAnimationFrame;	
})( window );

window.tanks = [];
window.airplanes = [];
window.humans = [];
window.shots = [];
window.crates = [];
window.barriers = [];
window.collitionArray = [];
window.background = { bubble: [] };

window.gameArea = document.getElementById( 'game-area' );
	

window.player = {};

/*(function(){

	this.player = {};

	this.setPlayer = (function(){

		this.player = player;

	});

})();*/





/*
	TITLE
*/

(function( doc ){

	//var i = setInterval( function( i ){

		var title = doc.getElementsByTagName('title')[0];

		title.text = 'set title';


	//}, 300);

})(document);



/*
 *
 * EXTEND
 *
 * Takes number of "consturctors/prototypes/classes/objects" as argument and return a merged object. 
 * One way to use it is to add it to a prototype of an other object. Please note that values that sets before 
 * extending to the prototype will not inherit the value from the extending object. 
 *
 * exempel: Obj.prototype = extend( Obj2, Obj3...);
 *	
 *	
*/

(function(){
    
    this.extend = (function(){ 
        var classLen = arguments.length,        
            i = 0,
            returnObject = {},
            Class;                           
    
        for( i; i < classLen; i++ ){
			
			Class =  new arguments[i];
			
            for( name in Class ){

                returnObject[name] = Class[name];
            }
        }       

        return returnObject; 
    });

})();



/*var Obj2 = function(){
	   
    this.val2 = 1;
    this.setVal2 = function( val ){
    	this.val2 = val;
    }
};


var Obj1 = function(){
    
    
    this.setVal2( 1111 );
    this.init();
    
    console.log( 'val2',this.val2);
};

Obj1.prototype = extend( Obj2 );

Obj1.prototype.init = function(){
    

    this.val1 = 1;
    this.obj1Func = function(){
    
    };
    }
        
var Obj2 = function(){
   
    this.val2 = 1;
    this.setVal2 = function( val ){
    	this.val2 = val;
    }
};
    
var inst1 = new Obj1();    
 
//console.dir( inst1 );*/




/*
	ANGLE CALC
*/

(function(){
	
	this.angleCalc = (function( angle, x, y, width, height, speed ){
		var newx = speed * Math.cos( angle * ( Math.PI / 180) ),
		newy = speed * Math.sin( angle * ( Math.PI / 180) );
	
		return { x: newx, y: newy };			
	});
	
})();


/*
	CHECK COLLITION
*/

(function(){
	
	this.checkCollition = (function(){
		var that = this, win = window;
		
		win.collitionArray.forEach( function( obj, i ) {
			
			var horisontalHit = false, 
				verticalHit = false,
				//htw = that.width/2, // half tank width. Becouse transitions and rotations att drawing tank.	 
				tL = that.collitionX/* - htw*/, tR = that.collitionX + that.width /*- htw*/, oL = obj.x, oR = obj.x + obj.width,
				//hth = that.height/2, // half tank height. Becouse transitions and rotations att drawing tank.	 
				tT = that.collitionY, tB = that.collitionY + that.height, oT = obj.y, oB = obj.y + obj.height;
				
			win.tT = tT;
			win.tB = tB;
			win.tL = tL;
			win.tR = tR;							
			win.oT = oT;
			win.oB = oB;
			
			// Check collition horisontal
			
			if( 
				tL < oL && tR > oL ||
				tL < oR && tR > oR ||
				tL > oL && tR < oR || 
				tL < oL && tR > oR
			){
				horisontalHit = true;
			}
			
			// Check collition vertical
			
			if( 
				tT < oT && tB > oT ||
				tT < oB && tB > oB ||
				tT > oT && tB < oB || 
				tT < oT && tB > oB
			){
				verticalHit = true;
			}
			
			//if( horisontalHit === true && verticalHit === true ){
			if(  verticalHit === true && horisontalHit === true ){	
				
				if( that.forward === true ){
					that.stopFWard = true;
					that.forward = false;	
				}
				if( that.backward === true ){
					that.stopBWard = true;
					that.backward = false;	
				}
		
				console.count( 'collition' );
			}
			else{
				that.stopFWard = false;
				that.stopBWard = false;
			}
			
		});
	
	});
		
})();	

    