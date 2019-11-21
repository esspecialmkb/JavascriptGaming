var body = document.getElementsByTagName("body");
var html = document.getElementsByTagName("html");

var cvsDiv = document.getElementById("canvasDiv");

var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var cWidth = 0;
var cHeight = 0;

var cwWidth = 400;
var cHeight = 400;

var wWidth = 0;
var wHeight = 0;

var renderMode = "fullscreen";

var setCanvasSize = function( width, height) {
	cwWidth = width;
	cwHeight = height;
	if(renderMode == "windowed"){
		resizeCanvas();
	}
}

var resizeCanvas = function(){
	var newHeight = window.clientHeight;
	var newWidth = window.clientWidth;

	if(renderMode == "fullscreen"){
		cvs.width = newWidth;
		cvs.height = newHeight;
	}else if(renderMode == "windowed"){
		cvs.width = cwWidth;
		cvs.height = cwHeight;
	}
}

var setRenderMode = function( mode ){
	// Set the style according to mode
	if(mode == "fullscreen"){	//cvsDiv.style
		cvsDiv.style.margin = "0 auto";
		cvsDiv.style.align-content = "center";
		cvsDiv.style.align-items = "center";
		cvsDiv.style.width = "100%";
		cvsDiv.style.height = "100%";

		cvs.style.display = "block";
		cvs.style.position = "relative";
		cvs.style.margin = "auto";
		cvs.style.left = "auto";
		cvs.style.right = "auto";
		cvs.style.width = "100%";
		cvs.style.height = "100%";

		cvs.width = wWidth;
		cvs.height = wHeight;

		html.style.overflow = "hidden";
		html.style.width = "100%";
		html.style.height = "100%";
		html.style.margin = "0";
		html.style.padding = "0";

		body.style.overflow = "hidden";
		body.style.width = "100%";
		body.style.height = "100%";
		body.style.margin = "0";
		body.style.padding = "0";
	}
	if(mode == "windowed"){
		cvsDiv.style.margin = "0 auto";
		cvsDiv.style.align-content = "center";
		cvsDiv.style.align-items = "center";
		cvsDiv.style.width = "100%";
		cvsDiv.style.height = "100%";

		cvs.style.display = "block";
		cvs.style.position = "relative";
		cvs.style.margin = "auto";
		cvs.style.left = "auto";
		cvs.style.right = "auto";
		cvs.style.width = cwWidth + "px";
		cvs.style.height = cwHeight + "px";

		cvs.width = cwWidth;
		cvs.height = cwHeight;

		html.style.overflow = "hidden";
		html.style.width = "100%";
		html.style.height = "100%";
		html.style.margin = "0";
		html.style.padding = "0";

		body.style.overflow = "hidden";
		body.style.width = "100%";
		body.style.height = "100%";
		body.style.margin = "0";
		body.style.padding = "0";
	}

	resizeCanvas();
}