function _strncmp(px, py, n) {
    var i = 0;
    while (i < n) {
        var x = HEAPU8[(((px) + (i)) | 0)];
        var y = HEAPU8[(((py) + (i)) | 0)];
        if (x == y && x == 0) return 0;
        if (x == 0) return -1;
        if (y == 0) return 1;
        if (x == y) {
            i++;
            continue;
        } else {
            return x > y ? 1 : -1;
        }
    }
    return 0;
}