function XZ_DIRECTION(v1, v2) {
    let mag = $Math.hypot(v1.x, v1.z);
    if (mag < 0.0000001) {
        v2.x = v2.z = 0;
    } else {
        mag = 1 / mag;
        v2.x = v1.x * mag;
        v2.z = v1.z * mag;
    }
}