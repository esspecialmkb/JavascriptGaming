//	The Tilemap exists as a prototype of Entity
function Map( name, x, y, w, h) {
	Entity.call(this, name, x, y, w, h);
	
	// x and y are the offsetX and offsetY of the viewport
	// w and h are the dimensions of the map in tiles
	
	this.tiles = [];	//	Equal to w * h tiles when generated
	this.tileSize = 40;
	
	//Linear Congruential Generator Settings
	this.seed = 0;
	this.rndMod = 7829;	//	Max period of rnd generator
	this.rndMult = 378;	//	Multiplier
	this.rndIncr = 2310;//	Incrementor
	this.intSeed = 0;	//	Initial seed for next value
}

Map.prototype = Object.create( Entity.prototype );

Map.prototype.update = function( dt ) {
	Entity.prototype.update.call( this, dt );
}

Map.prototype.setPosition = function(x, y) {
	Entity.prototype.setPosition.call(this,x, y);
	
}

Map.prototype.initMap = function() {
	for( var tY = 0; tY < this.h; tY++){
		for( var tX = 0; tX < this.w; tX++){
			if( tX == 0 || tX == this.w-1 || tY == 0 || tY == this.h-1){
				this.tiles.push(0);
			}else{
				this.tiles.push(1);
			}
		}
	}
}

//	Random generator functions
Map.prototype.setSeed = function( seed ) {
	this.seed = seed || Math.random() * 9999;
	this.intSeed = this.seed;
}

Map.prototype.nextRnd = function() {
	this.seed = (this.seed * this.rndMult + this.rndIncr) % this.rndMod;
	return this.seed;
}