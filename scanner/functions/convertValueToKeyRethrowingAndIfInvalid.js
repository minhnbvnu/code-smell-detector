function convertValueToKeyRethrowingAndIfInvalid (input, seen) {
    const key = convertValueToKey(input, seen);
    if (key.invalid) {
        throw createDOMException('DataError', key.message || 'Not a valid key; type: ' + key.type);
    }
    return key;
}