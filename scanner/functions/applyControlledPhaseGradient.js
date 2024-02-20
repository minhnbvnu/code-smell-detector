function applyControlledPhaseGradient(ctx, qubitSpan, factor=1) {
    ctx.applyOperation(CONTROLLED_PHASE_GRADIENT_SHADER.withArgs(
        ...ketArgs(ctx, qubitSpan),
        WglArg.float("factor", factor)));
}