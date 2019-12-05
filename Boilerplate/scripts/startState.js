//	This file is preceded by...
//input.js
//entity.js
//canvasHandle.js


//	StartState definition
//  The start state will now be it's own object
//  The mouse position check in the update loop works with the mouse x and y params external to the object
var startStateMX = -1;
var startStateMY = -1;
var startStateMouse = false;

function StartState(callback){
	//State.call(this, name, callback);
	this.name = name;
	this.callback = callback;

	//	Define state-specific data
	this.firstRun = true;
	this.screenWidth = 0;
	this.screenHeight = 0;

	//	Store all of the fonts needed for this screen
	this.textFont = ["30px Arial", "30px Comic Sans MS"];

	//  The main menu will show a button in the center of the canvas
	//  The button will have the text 'play'
	//  This button needs to trigger the play state when clicked
	//  We would also like to know if the button is active
	this.playButton = {};
	
	//  The main menu should also have title text

	//	Track the mouse coordinates
	this.mX = 0;
	this.mY = 0;
	this.mouseClick = false;

	this.debugToggle = false;
}

StartState.prototype.updateMouse = function(x, y) {
	startStateMX = x;
	startStateMY = y;
}

//	Keyboard handlers
StartState.prototype.onKeyDown = function( e ) {
	var x = e.which || e.keyCode;
}

StartState.prototype.onKeyUp = function( e ) {
	var x = e.which || e.keyCode;	
}

//	Mouse handlers
StartState.prototype.onMouseClick = function( e ) {
	var b = e.button || e.which;
	startStateMX = e.clientX;
	startStateMY = e.clientY;
	startStateMouse = true;
}

StartState.prototype.onMouseDown = function( e) {
	var b = e.button || e.which;
	startStateMX = e.clientX;
	startStateMY = e.clientY;
}

StartState.prototype.onMouseUp = function( e) {
	var b = e.button || e.which;
	startStateMX = e.clientX;
	startStateMY = e.clientY;
}

StartState.prototype.onMouseMove = function( e) {
	var b = e.button || e.which;
	startStateMX = e.clientX;
	startStateMY = e.clientY;
}

//	Touch handlers
StartState.prototype.onTouchStart = function( e ) {
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

StartState.prototype.onTouchMove = function( e ) {
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

StartState.prototype.onTouchEnd = function( e ) {
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

StartState.prototype.onStart = function() {
	console.log("Starting StartState");
	//	Register compononents needed for start state
	this.screenWidth = canvasWidth();
	this.screenHeight = canvasHeight();

	this.playButton.x = this.screenWidth / 3;
	this.playButton.y = (this.screenHeight / 5) * 3;
	this.playButton.w = this.screenWidth / 3; 
	this.playButton.h = 50;
	this.playButton.text = "Play Demo";
	this.playButton.active = false;
	
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

	// Setup external state data
	startStateMX = -1;
	startStateMY = -1;
	startStateMouse = false;
}

StartState.prototype.onUpdate = function() {
	if(this.firstRun){ 
		console.log("Updating StartState");
		this.firstRun = false;
	}

	// We only need to process input, handle gui logic, and render

	// Render
	clearCanvasStyle("black");

	// Play Button
	fillRectStyle( this.playButton.x, this.playButton.y, this.playButton.w, this.playButton.h, "Green");
	fillTextStyle( this.playButton.x + (this.playButton.w/4), this.playButton.y + 35, this.playButton.text, this.textFont[0], "Black");

	// GUI logic
	// Check the mouse position
	// Whenever the mouse hovers over any GUI object, we should set it as the active object
	if( 	(startStateMX > this.playButton.x) && 
		(startStateMX < (this.playButton.x + this.playButton.w)) &&
	    	(startStateMY > this.playButton.y) && 
		(startStateMY < (this.playButton.y + this.playButton.h)) ) {
		// Change the button's render color if the mouse is hovering over it
		
		strokeRectStyle( this.playButton.x, this.playButton.y, this.playButton.w, this.playButton.h, "White");

		if( startStateMouse  === true ){ 
			console.log("Mouse Click!");
			startStateMouse = false;
			// We need to ask the state machine to remove this state and start the play state
			var message = {
				state: 'StartState',
				event: 'PlayStateStart'
			}
			fsm.stateCallback(message);
		}
	}
	
}

StartState.prototype.onStop = function() {
	console.log("Stopping StartState");
	
	//	Remove input listeners
	window.removeEventListener('keydown', this.onKeyDown );
	window.removeEventListener('keyup', this.onKeyUp );
	
	window.removeEventListener('click', this.onMouseClick);	//The event occurs when the user clicks on an element
	window.removeEventListener('mousedown', this.onMouseDown, false);	//The event occurs when the user presses a mouse button over an element
	window.removeEventListener('mouseup', this.onMouseUp, false);	//The event occurs when a user releases a mouse button over an element
	window.removeEventListener('mousemove', this.onMouseMove, false);	//The event occurs when the pointer is moving while it is over an element
	
	//window.removeEventListener('touchstart', this.onTouchStart, false);
	//window.removeEventListener('touchmove', this.onTouchMove, false);
	//window.removeEventListener('touchend', this.onTouchEnd, false);

	startStateMX = null;
	startStateMY = null;
	startStateMouse = null;
}

StartState.prototype.onMessage = function( type, data ) {
	switch(type){
		case 'resize':
			break;
		case 'keydown':
			break;
		case 'keyup':
			break;
		case 'mousemove':
			break;
		default:
	}
}
