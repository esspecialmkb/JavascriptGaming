//	This file is preceded by...
//input.js

//	The Canvas handle is intended to encapsulate the canvas and 2d context
//	When indivdual states need to render something, that object is registered here
//	There should be 3 different entity types:
//	Rect-based entities
//	Text-based entities
//	Arc-based entities

var cvs = document.getElementById("canvas");
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

var canvasWidth = function(){
	return cvs.width;
}

var canvasHeight = function(){
	return cvs.height;
}

var clearCanvas = function() {
	ctx.fillRect(0,0,cvs.width,cvs.height);
}

var clearCanvasStyle = function(style) {
	setFillStyle( style );
	clearCanvas();
}

var drawCircle = function(ra, x, y){
	ctx.fillStyle = "white";
	ctx.fillRect(x - (ra/2), y - (ra/2), ra, ra);
}

// Methods intended for use with other objects/states
var drawArc = function(x, y, r, sAngle, eAngle, counterClock){
	ctx.arc(x, y, r, sAngle, eAngle, counterClock);
}

// Draw Rect with style
var fillRectStyle = function(x, y, w, h, style){
	setFillStyle( style );
	fillRect(x,y,w,h);
}

// Draw Rect with current style
var fillRect = function(x, y, w, h){
	ctx.fillRect(x,y,w,h);
}

// Draw Stroked Rect
var strokeRect = function(x, y, w, h){
	ctx.strokeRect(x,y,w,h);
}

var strokeRectStyle = function(x, y, w, h, style){
	ctx.strokeStyle = style;
	ctx.strokeRect(x,y,w,h);
}

// Draw Filled Text
var fillText = function(x, y, text, font){
	ctx.font = font || "30px Arial";
	ctx.fillText( text, x, y);
}

var text = function( x, y, text ){
	ctx.fillText( text, x, y );
}

var fillTextStyle = function(x, y, text, font, style){
	ctx.fillStyle = style;
	ctx.font = font || "30px Arial";
	ctx.fillText( text, x, y);
}

// Draw Stroked Text
var strokeText = function(x, y, text, font){
	ctx.font = font || "30px Arial";
	ctx.strokeText( text, x, y);
}

var strokeTextStyle = function(x, y, text, font, style){
	ctx.strokeStyle = style;
	ctx.font = font || "30px Arial";
	ctx.strokeText( text, x, y);
}

// Set FillStyle
var setFillStyle = function( style ){
	ctx.fillStyle = style;
}

// Set Stroke style
var setStrokeStyle = function( style ){
	ctx.strokeStyle = style;
}

var setFont = function( font ){
	ctx.font = font;
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
	//window.requestAnimationFrame(drawScreen);
}

var gainFocus = function(){
	console.log("Gained focus at: " + Date.now());
}

var loseFocus = function(){
	console.log("Lost focus at: " + Date.now());	
}

/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 * * Altered to convert h from (0, 360) range to (0, 1) *
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  v       The value
 * @return  Array           The RGB representation
 * @usage
	rgb = hsvToRgb(Math.floor(Math.random() * 360), 1, 1);
	this.fillStyle = "rgb(" +rgb[0]+ " ," + rgb[1] + " ," + rgb[2] + ")";
 */
var hsvToRgb = function (h, s, v){
    var r, g, b;

    var i = Math.floor((h / 360) * 6);
    var f = (h / 360) * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    switch(i % 6){
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return [r * 255, g * 255, b * 255];
}

// Alternate variations
var hsvFillStyle = function (h, s, v){
	rgb = hsvToRGB(h,s,v);
	setFillStyle("rgb(" +rgb[0]+ " ," + rgb[1] + " ," + rgb[2] + ")");
}

var hsvStrokeStyle = function (h, s, v){
	rgb = hsvToRGB(h,s,v);
	setStrokeStyle("rgb(" +rgb[0]+ " ," + rgb[1] + " ," + rgb[2] + ")");
}

window.addEventListener('resize',resizeCanvas);
window.addEventListener('focus', gainFocus, false);
window.addEventListener('blur', loseFocus);

//drawScreen();	// drawScreen is called here for testing purposes
		//	We are going to let the fsm determine what needs to be drawn