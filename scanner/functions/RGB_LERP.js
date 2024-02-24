function RGB_LERP(c1, c2, A, dst) {
    const r = (c2.r - c1.r) * A + c1.r;
    const g = (c2.g - c1.g) * A + c1.g;
    const b = (c2.b - c1.b) * A + c1.b;
    dst.r = r;
    dst.g = g;
    dst.b = b;
}