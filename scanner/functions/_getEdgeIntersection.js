function _getEdgeIntersection(a, b, code, bounds, round) {
    const dx = b.x - a.x,
        dy = b.y - a.y,
        min = bounds.getMin(),
        max = bounds.getMax();
    let x, y;

    if (code & 8) { // top
        x = a.x + dx * (max.y - a.y) / dy;
        y = max.y;

    } else if (code & 4) { // bottom
        x = a.x + dx * (min.y - a.y) / dy;
        y = min.y;

    } else if (code & 2) { // right
        x = max.x;
        y = a.y + dy * (max.x - a.x) / dx;

    } else if (code & 1) { // left
        x = min.x;
        y = a.y + dy * (min.x - a.x) / dx;
    }

    const p = new Point(x, y);
    if (round) {
        p._round();
    }
    return p;
}