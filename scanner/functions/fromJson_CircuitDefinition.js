function fromJson_CircuitDefinition(json, context=undefined) {
    let {cols} = json;
    let customGateSet = context ||
        (json.gates === undefined ? new CustomGateSet() : fromJson_CustomGateSet(json.gates));

    if (!Array.isArray(cols)) {
        throw new Error(`CircuitDefinition json should contain an array of cols. Json: ${describe(json)}`);
    }
    let gateCols = cols.map(e => fromJson_GateColumn(e, customGateSet));

    let initialValues = _fromJson_InitialState(json);

    let numWires = 0;
    for (let col of gateCols) {
        numWires = Math.max(numWires, col.minimumRequiredWireCount());
    }
    numWires = Math.max(
        Config.MIN_WIRE_COUNT,
        Math.min(numWires, Config.MAX_WIRE_COUNT),
        ...[...initialValues.keys()].map(e => e + 1));

    gateCols = gateCols.map(col => new GateColumn([
            ...col.gates,
            // Pad column up to circuit length.
            ...new Array(Math.max(0, numWires - col.gates.length)).fill(undefined)
        // Silently discard gates off the edge of the circuit.
        ].slice(0, numWires)));

    return new CircuitDefinition(numWires, gateCols, undefined, undefined, customGateSet, false, initialValues).
        withTrailingSpacersIncluded();
}