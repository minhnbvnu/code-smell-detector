function circleCollides(a, b) {
    var c1 = shapeCenter(a);
    var c2 = shapeCenter(b);
    return sjs.math.hypo(c1.x - c2.x, c1.y - c2.y) < a.w / 2 + b.w / 2;
}