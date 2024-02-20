function fromJson_CustomGateSet(json) {
    if (!Array.isArray(json)) {
        throw new DetailedError("Expected an array of gates.", {json});
    }
    let gatesSoFar = new CustomGateSet();
    for (let e of json) {
        gatesSoFar = gatesSoFar.withGate(fromJson_Gate(e, gatesSoFar));
    }
    return gatesSoFar;
}