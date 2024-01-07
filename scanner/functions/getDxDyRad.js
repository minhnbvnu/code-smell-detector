function getDxDyRad(dxdy) {
    if (!dxdy) {
        return 0;
    }
    const { x, y } = dxdy;
    if (x === 0 && y === 0) {
        return 0;
    }
    if (x === 0 || !x) {
        if (y < 0) {
            return -Math.PI / 2;
        }
        if (y > 0) {
            return Math.PI / 2;
        }
    }
    const tan = y / x;
    if (y < 0 && x < 0) {
        return Math.atan(tan) - Math.PI;
    } else if (y > 0 && x < 0) {
        return Math.atan(tan) + Math.PI;
    }
    return Math.atan(tan);

}