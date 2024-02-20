function assertThatCircuitShaderActsLikePermutation(wireCount, shaderMaker, permutation, permuteInfo=undefined) {
    assertThatCircuitUpdateActsLikePermutation(
        wireCount,
        ctx => ctx.applyOperation(shaderMaker(ctx)),
        permutation,
        permuteInfo)
}