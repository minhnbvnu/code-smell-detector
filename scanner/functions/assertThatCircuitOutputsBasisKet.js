function assertThatCircuitOutputsBasisKet(circuit, expected_output) {
    let stats = CircuitStats.fromCircuitAtTime(circuit, 0);
    assertThat(stats.finalState.hasNaN()).isEqualTo(false);

    let actualOut = Seq.range(stats.finalState.height()).
        filter(i => stats.finalState.cell(0, i).isEqualTo(1)).
        first('no solo ket found');
    assertThat(actualOut).isEqualTo(expected_output);

    let b = stats.finalState.rawBuffer();
    for (let i = 0; i < b.length; i++) {
        if (i !== expected_output * 2) {
            assertThat(b[i]).withInfo({i}).isEqualTo(0);
        }
    }
}