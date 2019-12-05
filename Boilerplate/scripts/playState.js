//	PlayState definition

var mapTiles = [];
var mapTileSize = 40;
var mapWidth = 10;
var mapHeight = 10;

function PlayState(callback){
	//State.call(this, name, callback);
	//	Define state-specific data
	this.firstRun = true;
	this.screenWidth = 0;
	this.screenHeight = 0;
	
	this.map = null;
	
}

PlayState.prototype = Object.create( State.prototype );

//	Keyboard input handlers
PlayState.prototype.onKeyDown = function( e ) {
	var x = e.which || e.keyCode;
}

PlayState.prototype.onKeyUp = function( e ) {
	var x = e.which || e.keyCode;
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

//	State initializer
PlayState.prototype.onStart = function() {
	console.log("Starting PlayState");
	
	this.screenWidth = canvasWidth();
	this.screenHeight = canvasHeight();
	
	// The map needs to be created
	for( var tY = 0; tY < mapHeight; tY++ ){
		for( var tX = 0; tX < mapWidth; tX
	}
	
	//	Register input listeners
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

PlayState.prototype.onUpdate = function() {
	if(this.firstRun){ 
		console.log("Updating PlayState");
		this.firstRun = false;
	}
	// We only need to process input, handle gui logic, and render

	// Render
	clearCanvasStyle("black");
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
