// --- Physics Object
var physics = (function () {
    function _playerUpdate( player ) {
	// Update player movement
	player.x += (player.directionX * player.moveSpeed);
	player.y += (player.directionY * player.moveSpeed);

	player.x = Math.floor( player.x );
	player.y = Math.floor( player.y );

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
	    }
	    	    
        }
    }

    return {
        update: _update
    };

})();