var Obj1 = function(){
    this.val1 = 1;
    this.val2 = 2;
};

Obj1.prototype.prot1 = function(){
    this.protVal1 = 'protVal1';
};

Obj1.prototype.setProt1Value = function( val ){
    this.val1 = val;
};


var Obj2 = function(){
    this.val21 = 1;
    this.val22 = 2;
};

Obj2.prototype.prot2 = function(){
    this.protVal2 = 'protVal1';
};


var Obj3 = function(){
    this.x = Obj1.prototype;
    this.val3 = 1;
    this.val4 = 2;
};

//Obj3.prototype.x = Obj1.prototype;
//Obj3.prototype.y = Obj2.prototype;



var Ins = new Obj3;

Ins.x.setProt1Value( 7987989 );

console.log( Ins  );
