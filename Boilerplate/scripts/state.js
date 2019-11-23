//	This file is preceded by...
//input.js
//canvasHandle.js

//FSM-Core
var fsm = (function () {
	var _currentState = null;
	var _stateList = [];
	
	//	Called when states need to pass info to fsm
	function _stateCallback(message) {
		
	};
	
	function _setState() {
		
	};
	
	function _init() {
		_stateList.push( new StartState( _stateCallback );
		_stateList.push( new PlayState( _stateCallback );
	};
	
	function _update() {
		
	};
	
	return {
		init: _init
	};
}) ();

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
}

StartState.prototype.onUpdate = function() {
	State.prototype.onUpdate.call( this);
}

StartState.prototype.onStop = function() {
	State.prototype.onStop.call( this);
}

//	PlayState definition
function PlayState(callback){
	State.call(this, name, callback);
	//	Define state-specific data
}

PlayState.prototype = Object.create( State.prototype );

PlayState.prototype.onStart = function() {
	State.prototype.onStart.call( this);
}

PlayState.prototype.onUpdate = function() {
	State.prototype.onUpdate.call( this);
}

PlayState.prototype.onStop = function() {
	State.prototype.onStop.call( this);
}