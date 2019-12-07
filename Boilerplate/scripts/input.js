// 	The input system encapsulates events to feed them to the right fsm states
//	The input system 'could' be designed as a singleton class that communicates with the fsm controller
//	It might be best to allow each state to define event handlers
//	Keyboard Input

//	Canvas Dependancy
//var cvs = null;

var input = (function() {
	var _keyInputBuffer = [];
	var _mouseInputBuffer = [];
	var _touchInputBuffer = [];

	function _clearInputBuffer(type){
		
	}

	function _registerInputListener(type, func){

	}
}) ();

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

/*
backspace 	8
tab 	9
enter 	13
shift 	16
ctrl 	17
alt 	18
pause/break 	19
caps lock 	20
escape 	27
page up 	33
Space 	32
page down 	34
end 	35
home 	36
arrow left 	37
arrow up 	38
arrow right 	39
arrow down 	40
print screen 	44
insert 	45
delete 	46
0 	48
1 	49
2 	50
3 	51
4 	52
5 	53
6 	54
7 	55
8 	56
9 	57
a 	65
b 	66
c 	67
d 	68
e 	69
f 	70
g 	71
h 	72
i 	73
j 	74
k 	75
l 	76
m 	77
n 	78
o 	79
p 	80
q 	81
r 	82
s 	83
t 	84
u 	85
v 	86
w 	87
x 	88
y 	89
z 	90
left window key 	91
right window key 	92
select key 	93
numpad 0 	96
numpad 1 	97
numpad 2 	98
numpad 3 	99
numpad 4 	100
numpad 5 	101
numpad 6 	102
numpad 7 	103
numpad 8 	104
numpad 9 	105
multiply 	106
add 	107
subtract 	109
decimal point 	110
divide 	111
f1 	112
f2 	113
f3 	114
f4 	115
f5 	116
f6 	117
f7 	118
f8 	119
f9 	120
f10 	121
f11 	122
f12 	123
num lock 	144
scroll lock 	145
My Computer (multimedia keyboard) 	182
My Calculator (multimedia keyboard) 	183
semi-colon 	186
equal sign 	187
comma 	188
dash 	189
period 	190
forward slash 	191
open bracket 	219
back slash 	220
close braket 	221
single quote 	222
/*

//	Mouse Input
var mouseLogging = false;

var enableMouseLogging = function(value){
	mouseLogging = value;
}

function mouseClick(e){
	var button = e.button || e.which;
	var x = e.clientX; // or pageX
	var y = e.clientY; // or pageY
	if(mouseLogging == true){
		console.log("mouseClick " + e.clientX + ", " + e.clientY); 
	}
}

function mouseDown(e){
	var button = e.button || e.which;
	var x = e.clientX;
	var y = e.clientY;
	if(mouseLogging == true){
		console.log("mouseDown " + e.clientX + ", " + e.clientY); 
	}
	
}

function mouseUp(e){
	var button = e.button || e.which;
	var x = e.clientX;
	var y = e.clientY;
	if(mouseLogging == true){
		console.log("mouseUp " + e.clientX + ", " + e.clientY); 
	}
}

function mouseMove(e){
	var dX = e.movementX;
	var dY = e.movementY;
	if(mouseLogging == true){
		console.log("mouseMove " + e.movementX + ", " + e.movementY); 
	}
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
