function parseUserGateFromCircuitRange(circuit, colRangeText, wireRangeText, nameText) {
    let colRange = parseRange(colRangeText, circuit.columns.length);
    let rowRange = parseRange(wireRangeText, circuit.numWires);
    if (rowRange.end === rowRange.start) {
        throw new Error("Empty wire range.")
    }

    let cols = circuit.columns.
        slice(colRange.start, colRange.end).
        map(col => new GateColumn(col.gates.slice(rowRange.start, rowRange.end)));
    let gateCircuit = new CircuitDefinition(rowRange.end - rowRange.start, cols);
    gateCircuit = removeBrokenGates(gateCircuit);
    gateCircuit = gateCircuit.withUncoveredColumnsRemoved();
    if (gateCircuit.columns.length === 0) {
        throw new Error("No gates in included range.");
    }

    let symbol = nameText;
    let id = '~' + Math.floor(Math.random()*(1 << 20)).toString(32);

    return setGateBuilderEffectToCircuit(new GateBuilder(), gateCircuit).
        setSerializedId(id).
        setSymbol(symbol).
        setTitle(id).
        setBlurb('A custom gate.').
        gate;
}