var Vector2d = function( x, y) {
    this.x = x;
    this.y = y;
}

var Rectangle = function( x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
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
function Enemy( x, y, speed, direction ) {

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
// The render system takes care of canvas drawing
var renderer = (function () {
    function _render( canvas ) {
	var canvas = document.getElementById("canvas-layer");
	var context = canvas.getContext("2d")

	// Loop through all drawable entities
	var screenW = canvas.width;
	var screenH = canvas.height;

	context.fillStyle = "gray";
	context.fillRect( 0,0, screenW, screenH );
    }

    return {
	render: _render
    };
}) ();

// ----------------------------------------------------------------
// The core system serves as the root of the java-script engine
var core = (function () {
    var _canvas = null;
    var _currentTime = null;
    var _lastTime = null;
    var _deltaTime = null;

    var _entityList = [];

    function _log( message ) {
	console

    // The start method gets the core system ready
    function _start() {
	_canvas = document.getElementById("canvas-layer");
	_currentTime = Data.now();

	window.requestAnimationFrame( this.update.bind(this) );
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

    return {
	start: _start,
	update: _update
    };
}) ();
