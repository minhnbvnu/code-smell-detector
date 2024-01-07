function withInEllipse(point, center, southeast, tolerance) {
    point = new Point(point);
    const a = Math.abs(southeast.x - center.x),
        b = Math.abs(southeast.y - center.y),
        c = Math.sqrt(Math.abs(a * a - b * b)),
        xfocus = a >= b;
    let f1, f2, d;
    if (xfocus) {
        f1 = new Point(center.x - c, center.y);
        f2 = new Point(center.x + c, center.y);
        d = a * 2;
    } else {
        f1 = new Point(center.x, center.y - c);
        f2 = new Point(center.x, center.y + c);
        d = b * 2;
    }
    /*
    L1 + L2 = D
    L1 + t >= L1'
    L2 + t >= L2'
    D + 2t >= L1' + L2'
    */
    return (point.distanceTo(f1) + point.distanceTo(f2)) <= (d + 2 * tolerance);
}