function array2DGet(a, x, y) {
    if ((x >= 0) && (x < a.width) && (y >= 0) && (y < a.height)) {
        return a.data[x + y * a.width];
    } else {
        return undefined;
    }
}