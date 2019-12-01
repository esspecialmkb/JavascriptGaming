//	This file is preceded by...
//input.js
//entity.js
//canvasHandle.js

//	Prototype state definition
function State(name, callback){
	//	Define global state data
	this.name = null;
	this.messageCallback = callback;
}

//	Called when a state is about to start
State.prototype.onStart = function() {}

//	Called once per every frame
State.prototype.onUpdate = function() {}

//	Called when a state is about to stop
State.prototype.onStop = function() {}

//	Called when a message or event is received
State.prototype.onMessage = function(message) {}