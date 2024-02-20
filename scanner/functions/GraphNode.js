function GraphNode(x,y,isWall) {
    this.x = x;
    this.y = y;
    this._isWall = isWall;
    this.pos = {x:x,y:y};
    this.debug = "";
}