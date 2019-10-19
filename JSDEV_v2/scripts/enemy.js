// --- Enemy Object
function Enemy(x, y) {
    // Base data
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
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
    this.state = 0;
    this.health = 5;
    this.active = false;
}

Enemy.prototype.update = function () {
    // Enemy update function

    // Enemies will need to be able to perform a few different actions/states
    // When a new enemy is added to the world, it starts in the spawn state with position
    // Depending on configuration, the enemy will either goto either the Idle or Patrol states

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