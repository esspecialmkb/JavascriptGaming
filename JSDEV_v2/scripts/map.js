// ----------------------------------------------------------------
// MAP ENGINE AND TILE OBJECT
// Tile object stores information for each tile
function Tile(tx, ty, tt) {
    this.x = tx;
    this.y = ty;
    this.type = tt;
    this.roof = null;
    this.roofType = 0;
    this.eventEnter = null;	// Can be a function pointer to execute event or null
}

// ----------------------------------------------------------------
// We need a map system that will manage all of the Tiles on the map
// Not sure if viewport should be handled by Map system or render system
var map = (function () {
    var _gameMap = [
	0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 2, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 0,
	0, 2, 3, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 0,
	0, 2, 3, 1, 4, 4, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 0,
	0, 2, 3, 1, 1, 4, 4, 1, 2, 3, 3, 2, 1, 1, 2, 1, 0, 0, 0, 0,
	0, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 2, 2, 2, 2, 1, 1, 1, 1, 0,
	0, 1, 1, 1, 1, 2, 4, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0,
	0, 1, 1, 1, 1, 2, 4, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0,
	0, 1, 1, 1, 1, 2, 4, 4, 4, 4, 4, 1, 1, 1, 2, 2, 2, 2, 1, 0,
	0, 1, 1, 1, 1, 2, 3, 2, 1, 1, 4, 1, 1, 1, 1, 3, 3, 2, 1, 0,
	0, 1, 2, 2, 2, 2, 1, 2, 1, 1, 4, 1, 1, 1, 1, 1, 3, 2, 1, 0,
	0, 1, 2, 3, 3, 2, 1, 2, 1, 1, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4,
	0, 1, 2, 3, 3, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0,
	0, 1, 2, 3, 4, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 1, 2, 1, 0,
	0, 3, 2, 3, 4, 4, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 2, 1, 0,
	0, 3, 2, 3, 4, 4, 3, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 3, 0,
	0, 3, 2, 3, 4, 1, 3, 2, 1, 3, 1, 1, 1, 2, 1, 1, 1, 2, 3, 0,
	0, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 1, 1, 2, 2, 2, 2, 2, 3, 0,
	0, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 4, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ];

    var _roofList = [				// Roof data
	{ x:5, y:3, w:4, h:7, data: [
	    10, 10, 11, 11,
	    10, 10, 11, 11,
	    10, 10, 11, 11,
	    10, 10, 11, 11,
	    10, 10, 11, 11,
	    10, 10, 11, 11,
	    10, 10, 11, 11
	]},
	{ x:15, y:5, w:5, h:4, data: [
	    10, 10, 11, 11, 11,
	    10, 10, 11, 11, 11,
	    10, 10, 11, 11, 11,
	    10, 10, 11, 11, 11
	]},
	{ x:14, y:9, w:6, h:7, data: [
	    10, 10, 10, 11, 11, 11,
	    10, 10, 10, 11, 11, 11,
	    10, 10, 10, 11, 11, 11,
	    10, 10, 10, 11, 11, 11,
	    10, 10, 10, 11, 11, 11,
	    10, 10, 10, 11, 11, 11,
	    10, 10, 10, 11, 11, 11
	]}
    ];

    var _floorTypes = {				// Tile type data
	solid :0,
	path :1,
	water :2
    };

    var _tileTypes = {				// Tile type definition data
	0 : { color:"black", floor:_floorTypes.solid },
	1 : { color:"green", floor:_floorTypes.path },
	2 : { color:"tan", floor:_floorTypes.path },
	3 : { color:"brown", floor:_floorTypes.solid },
	4 : { color:"blue", floor:_floorTypes.water },

	10 : { color:"grey", floor:_floorTypes.solid },
	11 : { color:"grey", floor:_floorTypes.solid }
    };
    var _mapW = 20;
    var _mapH = 20;

    // Map class data
    var _mapData = [];				// Array of Tile objects
    var _w = 0;
    var _h = 0;
    var _tileSize = 40;
    
    function _buildMapFromData( d, w, h ) {
	// Use internal array if values are null
	if( d == null || w == null || h == null) {
	    d = _gameMap;
	    w = _mapW;
	    h = _mapH;
	    console.log("Using internal map");
	}
	_w = w;
	_h = h;

	// Check the array length
	if( d.length != (w * h) ) { return false; }
	_mapData.length = 0;

	// Populate the map
	for( var y = 0; y < h; y++ ) {
	    for( var x = 0; x < w; x++ ) {
		_mapData.push( new Tile( x, y, d[ (( y*w ) + x) ] ) );
	    }
	}
    };

    function _addRoofs( roofs ) {
	for( var i in roofs ) {
	    var r = roofs[i];

	    if( r.x < 0 || r.y < 0 || r.x >= _w || r.y >= _h || (r.x + r.w) > _w || (r.y + r.h) > _h || r.data.length != (r.w * r.h)) {
		continue; 			// Skip this item in the list if position is invalid	
	    }

	    for( var y = 0; y < r.h; y++ ) {
	        for( var x = 0; x < r.w; x++ ) {
		    var tileIdx = (( ( r.y + y) * this.w) + r.x + x);

		    _mapData[ tileIdx ].roof = r;
		    _mapData[ tileIdx ].rootType = r.data[ (( y* r.w) + x) ];
	        }
	    }
	}
    };

    return {
	buildMap : function() { _buildMapFromData(); },
	getTileTypes : function( index ) { return _tileTypes[index]; },
	tileSize : function() { return _tileSize; },
	width : function() { return _mapW; },
	height : function() { return _mapH; },
	getTile : function( x, y ) { return _mapData[ (y * _w) + x ]; },
	getTileByIndex : function( index ) { return _mapData[ index ]; }
    };
    
}) ();