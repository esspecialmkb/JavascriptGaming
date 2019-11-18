// ------------------------------------------
// The Player Actions object encapsulates input parsing
var playerActions = (function () {
    var _ongoingActions = [];

    function _startAction(id, playerAction) {
	//console.log("playerActions() call");
        if( playerAction === undefined ) {
            return;
        }

        var f,
            acts = {"moveDown":  function () { if(core.player()) core.player().moveDown(true); },
		    "moveUp":  function () { if(core.player()) core.player().moveUp(true); },
		    "moveLeft":  function () { if(core.player()) core.player().moveLeft(true); },
                    "moveRight": function () { if(core.player()) core.player().moveRight(true); },
		  //"dodge": function () { if(core.player()) core.player().dodge(); },
                    "attack":      function () { if(core.player()) core.player().attack(); } };

        if(f = acts[playerAction]) f();

        _ongoingActions.push( {identifier:id, playerAction:playerAction} );
    }

    function _endAction(id) {
        var f,
            acts = {"moveDown":  function () { if(core.player()) core.player().moveDown(false); },
		    "moveUp":  function () { if(core.player()) core.player().moveUp(false); },
		    "moveLeft":  function () { if(core.player()) core.player().moveLeft(false); },
                    "moveRight": function () { if(core.player()) core.player().moveRight(false); } };

        var idx = _ongoingActions.findIndex(function(a) { return a.identifier === id; });

        if (idx >= 0) {
            if(f = acts[_ongoingActions[idx].playerAction]) f();
            _ongoingActions.splice(idx, 1);  // remove action at idx
        }
    }

    return {
        startAction: _startAction,
        endAction: _endAction
    };
})();


// ------------------------------------------
// Keyboard
var keybinds = { 16: "dodge",		// Shift
		 32: "attack",		// Space
                 37: "moveLeft",
		 38: "moveUp",
                 39: "moveRight",
		 40: "moveDown" };

function keyDown(e) {
    var x = e.which || e.keyCode;  // which or keyCode depends on browser support

    if( keybinds[x] !== undefined ) {
        e.preventDefault();
        playerActions.startAction(x, keybinds[x]);
    }
};

function keyUp(e) {
    var x = e.which || e.keyCode;

    if( keybinds[x] !== undefined ) {
        e.preventDefault();
        playerActions.endAction(x);
    }
};

//document.body.addEventListener('keydown', keyDown);
//document.body.addEventListener('keyup', keyUp);

window.addEventListener('keydown' , keyDown );
window.addEventListener('keyup' , keyUp );
