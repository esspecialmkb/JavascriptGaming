//	PlayState volatile data definition

var mapTiles = [];
var mapTileSize = 60;	//	Const
var mapWidth = 10;	//	Const
var mapHeight = 10;	//	Constant

var renderOffsetX = 0;
var renderOffsetY = 0;

var playerx = 0;
var playery = 0;
var playervx = 0;
var playervy = 0;
var playerW = 0;
var playerH = 0;
var playerxMargin = 0;
var playeryMargin = 0;

var kUp= false;
var kDn= false;
var kLt= false;
var kRt= false;

var textOutput = null;
var textFont = "Arial";
var textSize = "15px ";

function PlayState(callback){
	//	Values defined here seem to be treated as constants...
	//	Define state-specific data
	this.firstRun = true;
	this.screenWidth = 0;
	this.screenHeight = 0;

	//	Map Data (Not used)
	this.map = null;

	//	Player Data
	this.playerW = 22;
	this.playerH = 45;

	//	Player Input Mask
	this.keyUp = 38;
	this.keyDn = 40;
	this.keyLt = 37;
	this.keyRt = 39;
}

//	Keyboard input handlers
PlayState.prototype.onKeyDown = function( e ) {
	// arrow left -> 37
	// arrow up -> 38
	// arrow right -> 39
	// arrow down -> 40
	var x = e.which || e.keyCode;
	switch(x){
		case 37:
			kLt = true;
			break;
		case 38:
			kUp = true;
			break;
		case 39:
			kRt = true;
			break;
		case 40:
			kDn = true;
			break;
	}
}

PlayState.prototype.onKeyUp = function( e ) {
	var x = e.which || e.keyCode;
	switch(x){
		case 37:
			kLt = false;
			break;
		case 38:
			kUp = false;
			break;
		case 39:
			kRt = false;
			break;
		case 40:
			kDn = false;
			break;
	}
}

//	Mouse input handlers
PlayState.prototype.onMouseClick = function( e) {
	var b = e.button || e.which;
	var x = e.clientX;
	var y = e.clientY;
}

PlayState.prototype.onMouseDown = function( e) {
	var b = e.button || e.which;
	var x = e.clientX;
	var y = e.clientY;
}

PlayState.prototype.onMouseUp = function( e) {
	var b = e.button || e.which;
	var x = e.clientX;
	var y = e.clientY;
}

PlayState.prototype.onMouseMove = function( e) {
	var b = e.button || e.which;
	var x = e.clientX;
	var y = e.clientY;
}

//	Touch input handlers
PlayState.prototype.onTouchStart = function( e ) {
	var t = e.changedTouches;

	switch(t.length){
		case 1:
			//Process single touch
			break;
		case 2:
			//Process double touch
			break;
		default:

	}
}

PlayState.prototype.onTouchMove = function( e ) {
	var t = e.changedTouches;

	switch(t.length){
		case 1:
			//Process single touch
			break;
		case 2:
			//Process double touch
			break;
		default:

	}
}

PlayState.prototype.onTouchEnd = function( e ) {
	var t = e.changedTouches;

	switch(t.length){
		case 1:
			//Process single touch
			break;
		case 2:
			//Process double touch
			break;
		default:

	}
}

//	Utility method for obtaining mapTile per coordinates
PlayState.prototype.getMapTile = function( x, y ){
	return mapTiles[ (y * mapHeight) + x ];
}

//	State initializer
PlayState.prototype.onStart = function() {
	console.log("Starting PlayState");

	this.screenWidth = canvasWidth();
	this.screenHeight = canvasHeight();

	// The map needs to be created ===============================================================================
	//var mapTiles = [];
	//var mapTileSize = 40;
	//var mapWidth = 10;
	//var mapHeight = 10;

	for( var tY = 0; tY < mapHeight; tY++ ){
		for( var tX = 0; tX < mapWidth; tX++){
			// Push map tiles to the array
			if( (tY === 0) || (tX === 0) || (tX === (mapWidth - 1)) || (tY === (mapHeight - 1))){
				mapTiles.push(0);
			}else{
				mapTiles.push(1);
			}
		}
	}

	// Calculate render offsets in case the screen is different aspect ratio
	renderOffsetX = (this.screenWidth / 2) - ((mapWidth /2) * mapTileSize);
	renderOffsetY = (this.screenHeight / 2) - ((mapHeight /2) * mapTileSize);

	// Setup the player ===========================================================================================
	playerx = 5 * mapTileSize;
	playery = 5 * mapTileSize;
	playerW = Math.floor((mapTileSize /8 ) * 3);
	playerH = Math.floor((mapTileSize /8 ) * 6);
	playerxMargin = (mapTileSize - this.playerW) / 2;
	playeryMargin = (mapTileSize - this.playerH) / 2;

	//	Register input listeners ==============================================================================
	window.addEventListener('keydown', this.onKeyDown );
	window.addEventListener('keyup', this.onKeyUp );

	window.addEventListener('click', this.onMouseClick);	//The event occurs when the user clicks on an element
	window.addEventListener('mousedown', this.onMouseDown, false);	//The event occurs when the user presses a mouse button over an element
	window.addEventListener('mouseup', this.onMouseUp, false);	//The event occurs when a user releases a mouse button over an element
	window.addEventListener('mousemove', this.onMouseMove, false);	//The event occurs when the pointer is moving while it is over an element

	//window.addEventListener('touchstart', this.onTouchStart, false);
	//window.addEventListener('touchmove', this.onTouchMove, false);
	//window.addEventListener('touchend', this.onTouchEnd, false);
}

// Draw The Map ===============================================================================================
PlayState.prototype.drawMap = function() {
	for( var tY = 0; tY < mapHeight; tY++ ){
		for( var tX = 0; tX < mapWidth; tX++){
			// Push map tiles to the array
			switch( mapTiles[ (tY * mapHeight) + tX] ){
				case 0:
					fillRectStyle( renderOffsetX + (tX * mapTileSize), renderOffsetY + (tY * mapTileSize), mapTileSize, mapTileSize, "Black");
					break;
				case 1:
					fillRectStyle( renderOffsetX + (tX * mapTileSize), renderOffsetY + (tY * mapTileSize), mapTileSize, mapTileSize, "Green");
					break;
			}
		}
	}
}

// Draw The Player ============================================================================================
PlayState.prototype.drawPlayer = function() {
	fillRectStyle( renderOffsetX + playerx - (playerW/2), renderOffsetY + playery - (playerH/2), playerW, playerH, "Red" );

	//	Draw a debug tile collision box
	fillRectStyle( renderOffsetX + playerx - (playerW/2), renderOffsetY + playery, playerW, playerW, "Blue" );
}

// Main render method
PlayState.prototype.render = function() {
	clearCanvasStyle("black");

	this.drawMap();

	this.updatePlayer();
	this.drawPlayer();

	if(textOutput !== null){
		fillTextStyle(0, 20, textOutput, textSize + textFont, "White");
	}
}

PlayState.prototype.updatePlayer = function() {
	// Reset vectors
	playervy = 0;
	playervx = 0;

	// What tile is the player standing on?
	var psx = playerx;
	var psy = playery + (playerW/2);
	var px = Math.floor(playerx / mapTileSize);
	var py = Math.floor((playery + (playerW/2))/ mapTileSize);

	// ... And how far from the edge of the tile are they?
	//	playerW = 15
	//	playerH = 30
	//	40-15 = 25 -> 25/2 = 12.5 -> Margin X
	//	40-30 = 10 -> 10/2 = 5    -> Margin Y
	var marX = psx % mapTileSize;
	var marY = psy % mapTileSize;

	//textOutput = "Tile Margin: " + marX + ", " + marY;

	// Set move vectors according to input masks
	if(kUp === true){ playervy = -1;}
	if(kDn === true){ playervy = 1;}
	if(kLt === true){ playervx = -1;}
	if(kRt === true){ playervx = 1;}

	// Move the player
	playery += playervy;
	playerx += playervx;

	// We will need to keep track of which tiles to check for
	var targets = [];

	// Get the 4 corners for box collision
	var pLeft = playerx - (playerW/2);
	var pRight = pLeft + playerW;
	var pTop = playery;
	var pBottom = pTop + playerW;

	// What tiles do the four corners reside in?
	var testXL = Math.floor( pLeft / mapTileSize );
	var testYT = Math.floor( pTop / mapTileSize );
	var testXR = Math.floor( pRight / mapTileSize );
	var testYB = Math.floor( pBottom / mapTileSize );

	var yDif = ( testYT !== testYB );
	var xDif = ( testXL !== testXR )

	// Check for tile collision
	targets.push( {x: testXL, y: testYT} );
	if( yDif ){
		targets.push( {x: testXL, y: testYB} );
	}

	if( xDif ){
		targets.push( {x: testXR, y: testYT} );
		if( yDif ){
			targets.push( {x: testXR, y: testYB} );
		}
	}
	textOutput = "Player X: " + playerx + ", Player Y: " +playery + "\n";
	// Draw/iterate the target tiles in the list
	for( var i = 0; i < targets.length; i++){

		//---DEBUG DRAWING CALLS---
		//fillRectStyle( renderOffsetX + targets[i].x * mapTileSize, renderOffsetY + targets[i].y * mapTileSize, mapTileSize, mapTileSize, "Grey" );
		if((this.getMapTile(targets[i].x,targets[i].y) === 0) && isOverlapping(pLeft, pTop, playerW, playerW, targets[i].x * mapTileSize, targets[i].y * mapTileSize, mapTileSize, mapTileSize)){
			strokeRectStyle( renderOffsetX + targets[i].x * mapTileSize, renderOffsetY + targets[i].y * mapTileSize, mapTileSize, mapTileSize, "Red" );
			var xColLeft = pLeft - (targets[i].x * mapTileSize) + mapTileSize;
			var xColRight = (targets[i].x * mapTileSize) - pRight;

			var yColTop = pTop - (targets[i].y * mapTileSize) + mapTileSize;
			var yColBottom = (targets[i].y * mapTileSize) - pBottom;

			textOutput += "xColLeft: " + xColLeft +
			 "xColRight: " + xColRight +
			 "yColTop: " + yColTop +
			"yColBottom: " + yColBottom + "\n";
		}
	}
	var marX = psx % mapTileSize;
	var marY = psy % mapTileSize;

	//textOutput += "\n" + "Tile Margin: " + marX + ", " + marY;
}

var isOverlapping = function(aX, aY, aW, aH, bX, bY, bW, bH){
	// If both of these conditions are true, we are overlapping
	//var overlapX = (pLeft < maxX) && (pRight > minX);
	//var overlapY = (pTop < maxY) && (pBottom > minY);
	var overlapX = (aX < (bX + bW)) && ((aX + aW) > bX);
	var overlapY = (aY < (bY + bH)) && ((aY + aH) > bY);

	return overlapX && overlapY;
}

PlayState.prototype.onUpdate = function() {
	if(this.firstRun){
		console.log("Updating PlayState");
		this.firstRun = false;
	}
	// We only need to process input, handle gui logic, and render

	// Since input is handled by a callback, the player needs to process input
	//this.updatePlayer();

	// Render
	this.render();
}

PlayState.prototype.onStop = function() {
	console.log("Starting PlayState");

	//	Remove input listeners
	window.removeEventListener('keydown', this.onKeyDown );
	window.removeEventListener('keyup', this.onKeyUp );

	window.removeEventListener('click', this.onMouseClick);	//The event occurs when the user clicks on an element
	window.removeEventListener('mousedown', this.onMouseDown, false);	//The event occurs when the user presses a mouse button over an element
	window.removeEventListener('mouseup', this.onMouseUp, false);	//The event occurs when a user releases a mouse button over an element
	window.removeEventListener('mousemove', this.onMouseMove, false);	//The event occurs when the pointer is moving while it is over an element

	window.removeEventListener('touchstart', this.onTouchStart, false);
	window.removeEventListener('touchmove', this.onTouchMove, false);
	window.removeEventListener('touchend', this.onTouchEnd, false);
}


// Old code for player movement and collision - Archive
/*
PlayState.prototype.updatePlayer = function() {
	// Reset vectors
	playervy = 0;
	playervx = 0;

	// What tile is the player standing on?
	var psx = playerx;
	var psy = playery + (playerW/2);
	var px = Math.floor(playerx / mapTileSize);
	var py = Math.floor((playery + (playerW/2))/ mapTileSize);

	// ... And how far from the edge of the tile are they?
	//	playerW = 15
	//	playerH = 30
	//	40-15 = 25 -> 25/2 = 12.5 -> Margin X
	//	40-30 = 10 -> 10/2 = 5    -> Margin Y
	var marX = psx % mapTileSize;
	var marY = psy % mapTileSize;

	textOutput = "Tile Margin: " + marX + ", " + marY;

	// Set move vectors according to input masks
	if(kUp === true){ playervy = -1;}
	if(kDn === true){ playervy = 1;}
	if(kLt === true){ playervx = -1;}
	if(kRt === true){ playervx = 1;}

	// Move the player
	playery += playervy;
	playerx += playervx;

	// We will need to keep track of which tiles to check for
	var targets = [];

	// For y movement, the x split is used to find targets
	if( playervy !== 0 ){
		if( marX < (playerW/2) ){
			// Player is split between Tile(x,y) and Tile(x-1,y)
			targets.push( {x: px + playervx, y: py + playervy } );
			targets.push( {x: px + playervx - 1, y: py + playervy } );
		}

		else if( marX > mapTileSize - (playerW/2) ){
			// Player is split between Tile(x,y) and Tile(x+1,y)
			targets.push( {x: px + playervx, y: py + playervy } );
			targets.push( {x: px + playervx + 1, y: py + playervy } );
		}else{
			targets.push( {x: px + playervx, y: py + playervy } );
		}
	}

	// For x movement, the y split is used to find targets
	if( playervx !== 0 ){
		if( marY < (playerW/2) ){
			// Player is split between Tile(x,y) and Tile(x,y-1)
			targets.push( {x: px + playervx, y: py + playervy } );
			targets.push( {x: px + playervx, y: py + playervy - 1} );
		}

		else if( marY > mapTileSize - (playerW/2) ){
			// Player is split between Tile(x,y) and Tile(x,y+1)
			targets.push( {x: px + playervx, y: py + playervy } );
			targets.push( {x: px + playervx, y: py + playervy + 1} );
		}else{
			targets.push( {x: px + playervx, y: py + playervy } );
		}
	}

	// Draw target tiles in the list
	for( var i = 0; i < targets.length; i++){
		fillRectStyle( renderOffsetX + targets[i].x * mapTileSize, renderOffsetY + targets[i].y * mapTileSize, mapTileSize, mapTileSize, "Grey" );
	}

	// Collision checks
	for( var i = 0; i < targets.length; i++){
		// If the target tile is 0, restrict movement
		if( this.getMapTile( targets[i].x, targets[i].y) === 0) {
			// Get the boundaries of the target tile
			var minX = targets[i].x * mapTileSize;
			var maxX = minX + mapTileSize;
			var minY = targets[i].y * mapTileSize;
			var maxY = minY + mapTileSize;

			if( playervx > 0 ){
				if( (playerx + (playerW / 2)) > minX) {
					playerx = minX - (playerW/2);
				}
			}
			if( playervx < 0 ){
				if( (playerx - (playerW / 2)) < maxX){
					playerx = maxX + (playerW/2);
				}
			}
			if( playervy > 0 ){
				if( (playery + playerW) > minY) {
					playery = minY - (playerW);
				}
			}
			if( playervy < 0 ){
				if( (playery) < maxY){
					playery = maxY;
				}
			}

		}
	}
}

*/
