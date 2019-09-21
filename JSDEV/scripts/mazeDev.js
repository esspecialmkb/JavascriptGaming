var map = [];

var regionCount = 0;
var newRegionId = function() {
	regionCount += 1;
	return regionCount;
};

// HSV to RGB conversion utility
// from https://en.wikipedia.org/wiki/HSL_and_HSV#To_RGB
convertHSV = funtion(hue, value, saturation) {
	var chroma = value * saturation;
	var huePrime = hue / 60;
	var x = c * (1 - Math.abs(
};

var regionList = [];

var region = {
	locX	: null,		// Room location
	locY	: null,
	dimX	: null,		// Room dimensions/size
	dimY	: null,

	id	: null,
	type	: null,		// Room or path?

	fillStyle	: null,

	create	: function( x, y, sx, sy, id, type, fill ) {
		var obj = Object.create(this);
		
		this.locX = x;
		this.locY = y;
		this.dimX = sx;
		this.dimY = sy;

		this.id = id;
		this.type = type;
		this.fillStyle = fill;
		
		return obj;
	}
};

var mapH = 63;
var mapW = 63;

var tileSize = 10;

for( var i = 0; i < mapW * mapH; ++i) {
	map.push(0);
}
		

window.onload = function()
{
	currentFrameTime = Date.now();
	
	canvas = document.getElementById('canvas');
	console.log(canvas.width );
	console.log(canvas.height) ;
	ctx = canvas .getContext("2d");

	genMap();

	requestAnimationFrame(drawGame);
	ctx.font = "bold 10pt sans-serif";
			
};

genMap = function() {
	// Set limits on room dimensions
	var minRoomSize = 5;
	var maxRoomSize = 11;
	
	// Set max room attempts
	var roomAttempts = 50;	

	for( var r = 0; r < roomAttempts; ++r) {
		genRoom(minRoomSize, maxRoomSize);
	}
	
	console.log("Num Regions :" + regionList.length );
};

genRoom = function(min, max) {
	// Generate the room size
	var rX = Math.floor( Math.random() * ( max - min) ) + min;
	var rY = Math.floor( Math.random() * ( max - min) ) + min;

	// Generate the room position
	var pX = Math.floor( Math.random() * (mapW - rX) );
	var pY = Math.floor( Math.random() * (mapH - rY) );

	// Make sure room dimensions are odd numbered
	if( (rX % 2) == 0) { rX = rX + 1;}
	if( (rY % 2) == 0) { rY = rY + 1;}

	// Make sure room positions are odd numbered as well
	if( (pX % 2) == 0) { pX = pX - 1;}
	if( (pY % 2) == 0) { pY = pY - 1;}

	// Make sure room position is valid
	if( pX <= 0) { pX = 1;}
	if( pX <= 0) { pX = 1;}

	// Make sure that this room doesnt overlap another
	var passing = 0;

	for(var iX = -2; iX < rX + 2; ++iX) {
		for( var iY = -2; iY < rY + 2; ++iY) {
			if(map[ (( (iY + pY) * mapH) + (iX + pX) ) ] > 0) {
				// Returning here
				return false;
			}
		}
	}
	
	// Return if the previous check fails, otherwise fill in the tiles
	if(passing > 0) {
		// Attempting to return here for some reason causes rooms to overlap
		return false;
	}else if(passing == 0) {
		var newRegion = region.create( pX, pY, rX, rY, newRegionId(), 1, "green" );
		for(var iX = 0; iX < rX; ++iX) {
			for( var iY = 0; iY < rY; ++iY) {
				map[ (( (iY + pY) * mapH) + (iX + pX) ) ] = 1;
			}
		}
		regionList.push( newRegion );
		return true;
	}
};

drawGame = function() {
	ctx.fillStyle = "black";
	ctx.clearRect(0,0, 640, 640);

	for(var y = 0; y < mapH; ++ y) {
		for( var x = 0; x < mapW; ++x) {
			switch( map[(( y * mapH) + x )] )
			{
				case 0:
					ctx.fillStyle = "grey";
					ctx.strokeStyle = "white";
					break;
				case 1:
					ctx.fillStyle = "green";
					ctx.strokeStyle = "black";
					break;
				default:
					ctx.fillSyle = "grey";
					ctx.strokeStyle = "black";
			}

			ctx.fillRect( x * tileSize, y * tileSize, tileSize, tileSize);
			ctx.strokeRect( x * tileSize, y * tileSize, tileSize, tileSize);
		}
	}
	requestAnimationFrame(drawGame);
};
