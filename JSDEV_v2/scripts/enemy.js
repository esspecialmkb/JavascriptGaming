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
    
    // Enemy-specific updates
}