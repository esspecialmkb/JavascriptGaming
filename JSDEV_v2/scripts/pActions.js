// ------------------------------------------
// Player Actions
//
var playerActions = (function () {
    var _ongoingActions = [];

    function _startAction(id, playerAction) {
	//console.log("playerActions() call");
        if( playerAction === undefined ) {
            return;
        }

        var f,
            acts = {"moveDown":  function () { if(game.player()) game.player().moveDown(true); },
		    "moveUp":  function () { if(game.player()) game.player().moveUp(true); },
		    "moveLeft":  function () { if(game.player()) game.player().moveLeft(true); },
                    "moveRight": function () { if(game.player()) game.player().moveRight(true); },
                    "attack":      function () { if(game.player()) game.player().attack(); } };

        if(f = acts[playerAction]) f();

        _ongoingActions.push( {identifier:id, playerAction:playerAction} );
    }

    function _endAction(id) {
        var f,
            acts = {"moveDown":  function () { if(game.player()) game.player().moveDown(false); },
		    "moveUp":  function () { if(game.player()) game.player().moveUp(false); },
		    "moveLeft":  function () { if(game.player()) game.player().moveLeft(false); },
                    "moveRight": function () { if(game.player()) game.player().moveRight(false); } };

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