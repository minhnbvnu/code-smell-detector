function pointIsInsidePolygon(point, polygonPoints, epsilon, offset, count, size) {
    // ray-casting algorithm based on
    // http://wrf.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    const x = point.x;
    const y = point.y;

    let inside = false;
    // in first j is last point of polygon
    // for each segment of the polygon (j is i -1)
    for (let i = offset, j = offset + count - size; i < offset + count; j = i, i += size) {
        const xi = polygonPoints[i];
        const yi = polygonPoints[i + 1];
        const xj = polygonPoints[j];
        const yj = polygonPoints[j + 1];

        if (pointIsOverLine(point, [xi, yi, xj, yj], epsilon, 0, 4, 2)) { return true; }

        // isIntersect semi-infinite ray horizontally with polygon's edge
        const isIntersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (isIntersect) {
            inside = !inside;
        }
    }

    return inside;
}