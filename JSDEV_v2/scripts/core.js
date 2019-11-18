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
	console.log( message );
    };

    // The start method gets the core system ready
    function _start() {
	_canvas = document.getElementById("canvas");
	_canvas.width = 400;
	_canvas.height = 400;
	_currentTime = Date.now();
	
	console.log("Start loop");

	//if(!_started) {
	    _addEntity( new Player( 200, 200, 0.5, 0));
	    map.buildMap();
	    renderer.initViewport( 40, 400, 400);	    
	    window.requestAnimationFrame( _update.bind(this) );
	    _started = true;
	//}
    };

    // Main loop
    function _update() {
	_lastTime = _currentTime;
	_currentTime = Date.now();
	_deltaTime = _currentTime - _lastTime;

	// Call the update methods of the other systems
	// Physics - Collisions (Movement)
	_player.update(_deltaTime);
	physics.update(_deltaTime);	

	// AI - Enemy control behaviors

	// Combat - Weapons, attack status, Collisions (Attacking)

	if(_player){
	    // Moving player update method to physics.update
	    //_player.update( _deltaTime );
	    //renderer.updateViewport(_player.x , _player.y);
	}
	// Rendering
	renderer.render(_canvas);	


	window.requestAnimationFrame( _update.bind(this) );
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