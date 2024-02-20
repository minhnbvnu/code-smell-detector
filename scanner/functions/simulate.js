function simulate(circuit) {
    if (_cachedStats !== undefined && _cachedStats.circuitDefinition.isEqualTo(circuit)) {
        return _cachedStats.withTime(getCircuitCycleTime());
    }

    _cachedStats = undefined;
    let result = CircuitStats.fromCircuitAtTime(circuit, getCircuitCycleTime());
    if (circuit.stableDuration() === Infinity) {
        _cachedStats = result;
    }
    return result;
}