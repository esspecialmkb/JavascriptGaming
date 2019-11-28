function Entity(name) {
	this.name = name;
	this.x = 0;
	this.y = 0;
	this.w = 0;
	this.h = 0;

	this.type = 0;
}

Entity.prototype.update = function() {}

Entity.prototype.setPosition = function(x,y) {
	this.x = x;
	this.y = y;
}

function jsButton(name) {
	Entity.call(this,name);
	this.eventProc = null;
}

jsButton.prototype = Object.create(Entity.prototype);

jsButton.prototype.update = function() {}

jsButton.prototype