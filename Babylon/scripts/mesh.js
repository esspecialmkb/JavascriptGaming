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
	h: 4,
	d: 1,
	t: 1
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
		torso.w/2, leg.h + pelvis.h, torso.d/2,
		torso.w/2, leg.h  + pelvis.h + (torso.h/2) - (torso.t/2), torso.d/2,
		-torso.w/2, leg.h  + pelvis.h+ (torso.h/2) - (torso.t/2), torso.d/2,
		-torso.w/2, leg.h  + pelvis.h, torso.d/2,
		
		torso.w/2, leg.h  + pelvis.h + (torso.h/2) - (torso.t/2), torso.d/2,
		torso.w/2, leg.h  + pelvis.h + (torso.h/2) + (torso.t/2), torso.d/2,
		-torso.w/2, leg.h  + pelvis.h + (torso.h/2) + (torso.t/2), torso.d/2,
		-torso.w/2, leg.h  + pelvis.h + (torso.h/2) - (torso.t/2), torso.d/2,
		
		torso.w/2, leg.h  + pelvis.h, -torso.d/2,
		torso.w/2, leg.h  + pelvis.h + (torso.h/2) - (torso.t/2), -torso.d/2,
		-torso.w/2, leg.h  + pelvis.h+ (torso.h/2) - (torso.t/2), -torso.d/2,
		-torso.w/2, leg.h  + pelvis.h, -torso.d/2,
		
		torso.w/2, leg.h  + pelvis.h + (torso.h/2) - (torso.t/2), -torso.d/2,
		torso.w/2, leg.h  + pelvis.h + (torso.h/2) + (torso.t/2), -torso.d/2,
		-torso.w/2, leg.h  + pelvis.h + (torso.h/2) + (torso.t/2), -torso.d/2,
		-torso.w/2, leg.h  + pelvis.h + (torso.h/2) - (torso.t/2), -torso.d/2
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
		
		4, 5, 13,
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
		pelvis.w/2, leg.h, pelvis.d/2,
		pelvis.w/2,  leg.h + pelvis.h, pelvis.d/2,
		-pelvis.w/2, leg.h + pelvis.h, pelvis.d/2,
		-pelvis.w/2, leg.h, pelvis.d/2,
		
		pelvis.w/2, leg.h, -pelvis.d/2,
		pelvis.w/2, leg.h + pelvis.h, -pelvis.d/2,
		-pelvis.w/2, leg.h + pelvis.h, -pelvis.d/2,
		-pelvis.w/2, leg.h, -pelvis.d/2
	];
	
	console.log("posPel: " + posPel );
	
	// Pelvis Indices
	var indPel = [
		// Pelvis indices
		0, 2, 1,	// front
		0, 3, 2,
		
		1, 6, 5,	// top
		1, 2, 6,
		
		4, 5, 6,	// back
		4, 6, 7,
		
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
	
	// Right Leg Verts (18 Vets)
	var posLegR = [
		leg.wU, 0, leg.d/2,		
		leg.wU, (leg.h/2) - (leg.t/2), leg.d/2,
		leg.wU - leg.wL, (leg.h/2) - (leg.t/2), leg.d/2,
		leg.wU - leg.wL, 0, leg.d/2,
		
		leg.wU, leg.h/2, leg.d/2,
		leg.wU - leg.wL, leg.h/2, leg.d/2,
		
		leg.wU, (leg.h/2) + (leg.t/2), leg.d/2,
		leg.wU, leg.h, leg.d/2,
		leg.wU - leg.wL, leg.h, leg.d/2,
		leg.wU - leg.wL, (leg.h/2) + (leg.t/2), leg.d/2,
		
		leg.wU, 0, -leg.d/2,		
		leg.wU, (leg.h/2) - (leg.t/2), -leg.d/2,
		leg.wU - leg.wL, (leg.h/2) - (leg.t/2), -leg.d/2,
		leg.wU - leg.wL, 0, -leg.d/2,
		
		leg.wU, (leg.h/2), -leg.d/2,
		leg.wU, leg.h, -leg.d/2,
		leg.wU - leg.wL, leg.h, -leg.d/2,
		leg.wU - leg.wL, (leg.h/2), -leg.d/2
	];
	
	var indLegR = [
		0, 3, 2,	//Front faces
		0, 2, 1,
		
		1, 2, 5,
		1, 5, 4,
		
		4, 5, 9,
		4, 9, 6,
		
		6, 9, 8,
		6, 8, 7,
		
		// Top faces
		7, 8, 16,
		7, 16, 15,
		
		// Back faces
		10, 11, 12,
		10, 12, 13,
		
		11, 14, 17,
		11, 17, 12,
		
		14, 15, 16,
		14, 16, 17,
		
		// Bottom faces
		0, 10, 13,
		0, 13, 3,
		
		// Left faces
		3, 13, 12,
		3, 12, 2,
		
		2, 12, 17,
		2, 17, 5,
		
		5, 17, 9, // Corner
		
		9, 17, 16,
		9, 16, 8,
		
		// Right faces
		10, 0, 1,
		10, 1, 11,
		
		11, 1, 4,
		11, 4, 14,
		
		14, 4, 6,
		
		6, 7, 15,
		6, 15, 14
	];
	
	var colLegR = [
		0,0,1,1,
		0,0,1,1,
		0,0,1,1,
		0,0,1,1,
		0,0,1,1,
		0,0,1,1,
		0,0,1,1,
		0,0,1,1,
		0,0,1,1,
		0,0,1,1,
		0,0,1,1,
		0,0,1,1,
		0,0,1,1,
		0,0,1,1,
		0,0,1,1,
		0,0,1,1,
		0,0,1,1,
		0,0,1,1
	];
	
	// Left Leg Verts (18 Vets)
	var posLegL = [
		leg.wU, 0, leg.d/2,		
		leg.wU, (leg.h/2) - (leg.t/2), leg.d/2,
		leg.wU - leg.wL, (leg.h/2) - (leg.t/2), leg.d/2,
		leg.wU - leg.wL, 0, leg.d/2,
		
		leg.wU, leg.h/2, leg.d/2,
		leg.wU - leg.wL, leg.h/2, leg.d/2,
		
		leg.wU, (leg.h/2) + (leg.t/2), leg.d/2,
		leg.wU, leg.h, leg.d/2,
		leg.wU - leg.wL, leg.h, leg.d/2,
		leg.wU - leg.wL, (leg.h/2) + (leg.t/2), leg.d/2,
		
		leg.wU, 0, -leg.d/2,		
		leg.wU, (leg.h/2) - (leg.t/2), -leg.d/2,
		leg.wU - leg.wL, (leg.h/2) - (leg.t/2), -leg.d/2,
		leg.wU - leg.wL, 0, -leg.d/2,
		
		leg.wU, (leg.h/2), -leg.d/2,
		leg.wU, leg.h, -leg.d/2,
		leg.wU - leg.wL, leg.h, -leg.d/2,
		leg.wU - leg.wL, (leg.h/2), -leg.d/2
	];
	
	var indLegL = [
		0, 3, 2,	//Front faces
		0, 2, 1,
		
		1, 2, 5,
		1, 5, 4,
		
		4, 5, 9,
		4, 9, 6,
		
		6, 9, 8,
		6, 8, 7,
		
		// Top faces
		7, 8, 16,
		7, 16, 15,
		
		// Back faces
		10, 11, 12,
		10, 12, 13,
		
		11, 14, 17,
		11, 17, 12,
		
		14, 15, 16,
		14, 16, 17,
		
		// Bottom faces
		0, 10, 13,
		0, 13, 3,
		
		// Left faces
		3, 13, 12,
		3, 12, 2,
		
		2, 12, 17,
		2, 17, 5,
		
		5, 17, 9, // Corner
		
		9, 17, 16,
		9, 16, 8,
		
		// Right faces
		10, 0, 1,
		10, 1, 11,
		
		11, 1, 4,
		11, 4, 14,
		
		14, 4, 6,
		
		6, 7, 15,
		6, 15, 14
	];
	
	var colLegL = [
		0,0,1,1,
		0,0,1,1,
		0,0,1,1,
		0,0,1,1,
		0,0,1,1,
		0,0,1,1,
		0,0,1,1,
		0,0,1,1,
		0,0,1,1,
		0,0,1,1,
		0,0,1,1,
		0,0,1,1,
		0,0,1,1,
		0,0,1,1,
		0,0,1,1,
		0,0,1,1,
		0,0,1,1,
		0,0,1,1
	];
	
	var positions = ConcatData( posPel, posTor );
	positions = ConcatData( positions, posLegR );
	//console.log("positions: " + positions );
	var indices = ConcatIndices( indPel, indTor, posPel.length/3 );
	indices = ConcatIndices( indices, indLegR, (posPel.length/3) + (posTor.length/3));
	console.log("indices: " + indices );
	var colors = ConcatData( colPel, colTor );
	colors = ConcatData( colors, colLegR );
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