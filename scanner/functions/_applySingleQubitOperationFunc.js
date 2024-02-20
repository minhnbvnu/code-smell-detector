function _applySingleQubitOperationFunc(ctx, matrix) {
    if (matrix.width() !== 2 || matrix.height() !== 2) {
        throw new DetailedError("Not a single-qubit operation.", {matrix});
    }
    let [ar, ai, br, bi, cr, ci, dr, di] = matrix.rawBuffer();
    ctx.applyOperation(CUSTOM_SINGLE_QUBIT_OPERATION_SHADER.withArgs(
        ...ketArgs(ctx),
        WglArg.vec2("a", ar, ai),
        WglArg.vec2("b", br, bi),
        WglArg.vec2("c", cr, ci),
        WglArg.vec2("d", dr, di)));
}