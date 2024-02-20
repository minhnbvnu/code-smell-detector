function singleQubitDensityMatrixToReadableJson(matrix) {
    if (matrix.hasNaN()) {
        return null;
    }
    let [x, y, z] = matrix.qubitDensityMatrixToBlochVector();
    x *= -1;
    z *= -1;
    return {x, y, z};
}