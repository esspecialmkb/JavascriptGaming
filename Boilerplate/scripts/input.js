// 	The input system encapsulates events to feed them to the right fsm states
//	Keyboard Input
var keyLogging = true;

var enableKeyLogging = function(value){
	keyLogging = value;
}

function keyDown(e) {
   	var x = e.which || e.keyCode;  // which or keyCode depends on browser support
	abc
	//e.preventDefault();
	if(keyLogging == true){
		console.log("Key Log: " + x + " down");
	}
}

function keyUp(e) {
	var x = e.which || e.keyCode;  // which or keyCode depends on browser support

	//e.preventDefault();
	if(keyLogging){
		console.log("Key Log: " + x + " down");
	}
}

var setKeyboardEventListener = function( func , type ){
	window.addEventListener( type, func );
}

var removeKeyboardEventListener = function( func, type){
	window.removeEventListener( type, func );
}

window.addEventListener('keydown' , keyDown );
window.addEventListener('keyup' , keyUp );

//setKeyboardEventListener(keyDown,'keydown');
//setKeyboardEventListener(keyUp,'keyup');

//	Mouse Input
var mouseLogging = false;

var enableMouseLogging = function(value){
	mouseLogging = value;
}

function mouseClick(e){
	var button = e.button || e.which;
	var x = e.clientX; // or pageX
	var y = e.clientY; // or pageY
}

function mouseDown(e){
	var button = e.button || e.which;
	var x = e.clientX;
	var y = e.clientY;
}

function mouseUp(e){
	var button = e.button || e.which;
	var x = e.clientX;
	var y = e.clientY;
}

function mouseMove(e){
	var dX = e.movementX;
	var dY = e.movementY;
}

var setMouseEventListener = function( func, type){
	window.addEventListener( type, func );
}

var removeMouseEventListener = function( func, type){
	window.removeEventListener( type, func );
}

//window.addEventListener('onclick', mouseClick);	//The event occurs when the user clicks on an element
//window.addEventListener('onmousedown', mouseDown);	//The event occurs when the user presses a mouse button over an element
//window.addEventListener('onmouseup', mouseUp);	//The event occurs when a user releases a mouse button over an element
//window.addEventListener('onmousemove", mouseMove);	//The event occurs when the pointer is moving while it is over an element
//window.addEventListener('oncontextmenu', mouseContext);//Right click

//	Touch Input
var touchLogging = false;

function touchStart(e){
	var touches = e.changedTouches;
}

function touchMove(e){
	var touches = e.changedTouches;
}

function touchEnd(e){
	var touches = e.changedTouches;
}

var setTouchEventListener = function( func, type ){
	window.addEventListener( type, func );
}

var removeTouchEventListener = function( func, type ){
	window.removeEventListener( type, func);
}