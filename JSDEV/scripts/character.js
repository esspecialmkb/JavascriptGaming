// Create the player
var player = new Character();

function Character(){
	this.x = 0;
	this.y = 0;

	this.lX = 0;
	this.lY = 0;

	this.mX = 0;
	this.mY = 0;

	this.sX = 30;
	this.sY = 30;

	this.tileFromX = 0;
	this.tileFromY = 0;

	this.tileToX = 0;
	this.tileToY = 0;
}

Character.prototype.placeAt = function( x, y) {
	//this.tileFrom = [x, y];
	this.tileFromX = x;
	this.tileFromY = y;

	//this.tileTo = [x, y];
	this.tileToX = x;
	this.tileToY = y;

	// Reset velocity
	this.mX = 0;
	this.mY = 0;

	this.lX = 0;
	this.lY = 0;

	//this.position = [ (( tileW * x) + ((tileW - this.sX)/ 2)),  (( tileH * y) + ((tileH - this.sY)/ 2))]; 
	this.x = ((tileW * x) + ((tileW - this.sX) / 2));
	this.y = ((tileH * y) + ((tileH - this.sY) / 2));
};

Character.prototype.processMovement = function(t) {
	this.lX = this.x;
	this.lY = this.y;

	this.x = this.x + (this.mX * (timeElapsed/10));
	this.y = this.y + (this.mY * (timeElapsed/10));

	this.x = Math.floor(this.x);
	this.y = Math.floor(this.y);

	// var passable = getMapTile(this.tileToX, this.tileToY);
	if(getMapTile(this.tileToX, this.tileToY) == 0) {
		// If the neighboring tile is 0, restrict movement

		// Get the boundaries of the tile
		var minX = this.tileToX * tileW;
		var maxX = minX + tileW;
		var minY = this.tileToY * tileH;
		var maxY = minY + tileH;

		// When moving left, the pos needs to be greater than maxX
		// When moving right, the pos needs to be less than min
		if(this.mX > 0){ // Moving to the right...
			if(this.x > minX){
			 this.x = minX;
			}
		}if(this.mX < 0){ // Moving to the left Correct
			if(this.x < maxX){
			 this.x = maxX;
			}
		}

		// When moving up, the pos needs to be greater than maxY
		// When moving down, the pos needs to be less than minY
		if(this.mY > 0){ // Moving downwards
			if(this.y > minY){
			 this.y = minY;
			}
		}if(this.mY < 0){ // Moving upwards Correct
			if(this.y < maxY){
			 this.y = maxY;
			}
		}
	}

	

	this.mX = 0;
	this.mY = 0;
};