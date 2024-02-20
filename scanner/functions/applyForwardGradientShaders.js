function applyForwardGradientShaders(ctx, span) {
    if (span > 1) {
        ctx.applyOperation(reverseShaderForSize(span));
    }
    for (let i = 0; i < span; i++) {
        if (i > 0) {
            applyControlledPhaseGradient(ctx, i + 1, +1);
        }
        HalfTurnGates.H.customOperation(ctx.withRow(ctx.row + i));
    }
}