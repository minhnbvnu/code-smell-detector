function distanceTo(p0, p1) {
    const x = p1.x - p0.x,
        y = p1.y - p0.y;
    return Math.sqrt(x * x + y * y);
}