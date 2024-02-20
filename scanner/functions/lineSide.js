function lineSide(ax, ay, bx, by, cx, cy) {
    // return true if the point C is on the right of the line (A, B)
    var v = (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
    if (v === 0) {
        return null;
    }
    return v > 0;
}