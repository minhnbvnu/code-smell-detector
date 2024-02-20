function convertValueToKeyRange (value, nullDisallowed) {
    if (util.instanceOf(value, IDBKeyRange)) {
        // We still need to validate IDBKeyRange-like objects (the above check is based on loose duck-typing)
        if (value.toString() !== '[object IDBKeyRange]') {
            return IDBKeyRange.__createInstance(value.lower, value.upper, value.lowerOpen, value.upperOpen);
        }
        return value;
    }
    if (util.isNullish(value)) {
        if (nullDisallowed) {
            throw createDOMException('DataError', 'No key or range was specified');
        }
        return undefined; // Represents unbounded
    }
    Key.convertValueToKeyRethrowingAndIfInvalid(value);
    return IDBKeyRange.only(value);
}