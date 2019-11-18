// ----------------------------------------------------------------
// The player object is based off of the Entity prototype/object
function Player( x, y, speed, direction) {
    Entity.call( this, x, y, speed, direction );

    this.vX = 0;	// vX and vY work with the velocity
    this.vY = 0;
    this.dX = 0;	// dX and dY work with the direction
    this.dY = 0;

    //Movement flags
    this.movingUp = false;
    this.movingDown = false;
    this.movingRight = false;
    this.movingLeft = false;
    this.attacking = false;
    this.dashing = false;

    // Dimensions
    this.w = 15;
    this.h = 30;
}

Player.prototype = Object.create( Entity.prototype );

Player.prototype.update = function( dt ) {
    //console.log("Player update called!");
    Entity.prototype.update.call( this, dt );
    
    this.vX = (this.dX * (1/dt) * (this.speed * map.tileSize()));
    this.vY = (this.dY * (1/dt) * (this.speed * map.tileSize()));
    // Player-specific updates  
}

Player.prototype.updateDirection = function(){
    this.direction = 0;
    this.dY = 0;
    this.dX = 0;

    if( this.movingUp ){
	this.dY = -1;
	this.direction += 1;
    }if( this.movingDown ){
	this.dY = 1;
	this.direction += 2;
    }if( this.movingLeft ){
	this.dX = -1;
	this.direction += 4;
    }if( this.movingRight ){
	this.dX = 1;
	this.direction += 8;
    }
}

Player.prototype.moveUp = function( value ){
    this.movingUp = value;
    this.updateDirection();
}

Player.prototype.moveDown = function( value ){
    this.movingDown = value;
    this.updateDirection();
}

Player.prototype.moveLeft = function( value ){
    this.movingLeft = value;
    this.updateDirection();
}

Player.prototype.moveRight = function( value ){
    this.movingRight = value;
    this.updateDirection();
}

Player.prototype.attack = function(){
    this.attacking = true;
    // No-op, need timing data
}

Player.prototype.dash = function(){
    //this.dashing = true;
    // No-op, need timing data
}