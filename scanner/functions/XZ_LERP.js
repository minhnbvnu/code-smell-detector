function XZ_LERP(c1, c2, A, dst) {
    const x = (c2.x - c1.x) * A + c1.x;
    const z = (c2.z - c1.z) * A + c1.z;
    dst.x = x;
    dst.z = z;
}