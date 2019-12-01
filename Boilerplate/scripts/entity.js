function Entity(name, x, y, w, h) {
	this.name = name;
	this.x = 0;
	this.y = 0;
	this.w = 0;
	this.h = 0;

	this.type = 0;
}

Entity.prototype.update = function( dt ) {}

Entity.prototype.setPosition = function(x,y) {
	this.x = x;
	this.y = y;
}

function jsButton(name, x, y, w, h) {
	Entity.call(this,name, x, y, w, h);
	this.eventProc = null;
}

jsButton.prototype = Object.create(Entity.prototype);

jsButton.prototype.update = function( dt ) {}

jsButton.prototype.setPosition = function(x,y) {
	Entity.prototype.setPosition.call(this, x, y);
}