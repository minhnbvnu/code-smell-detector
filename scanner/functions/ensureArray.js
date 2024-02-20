function ensureArray(val) {
    if (!Array.isArray(val)) {
        return [val];
    }
    return val;
}