function _parseGateMatrix(matrixProp) {
    if (matrixProp === undefined) {
        throw new Error("Unrecognized gate id, but no matrix specified.");
    }
    let matrix = fromJson_Matrix(matrixProp);
    if (matrix.width() !== matrix.height()) {
        throw new Error("Gate matrix must be square.");
    }
    if (matrix.width() < 2 || matrix.width() > 1 << 4 || !Util.isPowerOf2(matrix.width())) {
        throw new Error("Supported gate matrix sizes are 2, 4, 8, and 16.");
    }
    return matrix;
}