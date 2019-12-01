//	This file is preceded by...
//input.js
//entity.js
//canvasHandle.js

//	Alternate StartState implementation
class BetaStartState extends BaseState {
	constructor(name, callback) {
		super.constructor(name, callback);

		this.mouseClick = true;
		this.mouseX = 0;
		this.mouseY = 0;
	}

	onKeyDown( e ) {
		var key = e.which || e.keyCode;
	}

	onKeyUp( e ) {
		var key = e.which || e.keyCode;
	}

	onMouseClick( e ) {
		var b = e.button || e.which;
		this.mouseX = e.clientX;
		this.mouseY = e.clientY;
		this.mouseClick = true;
		//console.log("Mouse Click at: " + this.mouseX + ", " + this.mouseY);
	}

	onMouseMove( e ) {
		this.mouseX = e.clientX;
		this.mouseY = e.clientY;
		this.mouseClick = true;
		//console.log("Mouse Move at: " + this.mouseX + ", " + this.mouseY);
	}

	onStart() {
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
		//window.addEventListener('mousedown', this.onMouseDown, false);	//The event occurs when the user presses a mouse button over an element
		//window.addEventListener('mouseup', this.onMouseUp, false);	//The event occurs when a user releases a mouse button over an element
		window.addEventListener('mousemove', this.onMouseMove, false);	//The event occurs when the pointer is moving while it is over an element
		
		//window.addEventListener('touchstart', this.onTouchStart, false);
		//window.addEventListener('touchmove', this.onTouchMove, false);
		//window.addEventListener('touchend', this.onTouchEnd, false);
	}

	onUpdate() {
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
		if( 	(this.mouseX > this.playButton.x) && 
			(this.mouseX < (this.playButton.x + this.playButton.w)) &&
		    	(this.mouseY > this.playButton.y) && 
			(this.mouseY < (this.playButton.y + this.playButton.h)) ) {
			// Change the button's render color if the mouse is hovering over it
			
			strokeRectStyle( this.playButton.x, this.playButton.y, this.playButton.w, this.playButton.h, "White");
		}
		if(this.debugToggle){
			console.log("Mouse: " + this.mX + ", " + this.mY + ". Button: " + this.playButton.x + ", " + this.playButton.y);
		}
	}

	onStop() {
		console.log("Stopping StartState");
	
		//	Remove input listeners
		window.removeEventListener('keydown', this.onKeyDown );
		window.removeEventListener('keyup', this.onKeyUp );
		
		window.removeEventListener('click', this.onMouseClick);	//The event occurs when the user clicks on an element
		//window.removeEventListener('mousedown', this.onMouseDown, false);	//The event occurs when the user presses a mouse button over an element
		//window.removeEventListener('mouseup', this.onMouseUp, false);	//The event occurs when a user releases a mouse button over an element
		window.removeEventListener('mousemove', this.onMouseMove, false);	//The event occurs when the pointer is moving while it is over an element
		
		//window.removeEventListener('touchstart', this.onTouchStart, false);
		//window.removeEventListener('touchmove', this.onTouchMove, false);
		//window.removeEventListener('touchend', this.onTouchEnd, false);
	}

	onMessage(message) {}
}

//	StartState definition
//  The start state will be the prototype of the main menu
function StartState(callback){
	State.call(this, name, callback);

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

StartState.prototype = Object.create( State.prototype );

StartState.prototype.updateMouse = function(x, y) {
	this.mX = x;
	this.mY = y;
}

//	Keyboard handlers
StartState.prototype.onKeyDown = function( e ) {
	var x = e.which || e.keyCode;
}

StartState.prototype.onKeyUp = function( e ) {
	var x = e.which || e.keyCode;
	if( x == 32 ){
		;
		if(this.debugToggle == true){
			this.debugToggle = false;
		}else{ this.debugToggle = true; }

		console.log("Debug Toggle: " + this.debugToggle)
	}
	
}

//	Mouse handlers
StartState.prototype.onMouseClick = function( e ) {
	var b = e.button || e.which;
	//this.mX = e.clientX;
	//this.mY = e.clientY;
	this.updateMouse(e.clientX, e.clientY);
	this.mouseClick = true;
	console.log("Mouse Click at: " + this.mX + ", " + this.mY);
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
	mouseX = e.clientX;
	mouseY = e.clientY;
	//console.log("Mouse Move: " + this.mouseX + ", " + this.mouseY);
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
	State.prototype.onStart.call( this);
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
	fillTextStyle( this.playButton.x + (this.playButton.w/4), this.playButton.y + 35, this.playButton.text, this.textFont[0], "Black");

	// GUI logic
	// Check the mouse position
	if( 	(this.mouseX > this.playButton.x) && 
		(this.mouseX < (this.playButton.x + this.playButton.w)) &&
	    	(this.mouseY > this.playButton.y) && 
		(this.mouseY < (this.playButton.y + this.playButton.h)) ) {
		// Change the button's render color if the mouse is hovering over it
		
		strokeRectStyle( this.playButton.x, this.playButton.y, this.playButton.w, this.playButton.h, "White");
	}
	if(this.debugToggle){
		console.log("Mouse: " + this.mX + ", " + this.mY + ". Button: " + this.playButton.x + ", " + this.playButton.y);
	}
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
	
	//window.removeEventListener('touchstart', this.onTouchStart, false);
	//window.removeEventListener('touchmove', this.onTouchMove, false);
	//window.removeEventListener('touchend', this.onTouchEnd, false);
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