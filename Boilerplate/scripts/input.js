// 	The input system encapsulates events to feed them to the right fsm states
//	Keyboard Input

//	Canvas Dependancy
var cvs = null;
var keyLogging = true;

var enableKeyLogging = function(value){
	keyLogging = value;
}

function keyDown(e) {
   	var x = e.which || e.keyCode;  // which or keyCode depends on browser support
	//e.preventDefault();
	if(keyLogging == true){
		console.log("Key Log: " + x + " down");
	}
}

function keyUp(e) {
	var x = e.which || e.keyCode;  // which or keyCode depends on browser support

	//e.preventDefault();
	if(keyLogging){
		console.log("Key Log: " + x + " up");
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
	console.log("mouseDown " + e.clientX + ", " + e.clientY); 
}

function mouseUp(e){
	var button = e.button || e.which;
	var x = e.clientX;
	var y = e.clientY;
	console.log("mouseUp " + e.clientX + ", " + e.clientY);
}

function mouseMove(e){
	var dX = e.movementX;
	var dY = e.movementY;
	console.log("mouseMove " + e.clientX + ", " + e.clientY);
}

var setMouseEventListener = function( func, type){
	window.addEventListener( type, func );
}

var removeMouseEventListener = function( func, type){
	window.removeEventListener( type, func );
}

window.addEventListener('click', mouseClick);	//The event occurs when the user clicks on an element
window.addEventListener('mousedown', mouseDown, false);	//The event occurs when the user presses a mouse button over an element
window.addEventListener('mouseup', mouseUp, false);	//The event occurs when a user releases a mouse button over an element
window.addEventListener('mousemove', mouseMove, true);	//The event occurs when the pointer is moving while it is over an element
//window.addEventListener('contextmenu', mouseContext);//Right click

//	Touch Input
var touchLogging = false;
var activeTouches = [];
var touchObjL = null;
var touchObjR = null;
var startLX = 0;
var startLY = 0;
var startRX = 0;
var startRY = 0;
var distLX = 0;
var distLY = 0;
var distRX = 0;
var distRY = 0;

function touchStart(e){
	var t = e.changedTouches;

	switch(t.length){
		case 1:
			if( t[0].pageX <= cvs.width/2 ){
				touchObjL = t[0];
				startLX = t[0].pageX;
				startLY = t[0].pageY;
			}else{
				touchObjR = t[0];
				startRX = t[0].pageX;
				startRY = t[0].pageY;
			}
			break;
		case 2:
			if( t[0].pageX <= cvs.width/2 ){
				touchObjL = t[0];
				startLX = t[0].pageX;
				startLY = t[0].pageY;
			}else{
				touchObjR = t[1];
				startRX = t[1].pageX;
				startRY = t[1].pageY;
			}
			break;
	}
}

function touchMove(e){
	var t = e.changedTouches;

	switch(t.length){
		case 1:
			if( t[0].pageX <= cvs.width/2 ){
				touchObjL = t[0];
				distLX = startLX - t[0].pageX;
				distLY = startLY - t[0].pageY;
			}else{
				touchObjR = t[0];
				distRX = startRX - t[0].pageX;
				distRY = startRY - t[0].pageY;
			}
			break;
		case 2:
			if( t[0].pageX <= cvs.width/2 ){
				touchObjL = t[0];
				touchObjR = t[1];
				distLX = startLX - t[0].pageX;
				distLY = startLY - t[0].pageY;

				distRX = startRX - t[1].pageX;
				distRY = startRY - t[1].pageY;
			}else{
				touchObjL = t[1];
				touchObjR = t[0];
				distLX = startLX - t[1].pageX;
				distLY = startLY - t[1].pageY;

				distRX = startRX - t[0].pageX;
				distRY = startRY - t[0].pageY;
			}
			break;
	}
}

function touchEnd(e){
	var t = e.changedTouches;

	switch(t.length){
		case 1:
			if( t[0].pageX <= cvs.width/2 ){
				touchObjL = t[0];
				distLX = 0;
				distLY = 0;
			}else{
				touchObjR = t[0];
				distRX = 0;
				distRY = 0;
			}
			break;
		case 2:
			if( t[0].pageX <= cvs.width/2 ){
				touchObjL = t[0];
				touchObjR = t[1];
				distLX = 0
				distLY = 0;

				distRX = 0;
				distRY = 0;
			}else{
				touchObjL = t[1];
				touchObjR = t[0];
				distLX = 0;
				distLY = 0;

				distRX = 0;
				distRY = 0;
			}
			break;
	}
}

var setTouchEventListener = function( func, type ){
	window.addEventListener( type, func );
}

var removeTouchEventListener = function( func, type ){
	window.removeEventListener( type, func);
}

window.addEventListener('touchstart', touchStart, false);
window.addEventListener('touchmove', touchEnd, false);
window.addEventListener('touchend', touchEnd, false);
