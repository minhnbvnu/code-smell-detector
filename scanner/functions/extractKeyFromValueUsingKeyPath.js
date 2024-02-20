function extractKeyFromValueUsingKeyPath (value, keyPath, multiEntry) {
    return extractKeyValueDecodedFromValueUsingKeyPath(value, keyPath, multiEntry, true);
}