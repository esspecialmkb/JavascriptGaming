// We want to make sure that we are using a solid engine foundation to reduce issues with adding new features

// Game Entity objects
// Player object
function Player(x, y) {
	this.x = x;
	this.y = y;
	this.width = 30;
	this.height = 30;
	this.direction = -1;
}

Player.prototype.update = function() {
	if( this.y <= 0 || this.y + this.height >= game.gameFieldHeight() ) {
		this.direction *= -1;
	}
};

// Enemy object
function Enemy( x, y) {
	this.x = x;
	this.y = y;
	this.width = 30;
	this.height = 30;
	this.direction = -1;
}

Enemy.prototype.update = function() {
	if( this.y <= 0 || this.y + this.height >= game.gameFieldHeight() ) {
		this.direction *= -1;
	}
};

// Renderer object
var renderer = (function() {
	function _drawEnemy(context, enemy) {
		context.fillStyle = "red";
		context.fillRect( enemy.x, enemy.y, enemy.width, enemy.height);
	}

	function _drawPlayer(context, player) {
		context.fillStyle = "blue";
		context.fillRect( enemy.x, enemy.y, enemy.width, enemy.height);
	}

	function _render() {
		var canvas = document.getElementById("game-layer");
		var context = canvas.getContext("2d");

		context.fillStyle = "gray";
		context.fillRect(0, 0, canvas.width, canvas.height);

		var i, entity, entities = game.entities();

		for(i = 0; i < entities.lenght; i++) {
			entity = entities[i];

			if( entity instanceof Enemy ){
				_drawEnemy(context, entity);
			}else if( entity instanceof Player ){
				_drawEnemy(context, entity);
			}
		}
	}

	return {
		render: _render
	};
}) ();

// Physics object
var physics = (function() {
	function _update() {
		var i, entities = game.entites();
		
		for( i = 0; i < entities.length; i++) {
			entities[i].y += entities[i].direction;
		}
	}

	return {
		update: _update
	};
}) ();

// Game Object
// This object owns EVERYTHING and ties the systems together
var game = (function() {
	var _gameFieldHeight = 200;
	var _entities = [];

	function _start() {
		_entities.push( new Player(100, 175));
		_entities.push( new Enemy(20, 25));
		_entities.push( new Enemy(80, 25));
		_entities.push( new Enemy(160, 25));
		
		window.requestAnimationFrame( this.update.bind(this) );
	}

	function _update() {
		physics.update();

		var i;

		for( i = 0; i < entities.length; i++) {
			_entities[i].update();
		}

		renderer.render();

		window.requestAnimationFrame( this.update.bind(this) );
	}

	return {
		start: _start,
		update: _update,
		entities: function() {
			return _entities;
		}
		gameFieldHeight: function() {
			return _gameFieldHeight;
		}
	};

}) ();

// Start the game engine
game.start();
