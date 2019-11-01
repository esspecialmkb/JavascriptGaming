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
// The render system takes care of canvas drawing
var renderer = (function () {
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

    function _render( canvas ) {
	var canvas = document.getElementById("canvas-layer");
	var context = canvas.getContext("2d")

	// Loop through all drawable entities
	var screenW = canvas.width;
	var screenH = canvas.height;

	context.fillStyle = "gray";
	context.fillRect( 0,0, screenW, screenH );

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

    var _tileTypes = 

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
	    window.requestAnimationFrame( this.update.bind(this) );
	    _started = true;
	}
    }

    // Main loop
    function _update() {
	_lastTime = _currentTime;
	_currentTime = Date.now();
	_deltaTime = _currentTime - _lastTime;

	// Call the update methods of the other systems

	// Input - Keyboard, Mouse and Touch events
	// Physics - Collisions (Movement)
	// AI - Enemy control behaviors
	// Combat - Weapons, attack status, Collisions (Attacking)
	// Rendering

	window.requestAnimationFrame( this.update.bind(this) );
    }

    function _addEntity( entity ) {
	_entityList.push( entity );

	if( entity instanceof Player ) {
	    _player = entity;
	}
	if( entity instanceof Enemy ) {
	    _enemies.push( entity );
	}
    }

    function _removeEntities( entities ) {
	if( !entities ) return;

	function isNotInEntities( item ) { return !entities.includes(item); }
	_entities = _entities.filter( isNotInEntities );
	_enemies = _enemies.filter( isNotInEntities );

	if(entities.includes(_player) ){
	    _player = undefined;
	}
    }

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
