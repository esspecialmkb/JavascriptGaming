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