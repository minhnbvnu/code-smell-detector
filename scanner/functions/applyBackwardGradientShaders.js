function applyBackwardGradientShaders(ctx, span) {
    for (let i = span - 1; i >= 0; i--) {
        HalfTurnGates.H.customOperation(ctx.withRow(ctx.row + i));
        if (i > 0) {
            applyControlledPhaseGradient(ctx, i + 1, -1);
        }
    }
    if (span > 1) {
        ctx.applyOperation(reverseShaderForSize(span));
    }
}