//	This file is preceded by...
//input.js
//entity.js
//canvasHandle.j

//	StartState definition
//  The start state will be the prototype of the main menu
function StartState(callback){
	State.call(this, name, callback);

	//	Define state-specific data
	this.firstRun = true;
	this.screenWidth = 0;
	this.screenHeight = 0;
	//  The main menu will show a button in the center of the canvas
	this.textFont = ["30px Arial", "30px Comic Sans MS"];
	this.playButton = {
		x: 0,
		y: 0,
		w: 0,
		h: 0
	};
	//  The button will have the text 'play'
	//  This button needs to trigger the play state when clicked
	//  The main menu should also have title text
}

StartState.prototype = Object.create( State.prototype );

StartState.prototype.onKeyDown = function( e ) {
	var x = e.which || e.keyCode;
}

StartState.prototype.onKeyUp = function( e ) {
	var x = e.which || e.keyCode;
}

StartState.prototype.onMouseClick = function( e) {
	var b = e.button || e.which;
	var x = e.clientX;
	var y = e.clientY;
}

StartState.prototype.onMouseDown = function( e) {
	var b = e.button || e.which;
	var x = e.clientX;
	var y = e.clientY;
}

StartState.prototype.onMouseUp = function( e) {
	var b = e.button || e.which;
	var x = e.clientX;
	var y = e.clientY;
}

StartState.prototype.onMouseMove = function( e) {
	var b = e.button || e.which;
	var x = e.clientX;
	var y = e.clientY;
}

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
	State.prototype.onStart.call( this);
	console.log("Starting StartState");
	//	Register compononents needed for start state
	this.screenWidth = canvasWidth();
	this.screenHeight = canvasHeight();

	this.playButton.x = this.screenWidth / 3;
	this.playButton.y = (this.screenHeight / 5) * 3;
	this.playButton.w = this.screenWidth / 3; 
	this.playButton.h = 50;
	
	//	Register input listeners
	window.addEventListener('keydown', this.onKeyDown );
	window.addEventListener('keyup', this.onKeyUp );
	
	window.addEventListener('click', this.onMouseClick);	//The event occurs when the user clicks on an element
	window.addEventListener('mousedown', this.onMouseDown, false);	//The event occurs when the user presses a mouse button over an element
	window.addEventListener('mouseup', this.onMouseUp, false);	//The event occurs when a user releases a mouse button over an element
	window.addEventListener('mousemove', this.onMouseMove, false);	//The event occurs when the pointer is moving while it is over an element
	
	window.addEventListener('touchstart', this.onTouchStart, false);
	window.addEventListener('touchmove', this.onTouchMove, false);
	window.addEventListener('touchend', this.onTouchEnd, false);
}

StartState.prototype.onUpdate = function() {
	State.prototype.onUpdate.call( this);
	if(this.firstRun){ 
		console.log("Updating StartState");
		this.firstRun = false;
	}

	// We only need to process input, handle gui logic, and render

	// Render
	clearCanvasStyle("black");

	// Play Button
	fillRectStyle( this.playButton.x, this.playButton.y, this.playButton.w, this.playButton.h, "Green");
	fillTextStyle( this.playButton.x + (this.playButton.w/4), this.playButton.y + 35, "Play Demo", "30px Arial", "Black");
}

StartState.prototype.onStop = function() {
	State.prototype.onStop.call( this);
	console.log("Stopping StartState");
	
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
			State.prototype.onMessage.call(this, type, data);
	}
}