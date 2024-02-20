function sampleMeasure(ctx) {
    let maskAll = controlMaskTex(ctx, Controls.NONE);
    let maskMatch = controlMaskTex(ctx, ctx.controls.and(Controls.bit(ctx.row, true)));
    let weightAll = textureWithTotalWeightMatchingGivenControls(ctx.stateTrader.currentTexture, maskAll);
    let weightMatch = textureWithTotalWeightMatchingGivenControls(ctx.stateTrader.currentTexture, maskMatch);

    ctx.applyOperation(detectorShader(
        weightAll,
        weightMatch,
        maskMatch,
        ctx.stateTrader.currentTexture,
        WglArg.float('rnd', Math.random())));

    weightMatch.deallocByDepositingInPool();
    weightAll.deallocByDepositingInPool();
    maskMatch.deallocByDepositingInPool();
    maskAll.deallocByDepositingInPool();
}