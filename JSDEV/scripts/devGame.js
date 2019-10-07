// Game Entities

// --- Player Object
function Player(x, y) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 20;
    this.direction = 0;

    // Movement flags
    this.movingUp = false;
    this.movingDown = false;
    this.movingLeft = false;
    this.movingRight = false;

    // Movement data
    this.moveSpeed = 1;
    this.directionX = 0;
    this.directionY = 0;
    this.tileX = 0;
    this.tileY = 0;
    this.tileToX = 0;
    this.tileToY = 0;
}

Player.prototype.update = function () {
    // The player's update function

    // * Get the player's tile position
    this.tileX = Math.floor( (this.x + (this.width/2)) / renderer.tileSize() );
    this.tileY = Math.floor( (this.y + (this.height/2)) / renderer.tileSize() );

    // * Adding the direction vector gives us the target tile
    this.tileToX = this.tileX + this.directionX;
    this.tileToY = this.tileY + this.directionY;

    //console.log("Player.update() " + this.tileX + ", " + this.tileY);
    //this.x += this.directionX;
    //this.y += this.directionY;
};

Player.prototype.updateDirection = function() {
    var x = 0;
    var y = 0;

    if( this.movingUp ) {
	y -= 1;
    }
    if( this.movingDown ) {
	y += 1;
    }
    if( this.movingLeft ) {
	x -= 1;
    }
    if( this.movingRight ) {
	x += 1;
    }
    
    this.directionX = x;
    this.directionY = y;
    //console.log("Player.updateDirection() " + x + ", " + y);
};

Player.prototype.moveUp = function(enable) {
    this.movingUp = enable
    this.updateDirection();
};

Player.prototype.moveDown = function(enable) {
    this.movingDown = enable;
    this.updateDirection();
};

Player.prototype.moveLeft = function(enable) {
    this.movingLeft = enable;
    this.updateDirection();
};

Player.prototype.moveRight = function(enable) {
    this.movingRight = enable;
    this.updateDirection();
};

Player.prototype.attack = function() {
    // Attack function
};

// --- Enemy Object
function Enemy(x, y) {
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
    this.direction = 1;

    // * Movement data
    this.moveSpeed = 3;
    this.directionX = 0;
    this.directionY = 0;
}

Enemy.prototype.update = function () {
    // Enemy update function
};

// --- Renderer Object
// Renderer will host the viewport object
var renderer = (function () {

    // Members for viewport object
    var _screenX = 0;
    var _screenY = 0;
    var _startTileX = 0;
    var _startTileY = 0;
    var _endTileX = 0;
    var _endTileY = 0;
    var _offsetX = 0;
    var _offsetY = 0;

    // Members for tile drawing
    var _tileH = 40;
    var _tileW = 40;

    // Members for general rendering
    //var _canvas = document.getElementById("game-layer");
    //var _context = _canvas.getContext("2d");
    var _enemyColors = ["rgb(150, 7, 7)",
			"rgb(150, 7, 7)",
			"rgb(150, 7, 7)",
			"rgb(150, 7, 7)",
			"rgb(150, 7, 7)"];
    
    // Viewport Update method
    function _updateViewport(px, py) {
	//console.log("UpdateViewport at " + px + ", " + py);
	_offsetX = Math.floor((_screenX/2) - px); 	// (400/2) - 200 = 200
	_offsetY = Math.floor((_screenY/2) - py); 	// (400/2) - 200 = 200

	var tileX = Math.floor(px/_tileW);		// 200/40 = 10
	var tileY = Math.floor(py/_tileH);

	_startTileX = tileX - 1 - Math.ceil((_screenX/2) / _tileW);	// tileX:5 - 1 - ((400/2) / 40)
	_startTileY = tileY - 1 - Math.ceil((_screenY/2) / _tileH);

	if(_startTileX < 0) { _startTileX = 0; }
	if(_startTileY < 0) { _startTileY = 0; }

	_endTileX = tileX + 1 + Math.ceil((_screenX/2) / _tileW);
	_endTileY = tileY + 1 + Math.ceil((_screenY/2) / _tileH);

	if(_endTileX >= game.mapWidth() ) { _endTileX = game.mapWidth(); }
	if(_endTileY >= game.mapHeight()) { _endTileY = game.mapHeight(); }
    }

    //Map draw method
    function _drawMap(context) {
	// Next, drawing loops
	for(var y = _startTileY; y < _endTileY; ++y)
	{
	    for(var x = _startTileX; x < _endTileX; ++x)
	    {
		// Select the fillStyle for the tile
		// *Needs to be changed to work with different map sizes
		switch( game.getMapTile(x, y) )
		{
		    case 0:
			context.fillStyle = "#000000";
			break;
		    default:
			context.fillStyle = "#ccffcc";
		}
		// Draw the tile with the offset
		context.fillRect( _offsetX + (x * _tileW), _offsetY + (y * _tileH), _tileW, _tileH);
			
		//Then, we close our loops
	    }
	}
	//console.log("Viewport - start[ " + _offsetX + " ,"  + _offsetY + " ]");
    }

    function _drawEnemy(context, enemy) {
        context.fillStyle = "red";
        context.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    }

    function _drawPlayer(context, player) {
        context.fillStyle = "blue";
	_updateViewport( player.x, player.y );

        context.fillRect(_offsetX + player.x, _offsetY + player.y, player.width, player.height);

	context.fillStyle = "red";
	context.fillRect(_offsetX + player.x - 2, _offsetY + player.y - 2, 4, 4);

	context.fillRect( _offsetX + ( player.tileToX * _tileW ), _offsetY + ( player.tileToY * _tileH), _tileW, _tileH);
	
	// We are also going to need to know if the player is using a melee attack
    }

    function _render() {
        var canvas = document.getElementById("game-layer");

	_screenX = canvas.width;
	_screenY = canvas.height;
	//console.log(_screenX, _screenY);
        var context = canvas.getContext("2d");

        context.fillStyle = "gray";
	context.fillRect( 0, 0, canvas.width, canvas.height );
        //context.clearRect(0, 0, canvas.width, canvas.height);
	
	_drawMap( context );

        var i,
            entity,
            entities = game.entities();

        for (i=0; i < entities.length; i++) {
            entity = entities[i];

            if( entity instanceof Enemy ) {
                //_drawEnemy(context, entity);
            }
            else if( entity instanceof Player ) {
                _drawPlayer(context, entity);
            }
        }
    }

    return {
        render: _render,
	tileSize: function () { return _tileH; },
	updateViewort: _updateViewport,
	getOffsetX: function () { return _offsetX; },
	getOffsetY: function () { return _offsetY; }
    };

})();

// --- Physics Object
var physics = (function () {

    function _update( deltaTime ) {
        var i,
            entities = game.entities();

        for( i=0; i<entities.length; i++) {
            // Process Physics Updates
	    //console.log("Entity update :" + i);

	    

	    if( game.getMapTile( entities[i].tileToX, entities[i].tileToY ) == 0) {
		// Get the boundaries of the tile
//context.fillRect(_offsetX + player.x, _offsetY + player.y, player.width, player.height);

	    	var minX = entities[i].tileToX * renderer.tileSize();
	    	var maxX = minX + renderer.tileSize();
	    	var minY = entities[i].tileToY * renderer.tileSize();
	    	var maxY = minY + renderer.tileSize();

		// directionX is greater than 0 when moving to the right
		if( entities[i].directionX > 0 ) {
		    if( ( entities[i].x + entities[i].width + entities[i].directionX ) > minX ) {
			entities[i].x = minX - entities[i].width;
		    }
		}
		
		// directionX is less than 0 when moving to the left
		if( entities[i].directionX < 0 ) {
		    if( ( entities[i].x + entities[i].directionX ) < maxX ) {
			entities[i].x = maxX;
		    }			
		}
		
		// directionY is greater than 0 when moving downwards
		if( entities[i].directionY > 0 ) {
		    if( ( entities[i].y + entities[i].height + entities[i].directionY ) > minY) {
			entities[i].y = minY - entities[i].height;
		    }
		}

		// directionY is less than 0 when moving upwards
		if( entities[i].directionY < 0 ) {
		    if( ( entities[i].y + entities[i].directionY ) < maxY ) {
			entities[i].y = maxY;
		    }
		}
	    }else{
		entities[i].x += entities[i].directionX * entities[i].moveSpeed;
		entities[i].y += entities[i].directionY * entities[i].moveSpeed;
	    }
	    //entities[i].x += Math.floor(xClip);
	    //entities[i].y += Math.floor(yClip);

	    //entities[i].x += entities[i].directionX * entities[i].moveSpeed// * (deltaTime / 10);
	    //entities[i].y += entities[i].directionY * entities[i].moveSpeed// * (deltaTime / 10);
        }
    }

    return {
        update: _update
    };

})();

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

    var _mapH = 20;
    var _mapW = 20;

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

        window.requestAnimationFrame(this.update.bind(this));
    }

    function _update( time ) {
	_currentTime = time;
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
	addEntity : _addEntity
    };

})();

//*** Using onload="game.start()" within canvas html tag ***//
//game.start();

//
// Player Actions
//
var playerActions = (function () {
    var _ongoingActions = [];

    function _startAction(id, playerAction) {
	//console.log("playerActions() call");
        if( playerAction === undefined ) {
            return;
        }

        var f,
            acts = {"moveDown":  function () { if(game.player()) game.player().moveDown(true); },
		    "moveUp":  function () { if(game.player()) game.player().moveUp(true); },
		    "moveLeft":  function () { if(game.player()) game.player().moveLeft(true); },
                    "moveRight": function () { if(game.player()) game.player().moveRight(true); },
                    "attack":      function () { if(game.player()) game.player().attack(); } };

        if(f = acts[playerAction]) f();

        _ongoingActions.push( {identifier:id, playerAction:playerAction} );
    }

    function _endAction(id) {
        var f,
            acts = {"moveDown":  function () { if(game.player()) game.player().moveDown(false); },
		    "moveUp":  function () { if(game.player()) game.player().moveUp(false); },
		    "moveLeft":  function () { if(game.player()) game.player().moveLeft(false); },
                    "moveRight": function () { if(game.player()) game.player().moveRight(false); } };

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


//
// Keyboard
//
var keybinds = { 32: "attack",
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
