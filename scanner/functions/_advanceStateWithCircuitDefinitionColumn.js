function _advanceStateWithCircuitDefinitionColumn(
        ctx,
        circuitDefinition,
        col,
        statsCallback) {

    let controls = ctx.controls.and(circuitDefinition.colControls(col).shift(ctx.row));
    let controlTex = CircuitShaders.controlMask(controls).toBoolTexture(ctx.wireCount);

    let colContext = Util.mergeMaps(
        ctx.customContextFromGates,
        circuitDefinition.colCustomContextFromGates(col, ctx.row));

    let trader = ctx.stateTrader;
    let aroundCtx = new CircuitEvalContext(
        ctx.time,
        ctx.row,
        ctx.wireCount,
        ctx.controls,
        ctx.controlsTexture,
        controls,
        trader,
        colContext);
    let mainCtx = new CircuitEvalContext(
        ctx.time,
        ctx.row,
        ctx.wireCount,
        controls,
        controlTex,
        controls,
        trader,
        colContext);

    circuitDefinition.applyBeforeOperationsInCol(col, aroundCtx);
    circuitDefinition.applyMainOperationsInCol(col, mainCtx);
    statsCallback(mainCtx);
    circuitDefinition.applyAfterOperationsInCol(col, aroundCtx);

    controlTex.deallocByDepositingInPool("controlTex in _advanceStateWithCircuitDefinitionColumn");
}