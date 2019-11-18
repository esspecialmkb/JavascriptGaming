// ----------------------------------------------------------------
// The physics system deals with collisions and gravity
// This system might need to track forces and apply them to entities
var physics = (function () {
    var _delta = 0;
    function _testMovement(){}

    function _updatePlayer( p ){
	if(_delta == 0) { return; }
	var tSize = map.tileSize();

	// Move the player according to velocity
	p.x += p.vX;
	p.y += p.vY;

	// Determine where the player currently stands
	var centerX = Math.floor( p.x / tSize );
	var centerY = Math.floor( p.y / tSize );

	// Determine
    }

    function _update( dt ) {
	_delta = dt;
	var i,
	    e,
	    velocity,
	    entities = core.entities();

	for( i = 0; i < entities.length; i++ ) {
	    e = entities[i];
	    //velocity = vectorScalarMultiply( e.direction, e.speed);
	    //e.position = vectorAdd( e.position, vectorScalarMultiply( velocity, dt ) );
	    if(e instanceof Enemy){

	    }else if(e instanceof Player){
		_updatePlayer( e );
	    }
	}
    }

    return {
	update: _update
    };
}) ();