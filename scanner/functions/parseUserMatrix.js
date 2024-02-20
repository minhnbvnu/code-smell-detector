function parseUserMatrix(text, ensureUnitary) {
    let op = parseUserGateMatrix_noCorrection(text);
    if (op.width() !== op.height() || op.width() < 2 || op.width() > 16 || !Util.isPowerOf2(op.width())) {
        throw Error("Matrix must be 2x2, 4x4, 8x8, or 16x16.")
    }
    if (ensureUnitary && !op.hasNaN()) {
        op = op.closestUnitary(0.0001);
        op = decreasePrecisionAndSerializedSize(op);
    }
    return op;
}