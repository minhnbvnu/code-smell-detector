function array2DSet(a, x, y, v) {
    if ((x >= 0) && (x < a.width) && (y >= 0) && (y < a.height)) { a.data[x + y * a.width] = v; }
}