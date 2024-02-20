function assertThatGateActsLikePermutation(
        gate,
        permutationFunc,
        inputSpans=[],
        ignoreTargetEndsUpDisabled=false) {
    let inputGates = [];
    for (let [key, inputGate] of [['Input Range A', Gates.InputGates.InputAFamily],
                                  ['Input Range B', Gates.InputGates.InputBFamily],
                                  ['Input Range R', Gates.InputGates.InputRFamily]]) {
        if (gate.getUnmetContextKeys().has(key)) {
            inputGates.push(inputGate.ofSize(inputSpans[inputGates.length]));
        }
    }
    inputSpans = inputSpans.slice(0, inputGates.length);

    let dstWire = 0;
    let wireCount = dstWire + gate.height;
    let inpWires = new Array(inputGates.length);
    for (let i = 0; i < inputGates.length; i++) {
        if (Math.random() < 0.2) {
            wireCount += 1;
        }
        inpWires[i] = wireCount;
        wireCount += inputGates[i].height;
    }

    // Useful facts.
    let dstMask = ((1 << gate.height) - 1) << dstWire;
    let inpMasks = seq(inpWires).zip(inputGates, (off, g) => ((1 << g.height) - 1) << off).toArray();

    // Make permutation matrix.
    let fullPermutation = val => {
        let dst = (val & dstMask) >> dstWire;
        let inps = seq(inpMasks).zip(inpWires, (m, w) => (val & m) >> w).toArray();
        let out = permutationFunc(dst, ...inps);
        return (val & ~dstMask) | out;
    };

    // Make circuit.
    let col = new Array(wireCount).fill(undefined);
    for (let i = 0; i < inputSpans.length; i++) {
        col[inpWires[i]] = inputGates[i];
    }
    col[dstWire] = gate;
    let circuit = new CircuitDefinition(wireCount, [new GateColumn(col)]);

    if (circuit.gateAtLocIsDisabledReason(0, 0) !== undefined) {
        if (ignoreTargetEndsUpDisabled) {
            return;
        }
        assertThat(circuit.gateAtLocIsDisabledReason(0, 0)).withInfo({gate}).isEqualTo(undefined);
    }

    let updateAction = ctx => advanceStateWithCircuit(ctx, circuit, false);
    assertThatCircuitUpdateActsLikePermutation(
        wireCount,
        updateAction,
        fullPermutation,
        {
            gate_id: gate.serializedId,
            dstWire,
            inpWires,
            inputSpans
        });
}