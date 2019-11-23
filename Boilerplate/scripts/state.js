//	This file is preceded by...
//input.js
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

//	StartState definition
function StartState(callback){
	State.call(this, name, callback);
	//	Define state-specific data
}

StartState.prototype = Object.create( State.prototype );

StartState.prototype.onStart = function() {
	State.prototype.onStart.call( this);
	console.log("Starting StartState");
	//	Register compononents needed for start state
}

StartState.prototype.onUpdate = function() {
	State.prototype.onUpdate.call( this);
}

StartState.prototype.onStop = function() {
	State.prototype.onStop.call( this);
	console.log("Stopping StartState");
}

//	PlayState definition
function PlayState(callback){
	State.call(this, name, callback);
	//	Define state-specific data
}

PlayState.prototype = Object.create( State.prototype );

PlayState.prototype.onStart = function() {
	State.prototype.onStart.call( this);
	console.log("Starting PlayState");
}

PlayState.prototype.onUpdate = function() {
	State.prototype.onUpdate.call( this);
}

PlayState.prototype.onStop = function() {
	State.prototype.onStop.call( this);
	console.log("Starting PlayState");
}
