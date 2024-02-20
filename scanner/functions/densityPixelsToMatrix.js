function densityPixelsToMatrix(pixels, circuitDefinition, col, row) {
    let n = pixels.length >> 1;
    let d = Math.round(Math.sqrt(n));
    let unity = 0;
    for (let i = 0; i < d; i++) {
        unity += pixels[2*i*(d+1)];
    }
    if (isNaN(unity) || unity < 0.000001) {
        return Matrix.zero(d, d).times(NaN);
    }
    for (let i = 0; i < pixels.length; i++) {
        pixels[i] /= unity;
    }

    let isMeasuredMask = circuitDefinition.colIsMeasuredMask(col) >> row;
    return decohereMeasuredBitsInDensityMatrix(new Matrix(d, d, pixels), isMeasuredMask).transpose();
}