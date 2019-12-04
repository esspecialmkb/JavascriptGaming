var head = { 
	w:2,
	h:3,
	d:2
};

var torso = {
	w: 3,
	h: 5,
	d: 1,
	t: 1
};

var arm = {
	w:1,
	h:5,
	d:1
};

var hand = {
	w:1,
	h:1,
	d:1
};

var pelvis = {
	w:3,
	h:1,
	d:1
};

var leg = {
	wU: 1.5,
	wL: 1,
	h: 5,
	d: 1
};

var foot = {
	w: 1,
	hU: 0.5,
	hL: 0.5,
	d: 1
};

function ConcatData( oldData, newData ) {
	return oldData.concat( newData );		
};

function ConcatIndices( oldData, newData, offset ){
	for(var i = 0; i < newData.length; i++){
		newData[i] += offset;
	}
	return oldData.concat( newData );
};

function BuildCharacter( scene ) {
	
	// Torso Verts
	var posTor = [
		// Build torso (16 verts min)
		torso.w/2, pelvis.h, torso.d/2,
		torso.w/2, pelvis.h + (torso.h/2) - (torso.t/2), torso.d/2,
		-torso.w/2, pelvis.h+ (torso.h/2) - (torso.t/2), torso.d/2,
		-torso.w/2, pelvis.h, torso.d/2,
		
		torso.w/2, pelvis.h + (torso.h/2) - (torso.t/2), torso.d/2,
		torso.w/2, pelvis.h + (torso.h/2) + (torso.t/2), torso.d/2,
		-torso.w/2, pelvis.h + (torso.h/2) + (torso.t/2), torso.d/2,
		-torso.w/2, pelvis.h+ (torso.h/2) - (torso.t/2), torso.d/2,
		
		torso.w/2, pelvis.h, -torso.d/2,
		torso.w/2, pelvis.h + (torso.h/2) - (torso.t/2), -torso.d/2,
		-torso.w/2, pelvis.h+ (torso.h/2) - (torso.t/2), -torso.d/2,
		-torso.w/2, pelvis.h, -torso.d/2,
		
		torso.w/2, pelvis.h + (torso.h/2) - (torso.t/2), -torso.d/2,
		torso.w/2, pelvis.h + (torso.h/2) + (torso.t/2), -torso.d/2,
		-torso.w/2, pelvis.h + (torso.h/2) + (torso.t/2), -torso.d/2,
		-torso.w/2, pelvis.h+ (torso.h/2) - (torso.t/2), -torso.d/2,
	];
	
	console.log("posTor: " + posTor ); 
	var indTor = [
		0, 2, 1,	// Front faces
		0, 3, 2,
		
		1, 7, 4,
		1, 2, 7,
		
		4, 6, 5,
		4, 7, 6,
		
		5, 14, 13,	// Top faces
		5, 6, 14,
		
		8, 9, 10,	//	Back faces
		8, 10, 11,
		
		9, 12, 15,
		9, 15, 10,
		
		12, 13, 14,
		12, 14, 15,
		
		0, 8, 11,	// Bottom Faces
		0, 11, 3,
		
		0, 1, 9,	// Right faces
		0, 9, 8,
		
		1, 4, 12,
		1, 12, 9,
		
		4, 5, 12,
		4, 13, 12,
		
		3, 11, 10,	// Left faces
		3, 10, 2,
		
		2, 10, 15,
		2, 15, 7,
		
		7, 15, 14,
		7, 14, 6		
	];
	
	var colTor = [
		0, 1, 0, 1,
		0, 1, 0, 1,
		0, 1, 0, 1,
		0, 1, 0, 1,
		0, 1, 0, 1,
		0, 1, 0, 1,
		0, 1, 0, 1,
		0, 1, 0, 1,
		0, 1, 0, 1,
		0, 1, 0, 1,
		0, 1, 0, 1,
		0, 1, 0, 1,
		0, 1, 0, 1,
		0, 1, 0, 1,
		0, 1, 0, 1,
		0, 1, 0, 1
	];
	// Pelvis Verts
	var posPel = [
		// Build pelvis (8 verts min)
		pelvis.w/2, 0, pelvis.d/2,
		pelvis.w/2, pelvis.h, pelvis.d/2,
		-pelvis.w/2, pelvis.h, pelvis.d/2,
		-pelvis.w/2, 0, pelvis.d/2,
		
		pelvis.w/2, 0, -pelvis.d/2,
		pelvis.w/2, pelvis.h, -pelvis.d/2,
		-pelvis.w/2, pelvis.h, -pelvis.d/2,
		-pelvis.w/2, 0, -pelvis.d/2
	];
	
	console.log("posPel: " + posPel );
	
	// Pelvis Indices
	var indPel = [
		// Pelvis indices
		0, 2, 1,	// front
		0, 3, 2,
		
		1, 6, 5,	// top
		1, 2, 6,
		
		7, 5, 4,	// back
		7, 6, 5,
		
		0, 4, 7,	// bottom
		0, 7, 3,
		
		4, 1, 5,	//left
		4, 0, 1,
		
		3, 6, 2,	// right
		3, 7, 6
	];
	
	var colPel = [
		1, 0, 1, 1,
		1, 0, 0, 1,
		1, 0, 0, 1,
		1, 0, 0, 1,
		1, 0, 0, 1,
		1, 0, 0, 1,
		1, 0, 0, 1,
		1, 0, 0, 1
	];
	
	var positions = ConcatData( posPel, posTor );
	//console.log("positions: " + positions );
	var indices = ConcatIndices( indPel, indTor, posPel.length/3 );
	console.log("indices: " + indices );
	var colors = ConcatData( colPel, colTor );
	var normals = [];
	
	var vertData = new BABYLON.VertexData();
	BABYLON.VertexData.ComputeNormals(positions, indices, normals);
	vertData.positions = positions;
	vertData.indices = indices;
	vertData.colors = colors;
	
	console.log("Character Vertex Count: " + vertData.positions.length/3 );
	
	var mesh = new BABYLON.Mesh("Character", scene);
	vertData.applyToMesh( mesh );
	
	return mesh;
}

function MeshCharacter( scene ) {
	//this.mesh = new BABYLON.Mesh("character", scene);
	
	this.legLength = 6;
	this.pelvisHeight = 1;
	this.torsoLength = 5;
	this.shoulderWidth = 3;
	this.ankleWidth = 1;
	
	
	
	this.vertexData = new BABYLON.VertexData();
	this.positions = [];
	this.indices = [];
	this.normals = [];
	this.colors = [];
	this.pickable = [];
	
	this.vertexData.positions = this.positions;
	this.vertexData.indices = this.indices;
	this.vertexData.normals = this.normals; //Assignment of normal to vertexData added
	this.vertexData.colors = this.colors;
	this.vertexData.pickable = this.pickable;

	this.vertexData.applyToMesh(this.mesh);
	
	//return this.mesh;
};

function MeshCube( scene ){
	// create a custom mesh object
	this.mesh = new BABYLON.Mesh("custom", scene);
	//	Array of 3 floats (3 per vertex)
	this.positions = 	[ 
							0,0,0 ,0,1,0 ,1,1,0 ,1,0,0,			// Front face
							0,0,1 ,0,1,1 ,1,1,1 ,1,0,1			// Back face									
						];			
	//	Array of ints (3 per face)
	this.indices = 	[ 
						0,3,2 , 2,1,0, 
						6,7,4 , 4,5,6
					];			
	this.normals = [];			//	Array of 3 floats (3 per vertex)
	
	//	Array of floats (4 per vertex)		optional
	this.colors = 	[ 
						1,0,0,1,
						1,0,0,1,
						1,0,0,1,
						1,0,0,1,
						1,0,0,1,
						1,0,0,1,
						1,0,0,1,
						1,0,0,1
					];			
	this.pickable = true;	
	
	//Calculations of normals added
	BABYLON.VertexData.ComputeNormals(this.positions, this.indices, this.normals);

	this.vertexData = new BABYLON.VertexData();

	this.vertexData.positions = this.positions;
	this.vertexData.indices = this.indices;
	this.vertexData.normals = this.normals; //Assignment of normal to vertexData added
	this.vertexData.colors = this.colors;
	this.vertexData.pickable = this.pickable;

	this.vertexData.applyToMesh(this.mesh);
	
	return this.mesh;
};

function MeshPlane( scene ){
	// create a custom mesh object
	this.mesh = new BABYLON.Mesh("custom", scene);
	//	Array of 3 floats (3 per vertex)
	this.positions = [ 0,0,0 ,0,1,0 ,1,1,0 ,1,0,0 ];			
	this.indices = [ 0,3,2 , 2,1,0 ];			//	Array of ints (3 per face)
	this.normals = [];			//	Array of 3 floats (3 per vertex)
	this.position = new BABYLON.Vector3( 0,0,0 );
	this.rotation = new BABYLON.Vector3( 0,0,0 );
	this.pickable = true;		//
	this.uvs = [];				//	Array of floats (2 per vertex)		optional
	this.colors = [ 1,0,0,1, 1,0,0,1, 1,0,0,1, 1,0,0,1 ];			//	Array of floats (4 per vertex)		optional
	this.hasVertexAlpha = false;	//										optional
	this.matricesIndices = [];	//	Array of ints (4 per vertex)		optional
	this.matricesWeights = [];	//	Array of floats (4 per vertex)		optional
	this.animations = [];		//	Array of animations					optional
	this.instances = [];			//	Array of Instances					optional
	this.actions = [];			//	Array of Actions					optional

	//Calculations of normals added
	BABYLON.VertexData.ComputeNormals(this.positions, this.indices, this.normals);

	this.vertexData = new BABYLON.VertexData();

	this.vertexData.positions = this.positions;
	this.vertexData.indices = this.indices;
	this.vertexData.normals = this.normals; //Assignment of normal to vertexData added
	this.vertexData.colors = this.colors;
	this.vertexData.pickable = this.pickable;

	this.vertexData.applyToMesh(this.mesh);
	
	return this.mesh;
};