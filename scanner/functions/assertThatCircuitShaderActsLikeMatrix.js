function assertThatCircuitShaderActsLikeMatrix(shaderFunc, matrix, repeats=5) {
    assertThatCircuitUpdateActsLikeMatrix(
        ctx => ctx.applyOperation(shaderFunc),
        matrix,
        repeats);
}