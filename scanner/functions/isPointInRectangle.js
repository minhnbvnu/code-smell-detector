function isPointInRectangle(x, y, rect) {
    // Return true if the point is within the rectangle surface.
    // the edges need to the be precalcualted
    if(rect.angle == 0 || rect.angle === undefined)
        return (x >= rect.x && x < rect.x+rect.w
            && y >= rect.y && y < rect.y+rect.h);

    for(var i=0; i<4; i++) {
        var j = i+1;
        if(j>3)
            j=0;
        // if on the right of the line, the point
        // cannot be in the rectangle
        if(sjs.math.lineSide(
            rect.edges[i][0], rect.edges[i][1],
            rect.edges[j][0], rect.edges[j][1],
            x, y
        )) {
            return false
        }
    }
    return true;
}