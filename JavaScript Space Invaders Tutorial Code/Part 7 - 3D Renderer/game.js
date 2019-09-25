//
// Vector2d
//
var Vector2d = function (x, y) {
    this.x = x;
    this.y = y;
};

Vector2d.prototype.set = function (x, y) {
    this.x = x;
    this.y = y;
};

Vector2d.prototype.clone = function () {
    return new Vector2d(this.x, this.y);
};

Vector2d.prototype.add = function (v2) {
    this.x += v2.x;
    this.y += v2.y;
};

Vector2d.prototype.subtract = function (v2) {
    this.x -= v2.x;
    this.y -= v2.y;
};

Vector2d.prototype.scalarMultiply = function (s) {
    this.x *= s;
    this.y *= s;
};

function vectorLength(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
}

function vectorNormalize(v) {
    var reciprocal = 1.0 / (vectorLength(v) + 1.0e-037); // Prevent division by zero.
    return vectorScalarMultiply(v, reciprocal);
}

//
// Rectangle
//
function Rectangle (x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Rectangle.prototype.set = function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
};

Rectangle.prototype.clone = function () {
    return new Rectangle(this.x, this.y, this.width, this.height);
};

Rectangle.prototype.left = function () {
    return this.x;
};

Rectangle.prototype.right = function () {
    return this.x + this.width;
};

Rectangle.prototype.top = function () {
    return this.y;
};

Rectangle.prototype.bottom = function () {
    return this.y + this.height;
};

Rectangle.prototype.intersects = function (r2) {
    return this.right() >= r2.left() &&
           this.left() <= r2.right() &&
           this.top() <= r2.bottom() &&
           this.bottom() >= r2.top();
};

Rectangle.prototype.containsPoint = function (x, y) {
    return this.left() <= x &&
           x <= this.right() &&
           this.top() <= y &&
           y <= this.bottom();
};

Rectangle.prototype.union = function (r2) {
    var x, y, width, height;

    if( r2 === undefined ) {
        return;
    }

    x = Math.min( this.x, r2.x );
    y = Math.min( this.y, r2.y );

    width = Math.max( this.right(), r2.right() ) -
            Math.min( this.left(), r2.left() );

    height = Math.max( this.bottom(), r2.bottom() ) -
             Math.min( this.top(), r2.top() );

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
};

//
// Random Numbers
//
function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

//
// Cloneable Pool
//
function CloneablePool( cloneable ) {
    this.template = cloneable;

    this.pool = [];
}

CloneablePool.prototype.take = function () {
    // If there is an available object, return it.
    for(var i=this.pool.length-1; i>=0; i--) {
        if( this.pool[i].available ) {
            this.pool[i].available = false;
            this.pool[i].object.init();
            return this.pool[i].object;
        }
    }

    // Otherwise, create a new one and return it.
    var obj = this.template.clone();
    obj.init();
    this.pool.push({available: false, object:obj});
    return obj;
};

CloneablePool.prototype.putBack = function (cloneable) {
    // Mark the object as available again.
    for(var i=this.pool.length-1; i>=0; i--) {
        if( this.pool[i].object === cloneable ) {
            this.pool[i].available = true;
            break;
        }
    }
};

//
// Entity
//
function Entity(position, speed, direction) {
    this.position = position.clone();
    this.speed = speed;
    this.direction = direction.clone();
    this.time = 0;
    this.width = 5;
    this.height = 5;
    this.hp = 1;

    this._collisionRect = new Rectangle(
                            this.position.x - this.width/2,
                            this.position.y - this.height/2,
                            this.width,
                            this.height );
}

Entity.prototype.init = function () {
    this.position.set(0, 0);
    this.speed = 0;
    this.direction.set(0, 0);
    this.time = 0;
    this.width = 5;
    this.height = 5;
    this.hp = 1;
};

Entity.prototype.clone = function () {
    return new Entity(this.position, this.speed, this.direction);
};

Entity.prototype.update = function (dt) {
    this.time += dt;
};

Entity.prototype.collisionRect = function () {
    this._collisionRect.x = this.position.x - this.width/2;
    this._collisionRect.y = this.position.y - this.height/2;
    this._collisionRect.width = this.width;
    this._collisionRect.height = this.height;

    return this._collisionRect;
};

//
// Player Object
//
function Player(position, speed, direction) {
    Entity.call(this, position, speed, direction);

    this.width = 20;
    this.height = 10;

    this.movingLeft = false;
    this.movingRight = false;
}
Player.prototype = Object.create(Entity.prototype);

Player.prototype.updateDirection = function () {
    var x = 0;
    if( this.movingLeft ) {
        x -= 1;
    }
    if( this.movingRight ) {
        x += 1;
    }

    this.direction.set(x, 0);
};

Player.prototype.moveRight = function (enable) {
    this.movingRight = enable;
    this.updateDirection();
};

Player.prototype.moveLeft = function (enable) {
    this.movingLeft = enable;
    this.updateDirection();
};

Player.prototype.fire = function () {
    var playerProjectileCount = 0;

    var projectiles = game.projectiles();
    for(var i=projectiles.length-1; i>=0; i--) {
        if(projectiles[i].type === "player") {
            playerProjectileCount++;
        }
    }

    if( playerProjectileCount === 0 ) {
        var proj = game.projectilePool().take();
        proj.position.set( this.position.x, this.position.y );
        proj.speed = 180;
        proj.direction.set( 0, -1 );
        proj.type = "player";

        game.addEntity(proj);
    }
};


Player.prototype.update = function (dt) {
    Entity.prototype.update.call(this, dt);
};

//
// Enemy Object
//
function Enemy(position, speed, direction, rank) {
    Entity.call(this, position, speed, direction);

    this.width = 13;
    this.height = 10;
    this.rank = rank;

    this.dropTarget = 0;
    this.dropAmount = 1;
    this.timer = 0;
    this.firePercent = 10;
    this.fireWait = Math.random() * 5;
}
Enemy.prototype = Object.create(Entity.prototype);

Enemy.prototype.init = function () {
    Entity.prototype.init.call(this);

    this.width = 13;
    this.height = 10;
    this.rank = 0;

    this.dropTarget = 0;
    this.dropAmount = 1;
    this.timer = 0;
    this.firePercent = 10;
    this.fireWait = Math.random() * 5;
};

Enemy.prototype.clone = function () {
    return new Enemy(this.position, this.speed, this.direction, this.rank);
};

Enemy.prototype.update = function () {
    var p = new Vector2d(0, 0);

    function existsUnderneath(e) {
        var rect = e.collisionRect();
        if( !rect ) {
            return false;
        }
        return p.y <= rect.top() &&
            rect.left() <= p.x && p.x <= rect.right();
    }

    return function update (dt) {
        console.log("enemy update");
        // Edge collision
        var enemiesLeft = game.enemiesRect().left(),
            enemiesRight = game.enemiesRect().right(),
            edgeMargin = 5,
            gameLeftEdge = game.gameFieldRect().left() + edgeMargin,
            gameRightEdge = game.gameFieldRect().right() - edgeMargin;

        Entity.prototype.update.call(this, dt);

        // Drop if the enemiesRect hits an edge margin
        if( (this.direction.x < 0 && enemiesLeft < gameLeftEdge) ||
            (this.direction.x > 0 && enemiesRight > gameRightEdge) ) {
            this.dropTarget += this.dropAmount;
        }

        // Determine Direction
        if( this.position.y < this.dropTarget ) {
            this.direction.set(0, 1);
        }
        else if( this.direction.y > 0 ) {
            var x = (enemiesRight > gameRightEdge) ? -1 : 1;

            this.direction.set(x, 0);
        }

        // Determine Firing Weapon
        p.set( this.position.x, this.position.y + 5);

        this.timer += dt;
        if( this.timer > this.fireWait ) {
            this.timer = 0;
            this.fireWait = 1 + Math.random() * 4;

            if( randomInt(100) < this.firePercent &&
                !game.enemies().find(existsUnderneath) ) {
                var proj = game.projectilePool().take();
                proj.position.set( p.x, p.y );
                proj.speed = 60;
                proj.direction.set( 0, 1 );
                proj.type = "enemy";

                game.addEntity(proj);
            }
        }
    };
}();

//
// Projectile
//
function Projectile(position, speed, direction, type) {
    Entity.call(this, position, speed, direction);

    this.width = 1;
    this.height = 5;
    this.type = type;
}
Projectile.prototype = Object.create(Entity.prototype);

Projectile.prototype.init = function () {
    Entity.prototype.init.call(this);

    this.width = 1;
    this.height = 5;
    this.type = "";
};

Projectile.prototype.clone = function () {
    return new Projectile(this.position, this.speed, this.direction, this.type);
};

//
// Explosion Object
//
function Explosion(position, speed, direction, rank, duration) {
    Entity.call(this, position, speed, direction);

    this.width = 13;
    this.height = 10;

    this.rank = rank;
    this.duration = duration;
}
Explosion.prototype = Object.create(Entity.prototype);

Explosion.prototype.init = function () {
    Entity.prototype.init.call(this);

    this.width = 13;
    this.height = 10;

    this.rank = 0;
    this.duration = 0;
};

Explosion.prototype.clone = function () {
    return new Explosion(this.position, this.speed, this.direction, this.rank, this.duration);
};

Explosion.prototype.update = function (dt) {
    Entity.prototype.update.call(this, dt);

    if( this.time > this.duration ) {
        this.hp = 0;
    }
};

//
// Player Explosion
//
function PlayerExplosion(position, duration) {
    Entity.call(this, position, 0, new Vector2d(0, 0));

    this.width = 20;
    this.height = 10;
    this.duration = duration;
}
PlayerExplosion.prototype = Object.create(Entity.prototype);

PlayerExplosion.prototype.update = function (dt) {
    Entity.prototype.update.call(this, dt);
    if( this.time > this.duration ) {
        this.hp = 0;
    }
};




//
// Renderer3D
//
var renderer3d = (function () {

    var _glRenderer,
        _scene,
        _gltf,
        _animationMixers = [],
        _playerMesh,
        _playerExplosionMesh,
        _enemyMeshes = [],
        _enemyExplosionMeshes = [],
        _entityMeshMap = [];

    var _projectileColors = { "player": "#C4D06A",
                               "enemy": "#60c360" };

    var _enemyIdleAnimations = ["Enemy0Mesh.Idle",
                                "Enemy1Mesh.Idle",
                                "Enemy2Mesh.Idle",
                                "Enemy3Mesh.Idle",
                                "Enemy4Mesh.Idle"];

    //
    // Gets the animation from the loaded GLTF file with name.
    //
    function _getAnimation(name) {
        var anim = _gltf.animations.find(function (value) {
            return value.name === name;
        });

        return anim;
    }

    //
    // Add an Entity-Mesh pair for the entity.
    //
    function _addEntity(entity) {

        var geometry, material, mesh, animation;

        if (entity instanceof Player) {
            mesh = _playerMesh.clone();
        }

        else if (entity instanceof PlayerExplosion) {
            mesh = _playerExplosionMesh.clone();
            animation = _getAnimation('PlayerExplosionMesh.Idle');
        }

        else if (entity instanceof Enemy) {
            mesh = _enemyMeshes[entity.rank].clone();
            animation = _getAnimation(_enemyIdleAnimations[entity.rank]);
        }
        else if (entity instanceof Explosion) {
            mesh = _enemyExplosionMeshes[entity.rank].clone();
        }

        else if (entity instanceof Projectile) {
            geometry = new THREE.BoxBufferGeometry(entity.width, entity.height, 1);
            material = new THREE.MeshStandardMaterial({ color: _projectileColors[entity.type] });
            mesh = new THREE.Mesh(geometry, material);
            mesh.castShadow = true;
        }

        // Default Geometry
        else {
            geometry = new THREE.BoxBufferGeometry(entity.width, entity.height, 1);
            material = new THREE.MeshStandardMaterial({ color: 'red' });
            mesh = new THREE.Mesh(geometry, material);
            mesh.castShadow = true;
        }

        // If there is an animation, create an AnimationMixer for it
        if (animation) {
            var mixer = new THREE.AnimationMixer(mesh);
            mixer.clipAction(animation).setDuration(1).play();

            _animationMixers.push(mixer);
        }

        // Add the mesh to the scene
        _gameFieldMesh.add(mesh);

        // Create an Entity-Mesh pair
        _entityMeshMap.push({ entity: entity, mesh: mesh });
    }

    //
    // Remove the Entity-Mesh pair associated with the entity.
    //
    function _removeEntity(entity) {
        for (var i = _entityMeshMap.length - 1; i >= 0; i--) {
            if (_entityMeshMap[i].entity === entity) {
                _gameFieldMesh.remove(_entityMeshMap[i].mesh);
                _entityMeshMap.slice(i, 1);
                break;
            }
        }
    }

    //
    // Load the GLTF assets and finish creating the scene.
    //
    function _loadedGLTF(gltf) {
        var divWidth = _glRenderer.domElement.offsetWidth;
        var divHeight = _glRenderer.domElement.offsetHeight;

        _gltf = gltf;

        // Add the scene and set everything to have shadows.
        _scene.add(_gltf.scene);
        _gltf.scene.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        // Load Camera, update its aspect ratio
        _camera = gltf.cameras[0];
        _camera.aspect = divWidth / divHeight;
        _camera.updateProjectionMatrix();

        // GameField Mesh
        _gameFieldMesh = _gltf.scene.getObjectByName('GameFieldMesh');

        // Player Mesh
        _playerMesh = _gltf.scene.getObjectByName('PlayerMesh');
        _playerExplosionMesh = _gltf.scene.getObjectByName('PlayerExplosionMesh');

        // Enemy Meshes
        _enemyMeshes[0] = _gltf.scene.getObjectByName('Enemy0Mesh');
        _enemyMeshes[1] = _gltf.scene.getObjectByName('Enemy1Mesh');
        _enemyMeshes[2] = _gltf.scene.getObjectByName('Enemy2Mesh');
        _enemyMeshes[3] = _gltf.scene.getObjectByName('Enemy3Mesh');
        _enemyMeshes[4] = _gltf.scene.getObjectByName('Enemy4Mesh');

        // Enemy Explosion Meshes
        _enemyExplosionMeshes[0] = _gltf.scene.getObjectByName('EnemyExplosion0Mesh');
        _enemyExplosionMeshes[1] = _gltf.scene.getObjectByName('EnemyExplosion1Mesh');
        _enemyExplosionMeshes[2] = _gltf.scene.getObjectByName('EnemyExplosion2Mesh');
        _enemyExplosionMeshes[3] = _gltf.scene.getObjectByName('EnemyExplosion3Mesh');
        _enemyExplosionMeshes[4] = _gltf.scene.getObjectByName('EnemyExplosion4Mesh');

        // Create the lighting
        var aLight = new THREE.AmbientLight(0x555555);
        _scene.add(aLight);

        var lightTarget = new THREE.Object3D();
        lightTarget.position.set(0, 0, -200);
        _scene.add(lightTarget);

        var light = new THREE.SpotLight(0xffffff, 1, 500, Math.PI / 3, 0.1, 2);
        light.position.set(0, 100, 30);
        light.target = lightTarget;
        light.power = 10;
        light.castShadow = true;
        light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;
        _scene.add(light);
    }

    //
    // Initialize the renderer. Loads all the 3D assets.
    //
    function _init() {
        var canvas = document.getElementById('game-layer');

        // Create a scene
        _scene = new THREE.Scene();
        _scene.background = new THREE.Color(0x000000);
        _scene.fog = new THREE.FogExp2(0x000000, 0.0005);

        // Setup WebGLRenderer
        _glRenderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
        _glRenderer.setPixelRatio(window.devicePixelRatio);
        _glRenderer.shadowMap.enabled = true;
        _glRenderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Load the GLTF file
        var loader = new THREE.GLTFLoader();
        loader.load('assets/models/invaders3d.glb',
                        _loadedGLTF,   // Success
                        undefined,     // Progress
                        function (e) { // Error
                            console.error(e);
                        } );
    }

    //
    // Return the Mesh associated with the entity. Returns undefined if no mesh is found.
    //
    function _getMeshFromEntity(entity) {
        for (var i = _entityMeshMap.length - 1; i >= 0; i--) {
            if (_entityMeshMap[i].entity === entity) {
                return _entityMeshMap[i].mesh;
            }
        }

        return undefined;
    }

    //
    // Update the scenegraph and render the current frame.
    //
    function _render(dt) {
        var i, entity, entities = game.entities();

        // Update Meshes for Entities
        for (i = entities.length - 1; i >= 0; i--) {
            entity = entities[i];
            entity.time += dt;

            var mesh = _getMeshFromEntity(entity);
            if (mesh) {
                // Account for the change in coordinate system.
                mesh.position.set(entity.position.x,
                                  -entity.position.y + game.gameFieldRect().height,
                                  0);
            }
        }

        // Call to the original renderer to still handle UI updates.
        renderer.updateUI();

        // Update any animations
        for (i = _animationMixers.length - 1; i >= 0; i--) {
            _animationMixers[i].update(dt);
        }

        // Render the 3D scene
        _glRenderer.render(_scene, _camera);
    }

    // Initialize the renderer
    _init();

    return {
        addEntity: _addEntity,
        removeEntity: _removeEntity,
        render: _render
    };
})();

//
// Sprite Object
//
function Sprite(imgPath, frames, frameRate, r, g, b) {
    var spriteImage = new Image();
    var image = new Image();

    spriteImage.onload = function () {
        var spriteCanvas = document.createElement("canvas");
        var spriteContext = spriteCanvas.getContext('2d');

        spriteCanvas.width = spriteImage.width;
        spriteCanvas.height = spriteImage.height;

        spriteContext.drawImage(spriteImage,
                                0, 0, spriteImage.width, spriteImage.height,
                                0, 0, spriteCanvas.width, spriteCanvas.height);

        var sourceData = spriteContext.getImageData(0, 0, spriteImage.width, spriteImage.height);

        var data = sourceData.data;
        for (var i=0; i<data.length; i += 4) {
            data[i]  = r;
            data[i+1]= g;
            data[i+2]= b;
            // Leave the alpha channel alone
        }
        spriteContext.putImageData(sourceData, 0, 0);

        image.src = spriteCanvas.toDataURL('image/png');
    };

    spriteImage.src = imgPath;

    this.frames = frames;
    this.frameRate = frameRate;
    this.timer = 0;
    this.currentFrame = 0;
    this.image = image;
}

Sprite.prototype.update = function (dt) {
    this.timer += dt;
    if( this.timer > 1/this.frameRate ) {
        this.timer = 0;

        this.currentFrame = (this.currentFrame+1)%this.frames;
    }
};


//
// Renderer Object
//
var renderer = (function () {
    var _canvas = document.getElementById("game-layer"),
        _context = _canvas.getContext("2d"),
        _enemyColors = ["rgb(150, 7, 7)",
                        "rgb(150, 89, 7)",
                        "rgb(56, 150, 7)",
                        "rgb(7, 150, 122)",
                        "rgb(46, 7, 150)"],
        _projectileColors = {"player": "rgb(196, 208, 106)",
                             "enemy": "rgb(96, 195, 96)"};

    var _playerSprite = new Sprite("assets/player.png",
                                1, 1, 255, 255, 0);
    var _playerExplosionSprite = new Sprite("assets/player_explosion.png",
                                2, 4, 255, 255, 0);

    var _enemySprites = [new Sprite("assets/enemy0.png",
                                2, 2, 150, 7, 7),
                        new Sprite("assets/enemy1.png",
                                2, 2, 150, 89, 7),
                        new Sprite("assets/enemy2.png",
                                2, 2, 56, 150, 7),
                        new Sprite("assets/enemy3.png",
                                2, 2, 7, 150, 122),
                        new Sprite("assets/enemy4.png",
                                2, 2, 46, 7, 150)];

    var _explosionSprites = [new Sprite("assets/explosion.png",
                                1, 1, 150, 7, 7),
                            new Sprite("assets/explosion.png",
                                1, 1, 150, 89, 7),
                            new Sprite("assets/explosion.png",
                                1, 1, 56, 150, 7),
                            new Sprite("assets/explosion.png",
                                1, 1, 7, 150, 122),
                            new Sprite("assets/explosion.png",
                                1, 1, 46, 7, 150)];

    var _sprites = [].concat(_playerSprite, _playerExplosionSprite, _enemySprites, _explosionSprites);

    var _previousLives = 0;

    function _drawSprite(sprite, entity) {
        _context.drawImage(sprite.image,
                        (sprite.image.width/sprite.frames)*sprite.currentFrame,
                        0,
                        sprite.image.width/sprite.frames,
                        sprite.image.height,
                        entity.position.x-entity.width/2,
                        entity.position.y-entity.height/2,
                        entity.width, entity.height);
    }

    function _drawRectangle(color, entity) {
        _context.fillStyle = color;
        _context.fillRect(entity.position.x-entity.width/2,
                          entity.position.y-entity.height/2,
                          entity.width,
                          entity.height);
    }

    function _render(dt) {
        var i,
            entity,
            entities = game.entities();

        // Calculate ScaleFactor
        _scaleFactor = _canvas.clientWidth / game.gameFieldRect().width;
        _scaleFactor = Math.max(1, Math.min(2, _scaleFactor));
        _canvas.width = game.gameFieldRect().width * _scaleFactor;
        _canvas.height = game.gameFieldRect().height * _scaleFactor;
        _context.scale(_scaleFactor, _scaleFactor);

        // Update the Sprites
        for( i=_sprites.length-1; i>=0; i--) {
            _sprites[i].update(dt);
        }

        // Draw Background
        _context.fillStyle = "black";
        _context.fillRect(0, 0, _canvas.width, _canvas.height);

        // Draw Entities
        for( i=entities.length-1; i>=0; i-- ) {
            entity = entities[i];

            if( entity instanceof Enemy ) {
                _drawSprite(_enemySprites[entity.rank], entity);
            }
            else if( entity instanceof Player ) {
                _drawSprite(_playerSprite, entity);
            }
            else if( entity instanceof PlayerExplosion ) {
                _drawSprite(_playerExplosionSprite, entity);
            }
            else if( entity instanceof Explosion ) {
                _drawSprite(_explosionSprites[entity.rank], entity);
            }
            else if( entity instanceof Projectile ) {
                _drawRectangle(_projectileColors[entity.type], entity);
            }
        }

        // Draw Floor
        _context.strokeStyle = "#816d1a";
        _context.moveTo(0, game.gameFieldRect().height);
        _context.lineTo(game.gameFieldRect().width, game.gameFieldRect().height);
        _context.stroke();

        // Update UI
        _updateUI();
    }

    function _updateUI() {
        var scoreElement = document.getElementById("score");
        var highScoresElement = document.getElementById("highscores");
        var menuElement = document.getElementById("menu");
        var titleElement = document.getElementById("title");
        var livesElement = document.getElementById("lives");

        // Update Score
        var scoreText = "Score " + Math.round(game.score());
        if( scoreElement.innerHTML != scoreText ) {
            scoreElement.innerHTML = scoreText;
        }

        // Update Player Lives
        if( _previousLives !== game.livesRemaining() ) {
            _previousLives = game.livesRemaining();

            while( livesElement.hasChildNodes() ) {
                livesElement.removeChild(livesElement.firstChild);
            }

            livesElement.innerHTML = "&nbsp;";

            // Add an image for each life
            for(i=0; i<game.livesRemaining(); i++) {
                var img = document.createElement("img");
                img.src = _playerSprite.image.src;
                img.style.marginRight = "5px";

                livesElement.appendChild(img);
            }
        }

        if( game.gameOver() ) {
            // Update High Scores
            var scores = game.highScores();
            for( i=0; i<scores.length; i++) {
                var elem = document.getElementById("score"+i);
                elem.innerHTML = scores[i];
            }

            highScoresElement.style.display = "block";
            menuElement.style.display = "block";
            titleElement.style.display = "none";
        }
        else {
            highScoresElement.style.display = "none";
            menuElement.style.display = "none";
            titleElement.style.display = "none";
        }
    }

    return {
        render: _render,
        updateUI: _updateUI
    };
})();




//
// Physics Object
//
var physics = (function () {

    var velocityStep = new Vector2d(0, 0);

    function _collide(entity0, entity1) {
        if( entity0 && entity1 &&
            entity0.collisionRect().intersects(entity1.collisionRect()) ) {
            entity0.hp -= 1;
            entity1.hp -= 1;
        }
    }

    function _update(dt) {
        var i, j, e,
            entities = game.entities(),
            enemies = game.enemies(),
            projectiles = game.projectiles(),
            player = game.player();

        for( i=entities.length-1; i>=0; i-- ) {
            e = entities[i];
            velocityStep.set(e.direction.x, e.direction.y);
            velocityStep.scalarMultiply( e.speed*dt );

            e.position.add( velocityStep );
        }

        // Collision Detection

        // Player vs All enemies
        for( i=enemies.length-1; i>=0; i-- ) {
            _collide(player, enemies[i]);
        }

        // Projectiles vs other Entities
        for( i=projectiles.length-1; i>=0; i-- ) {

            // Enemy Projectiles vs Player
            if( projectiles[i].type === "enemy") {
                _collide(projectiles[i], player);
            }

            // Player Projectiles vs Enemies
            else if( projectiles[i].type === "player" ) {
                for( j=enemies.length-1; j>=0; j-- ) {
                    _collide(projectiles[i], enemies[j]);
                }
            }
        }

        // Enemy vs floor (special case)
        if( game.enemiesRect() && player &&
            game.enemiesRect().bottom() > player.collisionRect().bottom() ) {
            game.setGameOver();
        }

        // Projectile leaves game field (special case)
        for( i=projectiles.length-1; i>=0; i-- ) {
            var proj = projectiles[i];
            if( !game.gameFieldRect().intersects(proj.collisionRect()) ) {
                proj.hp -= 1;
            }
        }
    }

    return {
        update: _update
    };
})();

function mutableRemoveIndex(array, index) {

    if( index >= array.length ) {
        console.error('ERROR: mutableRemoveIndex: index is out of range');
        return;
    }

    if( array.length <= 0 ) {
        console.error('ERROR: mutableRemoveIndex: empty array');
        return;
    }

    array[index] = array[array.length-1];
    array[array.length-1] = undefined;

    array.length = array.length-1;
}

//
// Game Object
//
var game = (function () {
    var _entities,
        _enemies,
        _player,
        _gameFieldRect,
        _started = false,
        _lastFrameTime,
        _enemiesRect,
        _enemySpeed,
        _enemyFirePercent,
        _enemyDropAmount,
        _projectiles,
        _livesRemaining,
        _gameOver,
        _score,
        _highScores;

    var _updateFunc;

    var _enemyPool = new CloneablePool(
                        new Enemy(new Vector2d(0, 0),
                                    0,
                                    new Vector2d(0, 0),
                                    0));
    var _projectilePool = new CloneablePool(
                            new Projectile(new Vector2d(0, 0),
                                        0,
                                        new Vector2d(0, 0),
                                        ""));
    var _explosionPool = new CloneablePool(
                            new Explosion(new Vector2d(0, 0),
                                        0,
                                        new Vector2d(0, 0),
                                        0,
                                        0));
    function _start() {

        _removeEntities(_entities);

        _lastFrameTime = 0;
        _entities = [];
        _enemies = [];
        _gameFieldRect = new Rectangle(0, 0, 300, 180);
        _enemiesRect = new Rectangle(0, 0, 0, 0);
        _enemySpeed = 10;
        _enemyFirePercent = 10;
        _enemyDropAmount = 1;
        _projectiles = [];
        _livesRemaining = 2;
        _gameOver = false;
        _score = 0;
        _highScores = [];

        if (typeof(Storage) !== "undefined") {
            try {
                _highScores = JSON.parse(localStorage.invadersScores);
            }
            catch(e) {
                _highScores = [];
            }
        }

        this.addEntity( new Player( new Vector2d(100, 175), 90, new Vector2d(0, 0)) );

        if( !_started ) {
            _updateFunc = this.update.bind(this);
            window.requestAnimationFrame(_updateFunc);
            _started = true;
        }
    }

    function _addEntity(entity) {
        _entities.push(entity);

        if( entity instanceof Player ) {
            _player = entity;
        }

        if( entity instanceof Enemy ) {
            _enemies.push(entity);
        }

        if( entity instanceof Projectile ) {
            _projectiles.push(entity);
        }

        // Update the 3D renderer.
       renderer3d.addEntity(entity);
    }

    function _removeEntities(entities) {
        if( !entities ) return;

        // Update the 3D renderer.
        for( var i=entities.length-1; i>=0; i--) {
            renderer3d.removeEntity(entities[i]);
        }

        for( var i=entities.length-1; i>=0; i--) {
            var idx = _entities.indexOf(entities[i]);
            if( idx >= 0 ) {
                mutableRemoveIndex(_entities, idx);
            }

            idx = _enemies.indexOf(entities[i]);
            if( idx >= 0 ) {
                mutableRemoveIndex(_enemies, idx);
                _enemyPool.putBack(entities[i]);
            }

            idx = _projectiles.indexOf(entities[i]);
            if( idx >= 0 ) {
                mutableRemoveIndex(_projectiles, idx);
                _projectilePool.putBack(entities[i]);
            }

            _explosionPool.putBack(entities[i]);
        }

        if(entities.includes(_player)) {
            _player = undefined;
        }
    }

    function _update(time) {
        var i, j,
            dt = Math.min((time - _lastFrameTime) / 1000, 3/60);

        _lastFrameTime = time;

        if( _gameOver ) {
            _started = false;
            return;
        }

        // Update Physics
        physics.update(dt);

        // Calculate the bounding rectangle around the enemies
        if( _enemies.length > 0 ) {
            // Prime _enemiesRect
            var rect = _enemies[0].collisionRect();
            _enemiesRect.set(rect.x, rect.y, rect.width, rect.height);

            // Calculate the rest of the enemiesRect
            for( i=_enemies.length-1; i>=0; i-- ) {
                _enemiesRect.union(_enemies[i].collisionRect());
            }
        }

        // Update Entities
        for( i=_entities.length-1; i>=0; i-- ) {
            _entities[i].update(dt);
        }

        // Delete dead objects.
        var removeEntities = [];
        for( i=_entities.length-1; i>=0; i-- ) {
            var e = _entities[i];
            if( e.hp <= 0 ) {
                removeEntities.push(e);

                if( e instanceof Enemy ) {
                    _score += e.rank + 1;

                    var exp = _explosionPool.take();
                    exp.position.set(e.position.x, e.position.y);
                    exp.speed = e.speed;
                    exp.direction.set(e.direction.x, e.direction.y);
                    exp.rank = e.rank;
                    exp.duration = 5/60;

                    this.addEntity(exp);
                }

                else if( e instanceof Player ) {
                    _livesRemaining--;
                    this.addEntity( new PlayerExplosion(e.position, 2));
                }

                else if( e instanceof PlayerExplosion ) {
                    this.addEntity( new Player( new Vector2d(100, 175), 90, new Vector2d(0, 0) ));
                }
            }
        }
        _removeEntities(removeEntities);

        // Update Enemy Speed
        var speed = _enemySpeed + (_enemySpeed*(1-(_enemies.length/50)));
        for( i=_enemies.length-1; i>=0; i-- ) {
            _enemies[i].speed = speed;
        }

        // Create new Enemies if there are 0
        if( _enemies.length === 0 ) {
            for( i=0; i<10; i++) {
                for( j=0; j<5; j++) {
                    var dropTarget = 10+j*20,
                    enemy = _enemyPool.take();

                    enemy.position.set(50+i*20, dropTarget-100);
                    enemy.direction.set(1, 0);
                    enemy.speed = _enemySpeed;
                    enemy.rank = 4-j;

                    enemy.dropTarget = dropTarget;
                    enemy.firePercent = _enemyFirePercent;
                    enemy.dropAmount = _enemyDropAmount;

                    this.addEntity( enemy );

                }
            }

            _enemySpeed += 5;
            _enemyFirePercent += 5;
            _enemyDropAmount += 1;
        }

        // Check for Game Over
        if( _livesRemaining < 0 && !_gameOver ) {
            _setGameOver();
        }

        // Render the frame
        //renderer.render(dt);
        renderer3d.render(dt);

        window.requestAnimationFrame(_updateFunc);
    }

    function _addScore(score) {
        _highScores.push(score);
        _highScores.sort(function(a, b){return b-a});
        _highScores = _highScores.slice(0, 10);

        if (typeof(Storage) !== "undefined") {
            localStorage.invadersScores = JSON.stringify(_highScores);
        }
    }

    function _setGameOver() {
        _gameOver = true;
        _addScore(Math.round(game.score()));
    }


    return {
        start: _start,
        update: _update,
        addEntity: _addEntity,
        entities: function () { return _entities; },
        enemies: function () { return _enemies; },
        player: function () { return _player; },
        gameFieldRect: function () { return _gameFieldRect; },
        enemiesRect: function () { return _enemiesRect; },
        projectiles: function () { return _projectiles; },
        score: function () { return _score; },
        highScores: function () { return _highScores; },
        livesRemaining: function () { return _livesRemaining; },
        gameOver: function () { return _gameOver; },
        setGameOver: _setGameOver,
        projectilePool: function () { return _projectilePool; }
    };

})();

//
// Player Actions
//
var playerActions = (function () {
    var _ongoingActions = [];

    var startActs = {
        "moveLeft":  function () {
                        if(game.player()) game.player().moveLeft(true);
                     },
        "moveRight": function () {
                        if(game.player()) game.player().moveRight(true);
                     },
        "fire":      function () {
                        if(game.player()) game.player().fire();
                     }
        };

    var endActs = {
        "moveLeft":  function () {
                        if(game.player()) game.player().moveLeft(false);
                     },
        "moveRight": function () {
                        if(game.player()) game.player().moveRight(false);
                     }
        };

    function _startAction(id, playerAction) {
        if( playerAction === undefined ) {
            return;
        }

        var f;

        if(f = startActs[playerAction]) f();

        _ongoingActions.push({ identifier: id,
                               playerAction: playerAction });
    }

    function _endAction(id) {
        var f;
        var idx = _ongoingActions.findIndex(
                        function(a) {
                            return a.identifier === id;
                        });

        if (idx >= 0) {
            if(f = endActs[_ongoingActions[idx].playerAction]) f();
            _ongoingActions.splice(idx, 1);  // remove action at idx
        }
    }

    return {
        startAction: _startAction,
        endAction: _endAction
    };
})();

//
// Keyboard
//
var keybinds = { 32: "fire",
                 37: "moveLeft",
                 39: "moveRight" };

function keyDown(e) {
    var x = e.which || e.keyCode;  // which or keyCode depends on browser support

    if( keybinds[x] !== undefined ) {
        e.preventDefault();
        playerActions.startAction(x, keybinds[x]);
    }
}

function keyUp(e) {
    var x = e.which || e.keyCode;

    if( keybinds[x] !== undefined ) {
        e.preventDefault();
        playerActions.endAction(x);
    }
}

document.body.addEventListener('keydown', keyDown);
document.body.addEventListener('keyup', keyUp);

//
// Touch
//
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

function getRelativeTouchCoords(touch) {

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