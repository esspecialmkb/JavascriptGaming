// Game Entities

// --- Player Object
function Player(x, y) {
    this.x = x;
    this.y = y;
    this.width = 15;
    this.height = 30;
    this.direction = 0;		// [North, East, South, West] - (Up:1, Right:2, Down:4, Left:8)

    // Movement flags
    this.movingUp = false;
    this.movingDown = false;
    this.movingLeft = false;
    this.movingRight = false;

    // Movement data
    this.moveSpeed = renderer.tileSize() * 0.05;
    this.directionX = 0;
    this.directionY = 0;
    this.tileX = 0;
    this.tileY = 0;
    this.tileToX = 0;
    this.tileToY = 0;

    // Attack data
    this.timeAttack = 0;
    this.timeAttackLast = 0;
    this.attackCooldown = 100;
    this.isAttacking = false;
}

Player.prototype.update = function () {
    // The player's update function

    // * Get the player's tile position
    this.tileX = Math.floor( (this.x + (this.width/2)) / renderer.tileSize() );
    this.tileY = Math.floor( (this.y + (this.height/2)) / renderer.tileSize() );

    // * Adding the direction vector gives us the target tile
    this.tileToX = this.tileX + this.directionX;
    this.tileToY = this.tileY + this.directionY;

    // * Since we need to check for collisions, we'll leave the rest to the physics object

    // Check attack status
    if( this.isAttacking === true ) {
	// increment attack time
	this.timeAttack = Date.now() - this.timeAttackLast;
	if( this.timeAttack > this.attackCooldown ) {
	    this.isAttacking = false;
	}
    }
};

Player.prototype.updateDirection = function() {
    var x = 0;
    var y = 0;
    this.direction = 0;

    if( this.movingUp ) {
	y -= 1;
	this.direction += 1;
    }
    if( this.movingDown ) {
	y += 1;
	this.direction += 4;
    }
    if( this.movingLeft ) {
	x -= 1;
	this.direction += 2;
    }
    if( this.movingRight ) {
	x += 1;
	this.direction += 8;
    }
    
    this.directionX = x;
    this.directionY = y;
};

Player.prototype.canMoveTo = function(x, y) {
    // Make sure x and y are within map bounds
    if( x < 0 || x >= game.mapWidth() || y < 0 || y >= game.mapHeight()) { return false; }
    
    // Check the map array to make sure the target tile is a path type
    if(tileTypes[ game.getMapTile(x, y) ].floor != floorTypes.path) { return  false; }

    // If both of the tests fail, let the code calling this method know we can move here
    return true;
};

Player.prototype.canMoveUp = function() { return this.canMoveTo( this.tileX, this.tileY - 1); };
Player.prototype.canMoveDown = function() { return this.canMoveTo( this.tileX, this.tileY + 1); };
Player.prototype.canMoveLeft = function() { return this.canMoveTo( this.tileX - 1, this.tileY); };
Player.prototype.canMoveRight = function() { return this.canMoveTo( this.tileX + 1, this.tileY); };

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
    var tNow = Date.now();
    if(this.isAttacking === false) {
	// Start the attack
	this.timeAttackLast = tNow;
	this.timeAttack = 0;
	this.isAttacking = true;
    }
};

// --- Enemy Object
function Enemy(x, y) {
    // Base data
    this.x = x;
    this.y = y;
    this.width = 15;
    this.height = 30;
    this.direction = 1;

    // Movement flags
    this.movingUp = false;
    this.movingDown = false;
    this.movingLeft = false;
    this.movingRight = false;

    // * Movement data
    this.moveSpeed = renderer.tileSize() * 0.03;
    this.directionX = 0;
    this.directionY = 0;
    this.tileX = 0;
    this.tileY = 0;
    this.tileToX = 0;
    this.tileToY = 0;

    // * AI data
    this.targetX = 0;
    this.targetY = 0;
    this.aggroRange = 5;
    this.state = 1;
    this.health = 5;
    this.active = false;
}

Enemy.prototype.update = function () {
    // Enemy update function

    // Enemies will need to be able to perform a few different actions/states
    // When a new enemy is added to the world, it starts in the spawn state with position
    // Depending on configuration, the enemy will either goto either the Idle or Patrol states

    // Update Enemy AI
    var dX = entities[i].x - px;
    var dY = entities[i].y - py;
    var distP = Math.sqrt( (dX + dX) + (dY + dY) ) / renderer.tileSize();

    switch(this.state) {
	case 0:
	    // Death:0, The enemy's health is gone
	    break;
	case 1:
	    // Spawn:1, When the enemy first appears
	    break;
	case 2:
	    // Idle:2, Stand still in a specific location
	    // The enemy will stay in this state until the player is spotted
	    // When the player is spotted (gets within aggro range), switch to Alert state
			
	    // Check distance
	    if( distP < entities[i].aggroRange ){
		entities[i].state = 4;
	    }

	    if( distP > 10){
		// Remove entity?
	    }
	    break;
	case 3:
	    // Patrol:3, Walk between a set of points
	    // The enemy will stay in this state until the player is spotted
	    // When the player is spotted (gets within aggro range), switch to Alert state
	    break;
	case 4:
	    // Alert:4, Something has caught the enemy's attention
	    break;
	case 5:
	    // Pursue:5, Chase the target
	    break;
	case 6:
	    // Attack:6, Attack the target
	    break;
        default:
    
    }      
};

Enemy.prototype.updateDirection = function() {
    // [North, East, South, West] - (Up:1, Right:2, Down:4, Left:8)
    var x = 0;
    var y = 0;
    this.direction = 0;

    if( this.movingUp ) {
	y -= 1;
	this.direction += 1;
    }
    if( this.movingDown ) {
	y += 1;
	this.direction += 4;
    }
    if( this.movingLeft ) {
	x -= 1;
	this.direction += 2;
    }
    if( this.movingRight ) {
	x += 1;
	this.direction += 8;
    }
    
    this.directionX = x;
    this.directionY = y;
};

Enemy.prototype.moveUp = function(enable) {
    this.movingUp = enable
    this.updateDirection();
};

Enemy.prototype.moveDown = function(enable) {
    this.movingDown = enable;
    this.updateDirection();
};

Enemy.prototype.moveLeft = function(enable) {
    this.movingLeft = enable;
    this.updateDirection();
};

Enemy.prototype.moveRight = function(enable) {
    this.movingRight = enable;
    this.updateDirection();
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
        context.fillRect(_offsetX + enemy.x, _offsetY + enemy.y, enemy.width, enemy.height);
    }

    function _drawPlayer(context, player) {
        context.fillStyle = "blue";
	_updateViewport( player.x + (player.width/2), player.y + (player.height/2) );
	
	// Draw the player
        context.fillRect(_offsetX + player.x, _offsetY + player.y, player.width, player.height);
	
	// We are also going to need to know if the player is using a melee attack
	// 360 deg = 2 * Math.PI
	// deg / 180 * Math.PI;
	if(player.isAttacking === true) {
	    context.fillStyle = "red";
	    context.strokeStyle = "black";
	    context.beginPath();
	    
	    var startArc = 0;
	    var endArc = 2 * Math.PI;
	    context.arc( _offsetX + player.x + (player.width/2) , _offsetY + player.y + (player.height/2) , player.height , startArc , endArc );
	    context.fill();
	    context.stroke();
	}	
	
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
                _drawEnemy(context, entity);
            }
            else if( entity instanceof Player ) {
                _drawPlayer(context, entity);
            }
        }
    }

    return {
        render: _render,
	tileSize: function () { return _tileH; },
	updateViewPort: _updateViewport,
	getOffsetX: function () { return _offsetX; },
	getOffsetY: function () { return _offsetY; }
    };

})();

// --- Physics Object
var physics = (function () {
    function _playerUpdate( player ) {
	// Update player movement
	player.x += (player.directionX * player.moveSpeed);
	player.y += (player.directionY * player.moveSpeed);

	player.x = Math.floor( player.x );
	player.y = Math.floor( player.y );

	//var tileFloor = game.getTileType( game.toIndex(player.tileX,y)

        if( game.getMapTile( player.tileToX, player.tileToY ) == 0 ){
	    // Get tile boundaries
	    var minX = player.tileToX * renderer.tileSize();
	    var maxX = minX + renderer.tileSize();
	    var minY = player.tileToY * renderer.tileSize();
	    var maxY = minY + renderer.tileSize();

            if( player.directionX > 0){
		if( ( player.x + player.width ) > minX ){
		    player.x = minX - player.width;
		}
	    }
	    if( player.directionX < 0){
		if( ( player.x ) < maxX ){
		    player.x = maxX;
		}
	    }
	    if( player.directionY > 0){
		if( ( player.y + player.height ) > minY ){
		    player.y = minY - player.height;
		}
	    }
	    if( player.directionY < 0){
		if( ( player.y ) < maxY ){
		    player.y = maxY;
		}
	    }
	}
    }

    function _enemyUpdate( enemy ) {
	var attack = Boolean(game.player().isAttacking );
    }

    function _update( deltaTime ) {
        var i,
            entities = game.entities();

        for( i=0; i<entities.length; i++) {
            // Process Physics Updates
	    //console.log("Entity update :" + i);

	    if( entities[i] instanceof Player ) {
		// The player entities has a different update process
		_playerUpdate( entities[i] );
	    }else{
		// Non-player entities
		_enemyUpdate( entities[i] );
	    }
	    	    
        }
    }

    return {
        update: _update
    };

})();

// --------------------------------
// Mob Control object - fancy term for AIManager
var mobController = (function () {
    // Member Data definition

    // Member Method definition
    function _update() {
	entities = game.entities();
	var px = game.player().x;
	var py = game.player().y;
	
	for( var i = 0; i < entities.length; i++) {
	    if( entities[i] instanceof Enemy) {
		
	    }
	}
    }

    // Object export block
    return {
	update: _update

    };
})();	// Enclousure

// MAP ENGINE AND TILE OBJECT
// -----------------------------------
// Tile object stores information for each tile
function Tile(tx, ty, tt) {
    this.x = tx;
    this.y = ty;
    this.type = tt;
    this.roof = null;
    this.roofType = 0;
    this.eventEnter = null;	// Can be a function pointer to execute event or null
}

// ------------------------------------
// The TileMap is a map handling class
function TileMap() {
    this.map = [];
    this.w = 0;
    this.h = 0;
}

// Builds the map from an array (d) and it'd dimensions (w & h)
TileMap.prototype.buildMapFromData = function( d, w, h) {
    this.w = w;
    this.h = h;

    // Make sure that the array length matchs the width and height
    if( d.length != (w*h) ) { return false;}
    this.map.length = 0;

    // Populate the data map with tile objects
    for( var y = 0; y < h; y++) {
	for( var x = 0; x < w; x++) {
	    this.map.push( new Tile( x, y, d[ ((y*w) + x)] ) );
	}
    }

    return;
};

TileMap.prototype.addRoofs = function(roofs) {
    for( var i in roofs) {
	var r = roofs[i];
	
	if( r.x < 0 || r.y < 0 || r.x >= this.w || r.y >= this.h || (r.x + r.w) > this.w || (r.y + r.h) > this.h || r.data.length != (r.w * r.h)) {
	    continue;
	}

	for( var y = 0; y < r.h; y++) {
	    for( var x = 0; x < r.w; x++) {
		var tileIdx = (( ( r.y + y) * this.w) + r.x + x);

		this.map[ tileIdx ].roof = r;
		this.map[ tileIdx ].rootType = r.data[ (( y* r.w) + x) ];
	    }
	}
   }
};

// Game Object
var game = (function () {
    // Tilemap Array is hosted in the game object
    var _gameMap = [ /*
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
    ];		*/ // New map data below
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

    var _floorTypes = {				// Tile type data
	solid :0,
	path :1,
	water :2
    };

    var _tileTypes = {				// Tile type definition data
	0 : { color:"black", floor:floorTypes.solid },
	1 : { color:"green", floor:floorTypes.path },
	2 : { color:"tan", floor:floorTypes.path },
	3 : { color:"brown", floor:floorTypes.solid },
	4 : { color:"blue", floor:floorTypes.water },

	10 : { color:"grey", floor:floorTypes.solid },
	11 : { color:"grey", floor:floorTypes.solid }
    };

    // Map dimensions
    var _mapH = 20;
    var _mapW = 20;

    // Global game data
    var _mapTileData = new TileMap();		// Map class
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
    var _gameFieldHeight = 400;
    var _entities = [];
    var _player = null;

    // * Members for time tracking
    var _currentTime = null;
    var _lastTime = null;
    var _deltaTime = null;

    function _start() {
        //_entities.push(new Player(200, 200));
        
        //_entities.push(new Enemy(80, 25));
        //_entities.push(new Enemy(160, 25));

	this.addEntity( new Player(200, 200) );
	this.addEntity( new Enemy(250, 25) );
	
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
		// Call tileEvent if one exists
		if( _mapTileData.map[ toIndex( _entities[i].tileToX, _entities[i].tileToY) ].eventEnter != null) {
		    _mapTileData.map[ toIndex( _entities[i].tileToX, _entities[i].tileToY) ].eventEnter(_entities[i]);
		}

		// Update viewport in render system
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
	toIndex: function (x, y) { return (( y * _mapW) + x); },
	mapWidth: function () { return _mapW; },
	mapHeight: function () { return _mapH; },
	player: function () { return _player; },
	addEntity : _addEntity,
	deltaTime : _deltaTime
    };

})();

//*** Using onload="game.start()" within canvas html tag ***//
//game.start();

// ------------------------------------------
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


// ------------------------------------------
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

// ------------------------------------------
// Touch
//
function getRelativeTouchCoords(touch) {
    function getOffsetLeft( elem ) {
        var offsetLeft = 0;
        do {
            if( !isNaN( elem.offsetLeft ) ) {
                offsetLeft += elem.offsetLeft;
            }
        }
        while( elem = elem.offsetParent );
        return offsetLeft;
    }

    function getOffsetTop( elem ) {
        var offsetTop = 0;
        do {
            if( !isNaN( elem.offsetTop ) ) {
                offsetTop += elem.offsetTop;
            }
        }
        while( elem = elem.offsetParent );
        return offsetTop;
    }

    var scale = game.gameFieldRect().width / canvas.clientWidth;
    var x = touch.pageX - getOffsetLeft(canvas);
    var y = touch.pageY - getOffsetTop(canvas);

    return { x: x*scale,
             y: y*scale };
}

function touchStart(e) {
    var touches = e.changedTouches,
        touchLocation,
        playerAction;

    e.preventDefault();

    for( var i=touches.length-1; i>=0; i-- ) {
        touchLocation = getRelativeTouchCoords(touches[i]);

        if( touchLocation.x < game.gameFieldRect().width*(1/5) ) {
            playerAction = "moveLeft";
        }
        else if( touchLocation.x < game.gameFieldRect().width*(4/5) ) {
            playerAction = "fire";
        }
        else {
            playerAction = "moveRight";
        }

        playerActions.startAction(touches[i].identifier, playerAction);
    }
}

function touchEnd(e) {
    var touches = e.changedTouches;
    e.preventDefault();

    for( var i=touches.length-1; i>=0; i-- ) {
        playerActions.endAction(touches[i].identifier);
    }
}

var canvas = document.getElementById("game-layer");
canvas.addEventListener("touchstart", touchStart);
canvas.addEventListener("touchend", touchEnd);
canvas.addEventListener("touchcancel", touchEnd);
