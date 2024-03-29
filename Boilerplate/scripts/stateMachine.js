//	This file is preceded by...
//input.js
//canvasHandle.js
//state.js

//FSM-Core
var fsm = (function () {
	var _currentState = null;
	var _nextState = -1;
	var _stateList = [];
	var _animationFrameId = null;
	var eventList = [];
	
	//	Called when states need to pass info to fsm
	function _stateCallback(message) {
		switch(message.event){
			case 'PlayStateStart':
				_nextState = 1;
				break;
			case 'Quit':
				_nextState = 0;
				break;
		}
	};

	function _getInput() {
		
	};
	
	function _setState(state) {
		if( _currentState !== null ){
			_currentState.onStop();
		}
		_currentState = state;
		_currentState.onStart();
	};
	
	function _init() {
		_stateList.push( new StartState( "start", _stateCallback ));
		_stateList.push( new PlayState( "play", _stateCallback ));
		_setState(_stateList[0] );

	};
	
	function _update() {
		if( _currentState !== null ){
			_currentState.onUpdate();
			//drawScreen();
		}
		if( _nextState !== -1){
			_setState( _stateList[ _nextState ] );
			_nextState = -1;
		}
		
		window.requestAnimationFrame(_update);		
	};
	
	return {
		stateCallback: _stateCallback,
		init: _init,
		setState: _setState,
		update: _update		
	};
}) ();

//fsm.init();

// Init is called first, to prepare the state machine and set initial state
// The update method gets called once per-frame, updating the current state
// The FSM and active states can set their own listeners for input

//setKeyboardEventListener(keyDown,'keydown');  //keydown, keyup
//removeKeyboardEventListener(keyUp,'keyup');

//setMouseEventListener(func, eventType);	//click, mousedown, mouseup, mouseomve
//removeMouseEventListener(func, eventType);

//setTouchEventListener(func, eventType);	//touchstart, touchmove, touchend
//removeTouchEventListener(func, eventType);
