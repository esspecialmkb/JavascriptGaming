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