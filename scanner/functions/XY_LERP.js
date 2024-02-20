function XY_LERP(c1, c2, A, dst) {
    const x = (c2.x - c1.x) * A + c1.x;
    const y = (c2.y - c1.y) * A + c1.y;
    dst.x = x;
    dst.y = y;
}