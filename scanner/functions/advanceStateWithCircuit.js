function advanceStateWithCircuit(ctx, circuitDefinition, collectStats) {
    // Prep stats collection.
    let colQubitDensities = [];
    let customStats = [];
    let colNorms = [];
    let customStatsMap = [];
    let statsCallback = col => statArgs => {
        if (!collectStats) {
            return;
        }

        let {qubitDensities, norm, customGateStats} = _extractStateStatsNeededByCircuitColumn(
            statArgs,
            circuitDefinition,
            col);
        colQubitDensities.push(qubitDensities);
        colNorms.push(norm);
        for (let {row, stat} of customGateStats) {
            customStatsMap.push({col, row, out: customStats.length});
            customStats.push(stat);
        }
    };

    circuitDefinition.applyInitialStateOperations(ctx);

    // Apply each column in the circuit.
    for (let col = 0; col < circuitDefinition.columns.length; col++) {
        _advanceStateWithCircuitDefinitionColumn(
            ctx,
            circuitDefinition,
            col,
            statsCallback(col));
    }

    if (collectStats) {
        const allWiresMask = (1 << circuitDefinition.numWires) - 1;
        colQubitDensities.push(KetTextureUtil.superpositionToQubitDensities(
            ctx.stateTrader.currentTexture, Controls.NONE, allWiresMask));
    }

    return {
        colQubitDensities,
        colNorms,
        customStats,
        customStatsMap
    };
}