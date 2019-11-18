// ----------------------------------------------------------------
// Encapsulate viewport into separate object
function Viewport(size, width, height){
    // Members for viewport object
    this.screenX = width;	// Screen Width(X) and Height(Y)
    this.screenY = height;
    this.startTileX = 0;	// Upper-left tile
    this.startTileY = 0;
    this.endTileX = 0;		// Lower-right tile
    this.endTileY = 0;
    this.offsetX = 0;		// Offset from tileMap origin
    this.offsetY = 0;
    this.tileSize = 40; //size;	// Pixel size of tiles
}
Viewport.prototype.updateViewport = function( px, py ) {
    this.offsetX = Math.floor((this.screenX/2) - px); 	// (400/2) - 200 = 200 - 200 = 0;
    this.offsetY = Math.floor((this.screenY/2) - py); 	// (400/2) - 200 = 200

    var tileX = Math.floor(px/this.tileSize);		// 200/40 = 5
    var tileY = Math.floor(py/this.tileSize);

    this.startTileX = tileX - 1 - Math.ceil((this.screenX/2) / this.tileSize);	// tileX:5 - 1 - ((400/2) / 40)
    this.startTileY = tileY - 1 - Math.ceil((this.screenY/2) / this.tileSize);

    if(this.startTileX < 0) { this.startTileX = 0; }
    if(this.startTileY < 0) { this.startTileY = 0; }

    this.endTileX = tileX + 1 + Math.ceil((this.screenX/2) / this.tileSize);
    this.endTileY = tileY + 1 + Math.ceil((this.screenY/2) / this.tileSize);

    if(this.endTileX >= map.width() ) { this.endTileX = map.width(); }
    if(this.endTileY >= map.height()) { this.endTileY = map.height(); }
}