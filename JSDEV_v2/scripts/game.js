// Game Object
var game = (function () {
    // Tilemap Array is hosted in the game object
    var _gameMap = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0,
	0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0,
	0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0,
	0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0,
	0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0,
	0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0,
	0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0,
	0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0,
	0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
	0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
	0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0,
	0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
	0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
	0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
	0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
	0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0,
	0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0,
	0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ];

    // Map dimensions
    var _mapH = 20;
    var _mapW = 20;

    // Global game data
    var _gameFieldHeight = 400;
    var _entities = [];
    var _player = null;

    // * Members for time tracking
    var _currentTime = null;
    var _lastTime = null;
    var _deltaTime = null;

    function _start() {
        //_entities.push(new Player(200, 200));
        //_entities.push(new Enemy(20, 25));
        //_entities.push(new Enemy(80, 25));
        //_entities.push(new Enemy(160, 25));

	this.addEntity( new Player(200, 200) );
	
	_currentTime = Date.now();

        window.requestAnimationFrame(this.update.bind(this));
    }

    function _update( time ) {
	_lastTime = _currentTime;
	_currentTime = Date.now();
	_deltaTime = _currentTime - _lastTime;

	//console.log("Time : " + time + ", Delta : " + _deltaTime);
        physics.update(_deltaTime);

        var i;
        for( i=0; i<_entities.length; i++) {
            _entities[i].update();
	
	    // Update the viewport with the player's position
	    if( _entities[1] instanceof Player ) {
		renderer.updateViewPort(_entities[i].x + (_entities[i].width/2) , _entities[i].y + (_entities[i].width/2));
	    }
        }

        renderer.render();

	_lastTime = _currentTime;
        window.requestAnimationFrame(this.update.bind(this));
    }

    function _addEntity( entity ) {
	_entities.push( entity );

	if( entity instanceof Player ) {
	    _player = entity;
	}

	if( entity instanceof Enemy ) {
	    // Setup FSM for enemy
	}
    }

    function _placeEntityAt( entity, x, y ) {
	entity.tileX = Math.floor( x / renderer.tileSize() );
	entity.tileY = Math.floor( y / renderer.tileSize() );

	entity.x = (entity.tileX * renderer.tileSize()) - (entity.width/2);
	entity.y = (entity.tileY * renderer.tileSize()) - (entity.height/2);
    }

    return {
        start: _start,
        update: _update,
        entities: function () { return _entities; },
        gameFieldHeight: function () { return _gameFieldHeight; },
	getMapTile: function (x, y) { return _gameMap[ ((y * _mapW) + x)]; },
	mapWidth: function () { return _mapW; },
	mapHeight: function () { return _mapH; },
	player: function () { return _player; },
	addEntity : _addEntity,
	deltaTime : _deltaTime
    };

})();

//*** Using onload="game.start()" within canvas html tag ***//
game.start();
