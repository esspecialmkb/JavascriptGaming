//	This file is preceded by...
//input.js

//	The Canvas handle is intended to encapsulate the canvas and 2d context
//	When indivdual states need to render something, that object is registered here
//	There should be 3 different entity types:
//	Rect-based entities
//	Text-based entities
//	Arc-based entities

cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
	
var a = 0;
var r = 10;
var l = 100;
var xA = cvs.width/3;
var yA = cvs.height/3;
var xB = 2 * (cvs.width/3);
var yB = cvs.height/3;
	
	
	
var resizeCanvas = function(){
	cvs.style.width = window.innerWidth;
	cvs.width = window.innerWidth;
	cvs.style.height = window.innerHeight;
	cvs.height = window.innerHeight;
	console.log("Canvas size: " + cvs.width + ", " + cvs.height);
	xA = cvs.width/3;
	yA = cvs.height/3;
	xB = 2 * (cvs.width/3);
	yB = cvs.height/3;
}



var drawCircle = function(ra, x, y){
	ctx.fillStyle = "white";
	ctx.fillRect(x - (ra/2), y - (ra/2), ra, ra);
}

// Methods intended for use with other objects/states
var drawArc = function(x, y, r, sAngle, eAngle, counterClock){
	ctx.arc(x, y, r, sAngle, eAngle, counterClock);
}

var drawRect = function(x, y, w, h, style){
	ctx.fillRect(x,y,w,h);
}
var drawTouchInput = function(){
	if(distLX < 0 || distLX > 0){
		 ctx.fillStyle = "red";
		 ctx.fillRect(xA - r,yA - r,distLX *-1,r);
	}
	if(distRX != 0){
		 ctx.fillStyle = "blue";
		 ctx.fillRect(xB - r,yB - r,distRX *-1,r);
	}
}
var drawScreen = function(){
	ctx.fillStyle = "black";
	ctx.clearRect(0,0,cvs.width,cvs.height);
	ctx.fillRect(0,0,cvs.width,cvs.height);
	//drawCircle(r,xA,yA);
	//drawCircle(r,xA + (Math.sin(a)*l), yA + (Math.cos(a)*l));
	a += 0.1;
	drawTouchInput();
	window.requestAnimationFrame(drawScreen);
}

var gainFocus = function(){
	console.log("Gained focus at: " + Date.now());
}

var loseFocus = function(){
	console.log("Lost focus at: " + Date.now());	
}

resizeCanvas();

window.addEventListener('resize',resizeCanvas);
window.addEventListener('focus', gainFocus, false);
window.addEventListener('blur', loseFocus);

//drawScreen();	// drawScreen is called here for testing purposes
		//	We are going to let the fsm determine what needs to be drawn
