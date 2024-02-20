function assertControlOverlapState(control, expectedOverlap, state) {
    let [a, b] = state;
    let u = Matrix.square(a, Complex.from(b).conjugate().neg(),
                          b, Complex.from(a).conjugate());
    u = u.times(1/Math.sqrt(u.determinant().abs()));
    assertThat(u.isUnitary(0.00001)).withInfo({state, u}).isEqualTo(true);

    let circuit = new CircuitDefinition(2, [
        new GateColumn([Gate.fromKnownMatrix('****', u, '', ''), undefined]),
        new GateColumn([control, Gates.HalfTurns.X]),
    ]);
    let stats = CircuitStats.fromCircuitAtTime(circuit, 0);
    let overlap = stats.controlledWireProbabilityJustAfter(1, Infinity);
    assertThat(overlap).isApproximatelyEqualTo(expectedOverlap)
}