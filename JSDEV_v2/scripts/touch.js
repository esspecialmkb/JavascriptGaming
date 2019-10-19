// ------------------------------------------
// Touch
//
function getRelativeTouchCoords(touch) {
    function getOffsetLeft( elem ) {
        var offsetLeft = 0;
        do {
            if( !isNaN( elem.offsetLeft ) ) {
                offsetLeft += elem.offsetLeft;
            }
        }
        while( elem = elem.offsetParent );
        return offsetLeft;
    }

    function getOffsetTop( elem ) {
        var offsetTop = 0;
        do {
            if( !isNaN( elem.offsetTop ) ) {
                offsetTop += elem.offsetTop;
            }
        }
        while( elem = elem.offsetParent );
        return offsetTop;
    }

    var scale = game.gameFieldRect().width / canvas.clientWidth;
    var x = touch.pageX - getOffsetLeft(canvas);
    var y = touch.pageY - getOffsetTop(canvas);

    return { x: x*scale,
             y: y*scale };
}

function touchStart(e) {
    var touches = e.changedTouches,
        touchLocation,
        playerAction;

    e.preventDefault();

    for( var i=touches.length-1; i>=0; i-- ) {
        touchLocation = getRelativeTouchCoords(touches[i]);

        if( touchLocation.x < game.gameFieldRect().width*(1/5) ) {
            playerAction = "moveLeft";
        }
        else if( touchLocation.x < game.gameFieldRect().width*(4/5) ) {
            playerAction = "fire";
        }
        else {
            playerAction = "moveRight";
        }

        playerActions.startAction(touches[i].identifier, playerAction);
    }
}

function touchEnd(e) {
    var touches = e.changedTouches;
    e.preventDefault();

    for( var i=touches.length-1; i>=0; i-- ) {
        playerActions.endAction(touches[i].identifier);
    }
}

var canvas = document.getElementById("game-layer");
canvas.addEventListener("touchstart", touchStart);
canvas.addEventListener("touchend", touchEnd);
canvas.addEventListener("touchcancel", touchEnd);