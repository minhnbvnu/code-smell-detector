function customStatsToJsonData(customStats) {
    let {quality, ket, phaseLockIndex, incoherentKet} = customStats;
    let n = ket.width() * ket.height();
    return {
        coherence_measure: quality,
        superposition_phase_locked_state_index: phaseLockIndex === undefined ? null : phaseLockIndex,
        ket: complexVectorToReadableJson(new Matrix(1, n, ket.rawBuffer()).getColumn(0)),
        incoherentKet: realVectorToReadableJson(new Matrix(1, n, incoherentKet.rawBuffer()).getColumn(0))
    };
}