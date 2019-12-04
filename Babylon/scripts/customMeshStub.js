// create a custom mesh object
var customMesh = new BABLYON.Mesh("custom", scene);
var positions = [];			//	Array of 3 floats (3 per vertex)
var indices = [];			//	Array of ints (3 per face)
var normal = [];			//	Array of 3 floats (3 per vertex)
var position = new BABLYON.Vector3( 0,0,0 );
var rotation = new BABLYON.Vector3( 0,0,0 );
var pickable = true;		//
var uvs = [];				//	Array of floats (2 per vertex)		optional
var colors = [];			//	Array of floats (4 per vertex)		optional
var hasVertexAlpha = false;	//										optional
var matricesIndices = [];	//	Array of ints (4 per vertex)		optional
var matricesWeights = [];	//	Array of floats (4 per vertex)		optional
var animations = [];		//	Array of animations					optional
var instances = [];			//	Array of Instances					optional
var actions = [];			//	Array of Actions					optional

//Calculations of normals added
BABYLON.VertexData.ComputeNormals(positions, indices, normals);

var vertexData = new BABYLON.VertexData();

this.vertexData.positions = this.positions;
this.vertexData.indices = this.indices;
this.vertexData.normals = this.normals; //Assignment of normal to vertexData added
this.vertexData.colors = this.colors;
this.vertexData.pickable = this.pickable;