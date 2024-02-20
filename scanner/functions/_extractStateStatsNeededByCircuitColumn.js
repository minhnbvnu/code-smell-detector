function _extractStateStatsNeededByCircuitColumn(
        ctx,
        circuitDefinition,
        col) {
    // Compute custom stats used by display gates.
    let customGateStats = [];
    for (let row of circuitDefinition.customStatRowsInCol(col)) {
        let statCtx = new CircuitEvalContext(
            ctx.time,
            row,
            circuitDefinition.numWires,
            ctx.controls,
            ctx.controlsTexture,
            ctx.controls,
            ctx.stateTrader,
            Util.mergeMaps(
                ctx.customContextFromGates,
                circuitDefinition.colCustomContextFromGates(col, row)));
        let stat = circuitDefinition.columns[col].gates[row].customStatTexturesMaker(statCtx);
        customGateStats.push({row, stat});
    }

    // Compute individual qubit densities, where needed.
    let qubitDensities = KetTextureUtil.superpositionToQubitDensities(
        ctx.stateTrader.currentTexture,
        ctx.controls,
        circuitDefinition.colDesiredSingleQubitStatsMask(col));

    // Compute survival rate.
    let normMayHaveChanged = circuitDefinition.columns[col].indexOfNonUnitaryGate() !== undefined;
    let norm = KetTextureUtil.superpositionToNorm(ctx.stateTrader.currentTexture, normMayHaveChanged);

    return {qubitDensities, norm, customGateStats};
}