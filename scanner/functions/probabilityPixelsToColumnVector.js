function probabilityPixelsToColumnVector(pixels, span) {
    let n = 1 << span;
    // CAUTION: pixels may be longer than n due to the length rounding up to a multiple of 4.

    let unity = 0;
    for (let i = 0; i < n; i++) {
        unity += pixels[i];
    }
    if (isNaN(unity) || unity < 0.000001) {
        return Matrix.zero(1, n).times(NaN);
    }
    let buf = new Float32Array(n*2);
    for (let i = 0; i < n; i++) {
        buf[i*2] = pixels[i] / unity;
    }
    return new Matrix(1, n, buf);
}