window.addEventListener('DOMContentLoaded', function(){
	// get the canvas DOM element
	var canvas = document.getElementById('renderCanvas');

	// load the 3D engine
	var engine = new BABYLON.Engine(canvas, true);
	
	
	
	

	// createScene function that creates and return the scene
	var createScene = function(){
		// create a basic BJS Scene object
		var scene = new BABYLON.Scene(engine);

		// create a FreeCamera, and set its position to (x:0, y:5, z:-10)
		var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-10), scene);
		camera.inputs.clear();

		// target the camera to scene origin
		camera.setTarget(BABYLON.Vector3.Zero());

		// attach the camera to the canvas
		camera.attachControl(canvas, false);

		// create a basic light, aiming 0,1,0 - meaning, to the sky
		var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);

		// create a built-in "sphere" shape; its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation 
		//var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene);

		// move the sphere upward 1/2 of its height
		//sphere.position.y = 1;

		// create a built-in "ground" shape;
		var ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene);
		
		// create a custom mesh object
		var meshObj = new MeshPlane( scene );
		var meshObj2 = new MeshCube( scene );
		
		var meshChr = BuildCharacter( scene );
		
		meshObj2.position.x = 3;
		meshChr.position.x = -3;
		// return the created scene
		return scene;
	}

	// call the createScene function
	var scene = createScene();

	// run the render loop
	engine.runRenderLoop(function(){
		var cam = scene.activeCamera;
		
		if(keyLeft){
			if(keyShift){cam.cameraRotation.y -= 0.01;}else{cam.position.x -= 0.05;}
		}
		if(keyRight){
			if(keyShift){cam.cameraRotation.y += 0.01;}else{cam.position.x += 0.05;}
		}
		if(keyUp){
			if(keyShift){cam.cameraRotation.x -= 0.01;}else{cam.position.z += 0.05;}
		}
		if(keyDown){
			if(keyShift){cam.cameraRotation.x += 0.01;}else{cam.position.z -= 0.05;}
		}
		
		scene.render();
	});
	
	var keyLeft = false;
	var keyRight = false;
	var keyUp = false;
	var keyDown = false;
	var keyShift = false;
	
	var keyForward = false;
	var keyBackward = false;
	
	var mouseDown = false;
	var mouseX = 0;
	var mouseY = 0;
	
	var mouseMoveX = 0;
	var mouseMoveY = 0;

	// the canvas/window resize event handler
	window.addEventListener('resize', function(){
		engine.resize();
	});
	
	//	Input Event handlers
	window.addEventListener('keydown', function(e){
		var camera = scene.activeCamera;
		console.log("Key Down: " + e.keyCode );
		//console.log("Camera rot y: " + camera.cameraRotation.y );
		if(e.keyCode === 16){
			keyShift = true;
		}if(e.keyCode === 37) {
			//camera.position.x -= 0.01* 2;
			//camera.cameraRotation.y += 0.01;
			keyLeft = true;
		}if(e.keyCode === 38){
			keyUp = true;
		}if(e.keyCode === 39) {
			//camera.position.x += 0.01 * 2;
			//camera.cameraRotation.y -= 0.01;
			keyRight = true;
		}if(e.keyCode == 40){
			keyDown = true;
		}
	});
	
	window.addEventListener('keyup', function(e){
		if(e.keyCode === 16){
			keyShift = false;
		}if(e.keyCode === 37) {
			//camera.position.x -= 0.01* 2;
			//camera.cameraRotation.y += 0.01;
			keyLeft = false;
		}if(e.keyCode === 38){
			keyUp = false;
		}if(e.keyCode === 39) {
			//camera.position.x += 0.01 * 2;
			//camera.cameraRotation.y -= 0.01;
			keyRight = false;
		}if(e.keyCode == 40){
			keyDown = false;
		}
	});
});