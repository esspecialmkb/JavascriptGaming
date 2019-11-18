// ----------------------------------------------------------------
// The render system takes care of canvas drawing
var renderer = (function () {
    var _viewport = null;
    var _entityColors = [ "rgb(150, 7, 7)",
			  "rgb(150, 89, 7)",
			  "rgb(56, 150, 7)",
			  "rgb(7, 150, 122)",
			  "rgb(46, 7, 150)",
			  "rgb(99, 66, 245)"];

    function _initViewport( tileSize, screenW, screenH ) {
	_viewport = new Viewport( tileSize, screenW, screenH );
	console.log("initViewport");
    }

    function _drawRectangle( context, color, entity ) {
	context.fillStyle = color;
	if(_viewport != null) {
	    context.fillRect( _viewport.offsetX + (entity.x - (entity.w/2)), _viewport.offsetY + (entity.y - (entity.h/2)), entity.w, entity.h);
	}else{
	    context.fillRect( entity.x - (entity.w / 2), entity.y - (entity.h / 2), entity.w, entity.h );
	}
    }

    function _drawMap( context ) {
	if(_viewport != null){
	    for(var y = _viewport.startTileY; y < _viewport.endTileY; ++y)
	    {
	        for(var x = _viewport.startTileX; x < _viewport.endTileX; ++x)
	        {
		    // Get the Tile object data for the current tile data
		    var mapTile = map.getTile( x, y);
		    // Get the color for the fillStyle from the Tile data
		    var tType = map.getTileTypes( mapTile.type );
		    context.fillStyle = tType.color;
		    // Draw the tile with the offset
		    context.fillRect( _viewport.offsetX + (x * _viewport.tileSize), _viewport.offsetY + (y * _viewport.tileSize), _viewport.tileSize, _viewport.tileSize);
		
	        }
	    }
	}else{
	    for(var y = 0; y < 10; y++){
		for(var x = 0; x < 10; x++){
		    var mapTile = map.getTile(x,y);
		    
		    var tType = map.getTileTypes(mapTile.type);
			
		    //console.log("Tile Color = " + tType.color);
		    context.fillStyle = tType.color;
		    //context.fillRect(x * map.tileSize, y * map.tileSize, map.tileSize, map.tileSize);
		}
	    }
	}
    }

    function _render( canvas ) {
	//var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d")

	// Loop through all drawable entities
	var screenW = canvas.width;
	var screenH = canvas.height;

	context.fillStyle = "gray";
	context.fillRect( 0,0, screenW, screenH );
	
	_updateViewport( core.player().x, core.player().y );

	_drawMap( context );

	var i,
	    entity,
	    entities = core.entities();

	for( i = 0; i < entities.length; i++ ) {
	    entity = entities[i];

	    if( entity instanceof Enemy ) {
		_drawRectangle( context, _entityColors[0], entity);
	    } else if( entity instanceof Player ) {
		_drawRectangle( context, "blue" ,entity);
	    }
	}
	
	// DEBUG OUTPUT
	if( _outputCounter < _maxOutput){
	    _outputCounter += 1;
	}else{
	    //console.log("viewport: " + _viewport.screenX + ", " + _viewport.screenY);
	    //console.log("player: " + _pX + ", " + _pY);
	    _outputCounter = 0;
	}
    }

    function _updateViewport( x, y ) {
	_pX = x;
	_pY = y;
	if(_viewport != null) {
	    _viewport.updateViewport(x, y);
	}
    }

    // Debug Members
    var _outputCounter = 0;
    var _maxOutput = 10;
    var _pX = 0;
    var _pY = 0;

    return {
	initViewport: function(size, w, h){ _initViewport(size,w,h); },
	updateViewport: function( tX, tY ){ _updateViewport( tX, tY ); },
	render: _render
    };
}) ();