function detectorStatTexture(ctx) {
    let mask = controlMaskTex(ctx, ctx.controls.and(Controls.bit(ctx.row, true)));
    try {
        return textureWithTotalWeightMatchingGivenControls(ctx.stateTrader.currentTexture, mask, true);
    } finally {
        mask.deallocByDepositingInPool('textureWithTotalWeightMatchingPositiveMeasurement:mask')
    }
}