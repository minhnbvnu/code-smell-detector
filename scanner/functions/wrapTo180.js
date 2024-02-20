function wrapTo180(angle) {
    return angle - Math.floor((angle + 180.0) / 360) * 360;
}