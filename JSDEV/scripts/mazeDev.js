var map = [];

var cTime = 0;
var dTime = 0;
var lTime = 0;

var regionList = [];
var regionCount = 0;
var newRegionId = function() {
	regionCount += 1;
	return regionCount;
};

/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 * * Altered to convert h from (0, 360) range to (0, 1) *
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  v       The value
 * @return  Array           The RGB representation
 */
hsvToRgb = function (h, s, v){
    var r, g, b;

    var i = Math.floor((h / 360) * 6);
    var f = (h / 360) * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    switch(i % 6){
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return [r * 255, g * 255, b * 255];
}



function Region(){
	this.locX	= null;		// Room location
	this.locY	= null;
	this.dimX	= null;		// Room dimensions/size
	this.dimY	= null;

	this.id		= null;
	this.type	= null;		// Room or path?

	this.fillStyle	= null;
}

Region.prototype.init = function( x, y, sx, sy, id, type, fill ) {		
	this.locX = x;
	this.locY = y;
	this.dimX = sx;
	this.dimY = sy;

	this.id = id;
	this.type = type;
		
	rgb = hsvToRgb(Math.floor(Math.random() * 360), 1, 0.8);

	this.fillStyle = "rgb(" +rgb[0]+ " ," + rgb[1] + " ," + rgb[2] + ")";
};

Region.prototype.draw = function () {
	ctx.fillStyle = this.fillStyle;	
	ctx.strokeStyle = "black";	

	for(var y = 0; y < this.dimY; ++y) {
		for( var x = 0; x < this.dimX; ++x) {
			ctx.fillRect( (x + this.locX) * tileSize, (y + this.locY) * tileSize, tileSize, tileSize);
			ctx.strokeRect( (x + this.locX) * tileSize, (y + this.locY) * tileSize, tileSize, tileSize);
		}
	}
};

// /*
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
		
		var rgb = hsvToRgb(Math.floor(Math.random() * 360), 1, 0.8);

		this.fillStyle = "rgb(" +rgb[0]+ " ," + rgb[1] + " ," + rgb[2] + ")";
		
		return obj;
	},

	draw	: function() {
		ctx.fillStyle = this.fillStyle;	
		ctx.strokeStyle = "black";	

		for(var y = 0; y < this.dimY; ++y) {
			for( var x = 0; x < this.dimX; ++x) {
				ctx.fillRect( (x + this.locX) * tileSize, (y + this.locY) * tileSize, tileSize, tileSize);
				ctx.strokeRect( (x + this.locX) * tileSize, (y + this.locY) * tileSize, tileSize, tileSize);
			}
		}
	}
	
};

//*/

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
		// var newRegion = region.create( pX, pY, rX, rY, newRegionId(), 1, "green" );
		var newRegion = new Region();
		newRegion.init( pX, pY, rX, rY, newRegionId(), 1, "green");
		regionList.push( newRegion );

		for(var iX = 0; iX < rX; ++iX) {
			for( var iY = 0; iY < rY; ++iY) {
				map[ (( (iY + pY) * mapH) + (iX + pX) ) ] = 1;
			}
		}
		
		return true;
	}
};

drawGame = function(time) {

		

	ctx.fillStyle = "black";
	ctx.clearRect(0,0, 640, 640);


	for(var y = 0; y < mapH; ++ y) {
		for( var x = 0; x < mapW; ++x) {
			switch( map[(( y * mapH) + x )] )
			{
				case 0:
					ctx.fillStyle = "grey";
					ctx.strokeStyle = "white";
					ctx.fillRect( x * tileSize, y * tileSize, tileSize, tileSize);
					ctx.strokeRect( x * tileSize, y * tileSize, tileSize, tileSize);
					break;
				case 1:
					ctx.fillStyle = "green";
					ctx.strokeStyle = "black";
					break;
				default:
					ctx.fillSyle = "grey";
					ctx.strokeStyle = "black";
			}

			//ctx.fillRect( x * tileSize, y * tileSize, tileSize, tileSize);
			//ctx.strokeRect( x * tileSize, y * tileSize, tileSize, tileSize);
		}
	}

	for(var r = 0; r < regionList.length; ++r) {
		// For some reason, different regions are holding references to the same fillStyle, possibly the same location too
		regionList[r].draw();
	}	
				 
	requestAnimationFrame(drawGame);
};
