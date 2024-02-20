function transposeGrid(src) {
    const dst = [];
    dst.length = src[0].length;
    for (let i = 0; i < dst.length; ++i) {
        dst[i] = [];
        dst[i].length = src.length;
        for (let j = 0; j < src.length; ++j) {
            dst[i][j] = src[j][i];
        }
    }
    return dst;
}