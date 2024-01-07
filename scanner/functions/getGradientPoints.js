function getGradientPoints(points) {
    let pts;
    let isLine = true;
    //polygon rings
    if (Array.isArray(points[0])) {
        pts = points[0];
        isLine = false;
    } else {
        pts = points;
    }
    const len = pts.length;
    if (isLine) {
        return [pts[0], pts[len - 1]];
    }
    const p1 = pts[0];
    let distance = 0, p2;
    for (let i = 1; i < len; i++) {
        const p = pts[i];
        const dis = p1.distanceTo(p);
        if (dis > distance) {
            distance = dis;
            p2 = p;
        }
    }
    return [p1, p2];
}