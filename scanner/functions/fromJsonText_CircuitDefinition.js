function fromJsonText_CircuitDefinition(jsonText) {
    if (_cachedCircuit_Arg === jsonText) {
        return _cachedCircuit;
    }
    _cachedCircuit_Arg = jsonText;
    _cachedCircuit = fromJson_CircuitDefinition(JSON.parse(jsonText), undefined);
    return _cachedCircuit;
}