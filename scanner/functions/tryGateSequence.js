function tryGateSequence(gates, maxHeight) {
    let pad = new Array(maxHeight - 1).fill(undefined);
    let cols = gates.
        filter(e => e !== Gates.Special.Measurement && e !== Gates.ErrorInjection && e.height <= maxHeight).
        map(e => new GateColumn([e, ...pad]));
    let c = new CircuitDefinition(maxHeight, cols);
    let stats = CircuitStats.fromCircuitAtTime(c, 0.1);
    assertThat(stats).isNotEqualTo(undefined);
}