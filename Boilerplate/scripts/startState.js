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
}

StartState.prototype.onUpdate = function() {
	State.prototype.onUpdate.call( this);
	if(this.firstRun){ 
		console.log("Updating StartState");
		this.firstRun = false;
	}

	// We only need to process input, handle gui logic, and render

	// Render

	// Play Button
	fillRectStyle( this.playButton.x, this.playButton.y, this.playButton.w, this.playButton.h, "Green");
	fillTextStyle( this.playButton.x + (this.playButton.w/4), this.playButton.y + 35, "Play Demo", "30px Arial", "Black");
}

StartState.prototype.onStop = function() {
	State.prototype.onStop.call( this);
	console.log("Stopping StartState");
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