function inPolygon(polygonA, polygonB, debug) {

    var h, i, j,
        collision = false;

    // test to see if just a point coordinate (x,y) was sent in
    if (polygonA.hasOwnProperty('x')) {
        // convert to single-length array for traversal
        polygonA = [polygonA];
    }

    for (h = 0; h < polygonA.length; h += 1) {
        if (collision === false) {
            for (i = 0, j = polygonB.length - 1; i < polygonB.length; j = i++) {
                if (((polygonB[i].y > polygonA[h].y) !== (polygonB[j].y > polygonA[h].y))
                    && (polygonA[h].x < (polygonB[j].x - polygonB[i].x) * (polygonA[h].y - polygonB[i].y) / (polygonB[j].y - polygonB[i].y) + polygonB[i].x)
                ) {
                    collision = !collision;
                }
            }
        }
    }
 
    return collision;
}