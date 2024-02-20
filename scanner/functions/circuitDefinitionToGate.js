function circuitDefinitionToGate(circ) {
    return setGateBuilderEffectToCircuit(new GateBuilder(), circ).gate;
}