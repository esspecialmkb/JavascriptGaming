// ------------------------------------------
// Keyboard
//
var keybinds = { 32: "attack",
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