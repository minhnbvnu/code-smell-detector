function removeBrokenGates(circuit) {
    let w = circuit.columns.length;
    let h = circuit.numWires;
    return circuit.withColumns(
        seq(circuit.columns).mapWithIndex(
            (col, c) => new GateColumn(seq(col.gates).mapWithIndex(
                (gate, r) => gate === undefined || c + gate.width > w || r + gate.height > h ? undefined : gate
            ).toArray())
        ).toArray());
}