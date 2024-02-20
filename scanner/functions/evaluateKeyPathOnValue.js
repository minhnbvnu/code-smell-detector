function evaluateKeyPathOnValue (value, keyPath, multiEntry) {
    return evaluateKeyPathOnValueToDecodedValue(value, keyPath, multiEntry, true);
}