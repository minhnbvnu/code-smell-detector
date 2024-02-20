function rectangleCollides(a, b) {

    // shortcut for unrotated rectangles.
    if(a.angle == 0 && b.angle == 0) {
        if(a.x > b.x) {
            var x_inter = a.x - b.x < b.w;
        } else {
            var x_inter = b.x - a.x < a.w;
        }
        if(x_inter == false)
            return false;

        if(a.y > b.y) {
            var y_inter = a.y - b.y < b.h;
        } else {
            var y_inter = b.y - a.y < a.h;
        }
        return y_inter;
    };

    // cache the expensive edges function
    a.edges = rectangleEdges(a);
    b.edges = rectangleEdges(b);

    for(var i=0; i<4; i++) {
        if(isPointInRectangle(b.edges[i][0], b.edges[i][1], a))
            return true
    }
    for(var i=0; i<4; i++) {
        if(isPointInRectangle(a.edges[i][0], a.edges[i][1], b))
            return true
    }
    return false;
}