function rectangleCircleCollides(r, c) {
    var edges = rectangleEdges(r);
    var c1 = shapeCenter(c);
    for(var i=0; i < 4; i++) {
        if(pointToLineDistance(c1.x, c1.y,
            edges[i][0], edges[i][1],
            edges[(i+1) % 4][0], edges[(i+1) % 4][1])
            < c.w / 2) {
            return true;
        }
    }
    return false;
}