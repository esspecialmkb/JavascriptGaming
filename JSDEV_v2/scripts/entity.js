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

Entity.prototype.collisionRect = function() {
    return new Rectangle(this.x - (this.w / 2), this.y - (this.h /2), this.w, this.h );
}