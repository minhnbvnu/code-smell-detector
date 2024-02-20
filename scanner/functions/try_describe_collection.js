function try_describe_collection(value, recursionLimit) {
    if (recursionLimit === 0) {
        return RECURSE_LIMIT_DESCRIPTION;
    }
    if (value instanceof Map) {
        return describe_Map(value, recursionLimit);
    }
    if (value instanceof Set) {
        return describe_Set(value, recursionLimit);
    }
    if (value[Symbol.iterator] !== undefined) {
        return describe_Iterable(value, recursionLimit);
    }
    return undefined;
}