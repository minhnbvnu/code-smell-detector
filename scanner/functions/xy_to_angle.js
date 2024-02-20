function xy_to_angle(v) {
    if ($Math.abs(v.x) < 1e-10 && $Math.abs(v.y) < 1e-10) {
        return 0;
    } else {
        return rotation_sign() * $Math.atan2(v.y, v.x);
    }
}