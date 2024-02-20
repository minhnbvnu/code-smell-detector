function XYZ_LERP(c1, c2, A, dst) {
    const x = (c2.x - c1.x) * A + c1.x;
    const y = (c2.y - c1.y) * A + c1.y;
    const z = (c2.z - c1.z) * A + c1.z;
    dst.x = x;
    dst.y = y;
    dst.z = z;
}