//	This file is preceded by...
//input.js
//canvasHandle.js
//state.js

//FSM-Core
var fsm = (function () {
	var _currentState = null;
	var _stateList = [];
	var _animationFrameId = null;
	var eventList = [];
	
	//	Called when states need to pass info to fsm
	function _stateCallback(message) {
		
	};

	function _getInput() {
		
	};
	
	function _setState(state) {
		if( _currentState != null ){
			_currentState.onStop();
		}
		_currentState = state;
		_currentState.onStart();
	};
	
	function _init() {
		_stateList.push( new StartState( _stateCallback ));
		_stateList.push( new PlayState( _stateCallback ));
		_setState(_stateList[0] );

		_registerAnimationFrame();
	};
	
	function _update() {
		if( _currentState != null ){
			_currentState.onUpdate();
			//drawScreen();
		}
		
	};

	function _registerAnimationFrame(){
		_animationFrameID = window.requestAnimationFrame(_update);
	}

	function _deregisterAnimationFrame(){
		if(_animationFrameId){
			window.cancelAnimationFrame(_animationFrameId);
			_animationFrameId = null;
		}
	}
	
	return {
		stateCallback: _stateCallback,
		init: _init,
		setState: _setState,
		update: _update		
	};
}) ();

fsm.init();

// Init is called first, to prepare the state machine and set initial state
// The update method gets called once per-frame, updating the current state
// The FSM and active states can set their own listeners for input

//setKeyboardEventListener(keyDown,'keydown');  //keydown, keyup
//removeKeyboardEventListener(keyUp,'keyup');

//setMouseEventListener(func, eventType);	//click, mousedown, mouseup, mouseomve
//removeMouseEventListener(func, eventType);

//setTouchEventListener(func, eventType);	//touchstart, touchmove, touchend
//removeTouchEventListener(func, eventType);