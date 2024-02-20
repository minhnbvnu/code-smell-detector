function XY_DIRECTION(v1, v2) {
    let mag = $Math.hypot(v1.x, v1.y);
    if (mag < 0.0000001) {
        v2.x = v2.y = 0;
    } else {
        mag = 1 / mag;
        v2.x = v1.x * mag;
        v2.y = v1.y * mag;
    }
}