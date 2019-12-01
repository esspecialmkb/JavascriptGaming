//	TemplateState definition
//	This is the base code for implemented states
function TemplateState(callback){
	State.call(this, name, callback);
	//	Define state-specific data
	this.firstRun = true;
	this.screenWidth = 0;
	this.screenHeight = 0;
}

TemplateState.prototype = Object.create( State.prototype );

TemplateState.prototype.onKeyDown = function( e ) {
	var x = e.which || e.keyCode;
}

TemplateState.prototype.onKeyUp = function( e ) {
	var x = e.which || e.keyCode;
}

TemplateState.prototype.onMouseClick = function( e) {
	var b = e.button || e.which;
	var x = e.clientX;
	var y = e.clientY;
}

TemplateState.prototype.onMouseDown = function( e) {
	var b = e.button || e.which;
	var x = e.clientX;
	var y = e.clientY;
}

TemplateState.prototype.onMouseUp = function( e) {
	var b = e.button || e.which;
	var x = e.clientX;
	var y = e.clientY;
}

TemplateState.prototype.onMouseMove = function( e) {
	var b = e.button || e.which;
	var x = e.clientX;
	var y = e.clientY;
}

TemplateState.prototype.onTouchStart = function( e ) {
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

TemplateState.prototype.onTouchMove = function( e ) {
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

TemplateState.prototype.onTouchEnd = function( e ) {
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

TemplateState.prototype.onStart = function() {
	State.prototype.onStart.call( this);
	console.log("Starting TemplateState");
	
	this.screenWidth = canvasWidth();
	this.screenHeight = canvasHeight();
	
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

TemplateState.prototype.onUpdate = function() {
	State.prototype.onUpdate.call( this);
	if(this.firstRun){ 
		console.log("Updating TemplateState");
		this.firstRun = false;
	}
	// We only need to process input, handle gui logic, and render

	// Render
	clearCanvasStyle("black");
}

TemplateState.prototype.onStop = function() {
	State.prototype.onStop.call( this);
	console.log("Starting TemplateState");
	
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