var gameMap = [
	0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,1,1,0,0,0,0,
	0,0,0,1,1,1,1,0,0,0,
	0,0,1,1,1,1,1,1,0,0,
	0,1,1,1,1,1,1,1,1,0,
	0,0,1,1,1,1,1,1,0,0,
	0,0,0,1,1,1,1,0,0,0,
	0,0,0,0,1,1,1,1,1,0,
	0,0,0,0,0,1,1,1,1,0,
	0,0,0,0,0,0,0,0,0,0
];

var gameMap2 = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0,
	0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0,
	0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0,
	0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0,
	0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0,
	0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0,
	0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0,
	0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0,
	0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
	0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
	0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0,
	0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
	0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
	0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
	0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
	0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0,
	0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0,
	0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

var useMap = 2;

// Helper function to get map array index from 2d coordinates
getMapTile = function(x, y) {
	if(useMap == 2){
		return gameMap2[((y*mapW) +x)];
	}else{	
		return gameMap[((y*mapW) +x)];
	}
};

var tileH = 40, tileW = 40;

var mapH = 10, mapW = 10;

if(useMap ==2){
	mapH = 20;
	mapW = 20;
}

var viewport = {
	screenX		: 0,
	screenY		: 0,
	startTileX 	: 0,
	startTileY 	: 0,
	endTileX 	: 0,
	endTileY 	: 0,
	offsetX 		: 0,
	offsetY 		: 0, 

	update		: function( px, py ) {
		this.offsetX = Math.floor((this.screenX/2) - px);
		this.offsetY = Math.floor((this.screenY/2) - py);

		var tileX = Math.floor(px/tileW);
		var tileY = Math.floor(py/tileH);

		this.startTileX = tileX - 1 - Math.ceil((this.screenX/2) / tileW);
		this.startTileY = tileY - 1 - Math.ceil((this.screenY/2) / tileH);

		if(this.startTileX < 0) { this.startTileX = 0; }
		if(this.startTileY < 0) { this.startTileY = 0; }

		this.endTileX = tileX + 1 + Math.ceil((this.screenX/2) / tileW);
		this.endTileY = tileY + 1 + Math.ceil((this.screenY/2) / tileH);

		if(this.endTileX >= mapW) { this.endTileX = mapW; }
		if(this.endTileY >= mapH) { this.endTileY = mapH; }
	}
};


var currentSecond = 0, frameCount = 0, framesLastSecond = 0;
var currentFrameTime = 0;
var timeElapsed;
var canvas = null;
var ctx = null;
	
//Mapping key codes for player movement
var keyCodes = {
	k37 : false,
	k38 : false,
	k39 : false,
	k40 : false
};

window.onload = function()
{
	currentFrameTime = Date.now();
	
	canvas = document.getElementById('canvas');
	viewport.screenX = canvas.width;
	viewport.screenY = canvas.height;
	console.log(canvas.width );
	console.log(canvas.height) ;
	
	ctx = canvas .getContext("2d");
	player.placeAt(5,5);
	requestAnimationFrame(drawGame);
	ctx.font = "bold 10pt sans-serif";
	
	// Event Listeners
	window.addEventListener("keydown", function(e) {
		if(e.keyCode == 37) { 
			keyCodes.k37 = true; 
		}if(e.keyCode == 38) {
			keyCodes.k38 = true;
		}if(e.keyCode == 39) {
			keyCodes.k39 = true;
		}if(e.keyCode == 40) {
			keyCodes.k40 = true;
		}
		//console.log(e.keyCode + "Down");
	});
	window.addEventListener("keyup", function(e) {
		if(e.keyCode == 37) { 
			keyCodes.k37 = false;
		}if(e.keyCode == 38) {
			keyCodes.k38 = false;
		}if(e.keyCode == 39) {
			keyCodes.k39 = false;
		}if(e.keyCode == 40) {
			keyCodes.k40 = false;
		}
	});
};


// The main function
var drawGame = function() {

	if(ctx==null) { return; }
	var lastFrameTime = currentFrameTime;	
	currentFrameTime = Date.now();
	timeElapsed = currentFrameTime - lastFrameTime;
		
	//	Next we do a simple frame count
	//	We see which second it currently is in Unix Time, and if it's the same one as it was last frame 
	//	we add to the frame count. If not, we set the framesLastSecond to the current frame count, 
	//	reset the frame count to 0, and update the current second:
	var sec = Math.floor(Date.now()/1000);
	if(sec!=currentSecond)
	{
		currentSecond = sec;
		framesLastSecond = frameCount;
		frameCount = 1;
	}
	else { frameCount++; }

	ctx.clearRect(0,0, canvas.width, canvas.height);

	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, viewport.screenX, viewport.screenY);

	viewport.update(player.x + (player.sX/2), player.y + (player.sY/2));
	drawMap();
	
	drawPlayer();		
	
	//Let's show the number of frames drawn last second with red text (#ff0000), 
	//	and tell the browser to run this function again when it's ready to draw another frame on the Canvas, 
	//	and close the function.
	ctx.fillStyle = "#ff0000";
	ctx.fillText("FPS: " + framesLastSecond, 10, 20);
	
	lastFrameTime = currentFrameTime;
	requestAnimationFrame(drawGame); 
};

var drawMap = function() {
	// Next, drawing loops
	for(var y = viewport.startTileY; y <= viewport.endTileY; ++y)
	{
		for(var x = viewport.startTileX; x < viewport.endTileX; ++x)
		{
			// Select the fillStyle for the tile
			// *Needs to be changed to work with different map sizes
			switch(gameMap2[ ((y*mapW) +x) ])
			{
				case 0:
					ctx.fillStyle = "#000000";
					break;
				default:
					ctx.fillStyle = "#ccffcc";
			}
			// Draw the tile with the offset
			ctx.fillRect( viewport.offsetX + (x*tileW), viewport.offsetY + (y*tileH),
				tileW, tileH);
			
			//Then, we close our loops
		}
	}
};

var drawPlayer = function() {
	//Update the player based on current input
	var left = 0;
	var up = 0;
	
	// Parse player input
	if( keyCodes.k37 == true){
		//Left
		player.mX = tileW * -0.05;
		left = -1;
	}
	if( keyCodes.k38 == true){
		//Up
		player.mY = tileH * -0.05;
		up = -1;
	}
	if( keyCodes.k39 == true){
		//Right
		player.mX = tileW * 0.05;
		left = +1;
	}
	if( keyCodes.k40 == true){
		//Down
		player.mY = tileH * 0.05;
		up = +1;
	}

	// Get the player's tile coordinates
	player.tileFromX = Math.floor((player.x + (player.sX/2)) / tileW);
	player.tileFromY = Math.floor((player.y + (player.sY/2)) / tileH);
	
	// Calculate the player's intended direction
	player.tileToX = player.tileFromX + left;
	player.tileToY = player.tileFromY + up;

	// Process movement and check for tile collisions
	player.processMovement(timeElapsed);

	// Draw the player
	ctx.fillStyle = "#0000ff";
	ctx.fillRect(player.x + viewport.offsetX, player.y + viewport.offsetY, player.sX, player.sY);
	
};
