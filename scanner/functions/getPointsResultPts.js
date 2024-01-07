function getPointsResultPts(points = [], ptKey = '_pt') {
    const resultPoints = [];
    for (let i = 0, len = points.length; i < len; i++) {
        const point = points[i];
        if (!point) {
            resultPoints.push(null);
            continue;
        }
        if (!point[ptKey]) {
            point[ptKey] = new Point(0, 0);
        }
        const pt = point[ptKey];
        pt.x = 0;
        pt.y = 0;
        resultPoints.push(pt);
    }
    return resultPoints;
}