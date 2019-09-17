// Rect Object Prototype
var rectObject = {
	x: null,
	y: null,
	w: null,
	h: null,
	fillStyle: null,
	
	create: function(x, y, w, h, fillStyle) {
		var obj = Object.create(this);
		obj.x = x;
		obj.y = y;
		obj.w = w;
		obj.h = h;
		obj.fillStyle = fillStyle;
		
		return obj;
	},
	
	render: function() {
		//Draw red square
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.w, this.h);
		ctx.fillStyle = this.fillStyle;
		ctx.fill();
		ctx.closePath();
	}
};
		
// Arc prototype object
var arcObject = {
	x: null,
	y: null,
	radius: null,
	aStart: null,
	aEnd: null,
	fillStyle: null,
	
	create: function(x, y, radius, aStart, aEnd, fillStyle) {
		var obj = Object.create(this);
		obj.x = x;
		obj.y = y;
		obj.radius = radius;
		obj.aStart = aStart;
		obj.aEnd = aEnd;
		obj.fillStyle = fillStyle;
		
		return obj;
	},
	
	render: function() {
		//Draw red square
		ctx.beginPath();
		ctx.arc(240, 160, 20, 0, Math.PI*2, false);
		ctx.fillStyle = this.fillStyle;
		ctx.fill();
		ctx.closePath();
	}
};

// Prototype Entity
var particle = {
	xPos: null,
	yPos: null,
	xVel: null,
	yVel: null,
	create: function(x, y) {
		var obj = Object.create(this);
		obj.xPos = x;
		obj.yPos = y;
		obj.xVel = 0;
		obj.yVel = 0;
		return obj;
	},
	render: function() {
		ctx.fillStyle = "rgba(0, 0, 0)";
		ctx.fillRect(this.xPos, this.yPos, 5, 10);
	}
};

// We need a prototype entity
var entity = {
	// Need position
	x: null,
	y: null,
	vx: null,
	vy: null,
	
	// Health
	h: null,

	// Weapon stats
	wDmg: null,
	wRate: null,

	// Constructor
	create: function( x, y) {
		var obj = Object.create(this);
		obj.x = x;
		obj.y = y;
		obj.vx = 0;
		obj.vy = 0;
		
		h = 10;

		wDmg = 5;
		wRate = 100;
	}
		
}