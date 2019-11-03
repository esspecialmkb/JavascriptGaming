// ----------------------------------------------------------------
// Vector2d support object
var Vector2d = function( x, y) {
    this.x = x;
    this.y = y;
}

function vectorAdd(v1, v2) {
    return new Vector2d(v1.x + v2.x, v1.y + v2.y);
}

function vectorSubtract(v1, v2) {
    return new Vector2d(v1.x - v2.x, v1.y - v2.y);
}

function vectorScalarMultiply(v1, s) {
    return new Vector2d(v1.x * s, v1.y * s);
}

function vectorLength(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
}

function vectorNormalize(v) {
    var reciprocal = 1.0 / (vectorLength(v) + 1.0e-037); // Prevent division by zero.
    return vectorScalarMultiply(v, reciprocal);
}

// ----------------------------------------------------------------
// Rectangle support object
var Rectangle = function( x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
}

Rectangle.prototype.left = function () {
    return this.x;
};

Rectangle.prototype.right = function () {
    return this.x + this.width;
};

Rectangle.prototype.top = function () {
    return this.y;
};

Rectangle.prototype.bottom = function () {
    return this.y + this.height;
};

Rectangle.prototype.intersects = function (r2) {
    return this.right() >= r2.left() && this.left() <= r2.right() &&
           this.top() <= r2.bottom() && this.bottom() >= r2.top();
};

function rectUnion(r1, r2) {
    var x, y, width, height;

    if( r1 === undefined ) {
        return r2;
    }
    if( r2 === undefined ) {
        return r1;
    }

    x = Math.min( r1.x, r2.x );
    y = Math.min( r1.y, r2.y );
    width = Math.max( r1.right(), r2.right() ) - Math.min( r1.left(), r2.left() );
    height = Math.max( r1.bottom(), r2.bottom() ) - Math.min( r1.top(), r2.top() );

    return new Rectangle(x, y, width, height);
}

// Entity System portion of refactor based on:
// https://www.briankoponen.com/html5-javascript-game-tutorial-space-invaders-part-1/
// ----------------------------------------------------------------
// Entity base class/object
function Entity( x, y, speed, direction ) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.direction = direction;
    this.w = 5;
    this.h = 5;
    this.hp = 1;
}

Entity.prototype.update = function( dt ) {
    this.time += dt;
}

Entity.prototype.collisionRect() {
    return new Rectangle(this.x - (this.w / 2), this.y - (this.h /2), this.w, this.h );
}

// ----------------------------------------------------------------
// The player object is based off of the Entity prototype/object
function Player( x, y, speed, direction) {
    Entity.call( this, x, y, speed, direction );

    this.w = 15;
    this.h = 30;
}

Player.prototype = Object.create( Entity.prototype );

Player.prototype.update = function( dt ) {
    Entity.prototype.update.call( this, dt );
    
    // Player-specific updates
}

// ----------------------------------------------------------------
// The enemy object is also based off of the Entity prototype/object
function Enemy( x, y, speed, direction) {
    Entity.call( this, x, y, speed, direction );

    this.w = 15;
    this.h = 30;
}

Enemy.prototype = Object.create( Entity.prototype );

Enemy.prototype.update = function( dt ) {
    Entity.prototype.update.call( this, dt );
    
    // Player-specific updates
}

// ----------------------------------------------------------------
// Encapsulate viewport into separate object
var Viewport = function (size) {
    // Members for viewport object
    var screenX = 0;
    var screenY = 0;
    var startTileX = 0;
    var startTileY = 0;
    var endTileX = 0;
    var endTileY = 0;
    var offsetX = 0;
    var offsetY = 0;
    var tileSize = size;
}

Viewport.prototype.updateViewport( px, py ) {
    //console.log("UpdateViewport at " + px + ", " + py);
    this.offsetX = Math.floor((this.screenX/2) - px); 	// (400/2) - 200 = 200
    this.offsetY = Math.floor((this.screenY/2) - py); 	// (400/2) - 200 = 200

    var tileX = Math.floor(px/this.tileSize);		// 200/40 = 10
    var tileY = Math.floor(py/this.tileSize);

    this.startTileX = tileX - 1 - Math.ceil((this.screenX/2) / this.tileSize);	// tileX:5 - 1 - ((400/2) / 40)
    this.startTileY = tileY - 1 - Math.ceil((this.screenY/2) / this.tileSize);

    if(this.startTileX < 0) { this.startTileX = 0; }
    if(this.startTileY < 0) { this.startTileY = 0; }

    this.endTileX = tileX + 1 + Math.ceil((this.screenX/2) / this.tileSize);
    this.endTileY = tileY + 1 + Math.ceil((this.screenY/2) / this.tileSize);

    if(this.endTileX >= map.width() ) { this.endTileX = map.width(); }
    if(this.endTileY >= map.height()) { this.endTileY = map.height(); }
}

// ----------------------------------------------------------------
// The render system takes care of canvas drawing
var renderer = (function () {
    var _viewport = new Viewport(20);
    var _entityColors = [ "rgb(150, 7, 7)",
			  "rgb(150, 89, 7)",
			  "rgb(56, 150, 7)",
			  "rgb(7, 150, 122)",
			  "rgb(46, 7, 150)",
			  "rgb(99, 66, 245)"];

    function _drawRectangle( context, color, entity ) {
	context.fillStyle = color;
	context.fillRect( entity.x - (entity.w / 2), entity.y - (entity.h / 2), entity.w, entity.h );
    }

    function _drawMap( context ) {
	for(var y = _viewport.startTileY; y < _viewport.endTileY; ++y)
	{
	    for(var x = _viewport.startTileX; x < _viewport.endTileX; ++x)
	    {
		// Get the Tile object data for the current tile data
		var mapTile = map.getTile( x, y);
		// Get the color for the fillStyle from the Tile data
		var tType = map.tileTypes( mapTile.type );
		context.fillStyle = tType.color;
		// Draw the tile with the offset
		context.fillRect( _viewport.offsetX + (x * _viewport.tileSize), _viewport.offsetY + (y * _viewport.tileSize), _viewport.tileSize, _viewport.tileSize);
	    }
	}
    }

    function _render( canvas ) {
	var canvas = document.getElementById("canvas-layer");
	var context = canvas.getContext("2d")

	// Loop through all drawable entities
	var screenW = canvas.width;
	var screenH = canvas.height;

	context.fillStyle = "gray";
	context.fillRect( 0,0, screenW, screenH );

	_drawMap( context );

	var i,
	    entity,
	    entities = core.entites();

	for( i = 0; i < entities.length; i++ ) {
	    entity = entities[i];

	    if( entity instanceof Enemy ) {
		_drawRectangle( _entityColors[0], entity);
	    } else if( entity instanceof Player ) {
		_drawRectangle( _entityColors[5] ,entity);
	    }
	}
    }

    return {
	updateViewport: function( target ){ _viewport.updateViewport( target.x, target.y ); },
	render: _render
    };
}) ();

// ----------------------------------------------------------------
// The physics system deals with collisions and gravity
var physics = (function () {
    function _update( dt ) {
	var i,
	    e,
	    velocity,
	    entities = core.entities();

	for( i = 0; i < entities.length; i++ ) {
	    e = entities[i];
	    //velocity = vectorScalarMultiply( e.direction, e.speed);
	    //e.position = vectorAdd( e.position, vectorScalarMultiply( velocity, dt ) );
	}
    }

    return {
	update: _update
    };
}) ();

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
	buildMap : function() { _buildMapFromData( _gameMap, _mapW, _mapH ); },
	tileTypes : function( index ) { return _tileTypes[index]; },
	tileSize : function() { return _tileSize; },
	mapWidth : function() { return _mapW; },
	mapHeight : function() { return _mapH; },
	getTile : function( x, y ) { return _mapData[ (y * _w) + x ]; },
	getTileByIndex : function( index ) { return _mapData[ index ]; }
    };
    
}) ();

// ----------------------------------------------------------------
// The core system serves as the root of the java-script engine
var core = (function () {
    var _canvas = null;
    var _currentTime = null;
    var _lastTime = null;
    var _deltaTime = null;

    var _entityList = [];	// Array of all entities
    var _enemies = [];		// Array of all enemies
    var _player = null;		// Reference to the player object

    var _started = false;	// True if the game loop is running

    function _log( message ) {
	console

    // The start method gets the core system ready
    function _start() {
	_canvas = document.getElementById("canvas-layer");
	_currentTime = Data.now();

	if(!_started) {
	    map.buildMap();
	    window.requestAnimationFrame( this.update.bind(this) );
	    _started = true;
	}
    };

    // Main loop
    function _update() {
	_lastTime = _currentTime;
	_currentTime = Date.now();
	_deltaTime = _currentTime - _lastTime;

	// Call the update methods of the other systems
	// Input - Keyboard, Mouse and Touch events
	physics.update(_deltaTime);	// Physics - Collisions (Movement)
	// AI - Enemy control behaviors
	// Combat - Weapons, attack status, Collisions (Attacking)
	if(_player){
	    renderer.updateViewport(_player);
	}
	renderer.render(_canvas);	// Rendering


	window.requestAnimationFrame( this.update.bind(this) );
    };

    function _addEntity( entity ) {
	_entityList.push( entity );

	if( entity instanceof Player ) {
	    _player = entity;
	}
	if( entity instanceof Enemy ) {
	    _enemies.push( entity );
	}
    };

    function _removeEntities( entities ) {
	if( !entities ) return;

	function isNotInEntities( item ) { return !entities.includes(item); }
	_entities = _entities.filter( isNotInEntities );
	_enemies = _enemies.filter( isNotInEntities );

	if(entities.includes(_player) ){
	    _player = undefined;
	}
    };

    return {
	start: _start,
	update: _update,
	addEntity: _addEntity,
	entities: function () { return _entityList; },
	enemies: function () { return _enemies; },
	player: function () { return _player; },
	gameFieldRect: function () { return _gameFieldRect; }
    };
}) ();

// ------------------------------------------
// The Player Actions object encapsulates input parsing
var playerActions = (function () {
    var _ongoingActions = [];

    function _startAction(id, playerAction) {
	//console.log("playerActions() call");
        if( playerAction === undefined ) {
            return;
        }

        var f,
            acts = {"moveDown":  function () { if(core.player()) core.player().moveDown(true); },
		    "moveUp":  function () { if(core.player()) core.player().moveUp(true); },
		    "moveLeft":  function () { if(core.player()) core.player().moveLeft(true); },
                    "moveRight": function () { if(core.player()) core.player().moveRight(true); },
		  //"dodge": function () { if(core.player()) core.player().dodge(); },
                    "attack":      function () { if(core.player()) core.player().attack(); } };

        if(f = acts[playerAction]) f();

        _ongoingActions.push( {identifier:id, playerAction:playerAction} );
    }

    function _endAction(id) {
        var f,
            acts = {"moveDown":  function () { if(core.player()) core.player().moveDown(false); },
		    "moveUp":  function () { if(core.player()) core.player().moveUp(false); },
		    "moveLeft":  function () { if(core.player()) core.player().moveLeft(false); },
                    "moveRight": function () { if(core.player()) core.player().moveRight(false); } };

        var idx = _ongoingActions.findIndex(function(a) { return a.identifier === id; });

        if (idx >= 0) {
            if(f = acts[_ongoingActions[idx].playerAction]) f();
            _ongoingActions.splice(idx, 1);  // remove action at idx
        }
    }

    return {
        startAction: _startAction,
        endAction: _endAction
    };
})();


// ------------------------------------------
// Keyboard
var keybinds = { 16: "dodge",		// Shift
		 32: "attack",		// Space
                 37: "moveLeft",
		 38: "moveUp",
                 39: "moveRight",
		 40: "moveDown" };

function keyDown(e) {
    var x = e.which || e.keyCode;  // which or keyCode depends on browser support

    if( keybinds[x] !== undefined ) {
        e.preventDefault();
        playerActions.startAction(x, keybinds[x]);
    }
};

function keyUp(e) {
    var x = e.which || e.keyCode;

    if( keybinds[x] !== undefined ) {
        e.preventDefault();
        playerActions.endAction(x);
    }
};

//document.body.addEventListener('keydown', keyDown);
//document.body.addEventListener('keyup', keyUp);

window.addEventListener('keydown' , keyDown );
window.addEventListener('keyup' , keyUp );



// ----------------------------------------------------------------
// Trigger the core.start method when the page loads (Experimental)
document.addEventListener('DOMContentLoaded', core.start);
