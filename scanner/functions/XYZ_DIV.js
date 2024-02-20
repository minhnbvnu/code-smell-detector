function XYZ_DIV(v1, s, r) {
    s = 1 / s;
    r.x = v1.x * s;
    r.y = v1.y * s;
    r.z = v1.z * s;
}