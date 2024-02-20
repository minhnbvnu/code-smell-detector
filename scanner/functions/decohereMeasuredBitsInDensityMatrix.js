function decohereMeasuredBitsInDensityMatrix(densityMatrix, isMeasuredMask) {
    if (isMeasuredMask === 0) {
        return densityMatrix;
    }

    let buf = new Float32Array(densityMatrix.rawBuffer());
    let n = densityMatrix.width();
    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            if (((row ^ col) & isMeasuredMask) !== 0) {
                let k = (row*n + col)*2;
                buf[k] = 0;
                buf[k+1] = 0;
            }
        }
    }
    return new Matrix(n, n, buf);
}