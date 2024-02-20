function _lerpWithUndefinedCheck(x, y, t) {
    if (x == undefined) {
        return y;
    } else if (y == undefined) {
        return x;
    } else {
        return THREE.MathUtils.lerp(x, y, t);
    }
}