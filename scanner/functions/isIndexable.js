function isIndexable(value) {
    return Array.isArray(value) || !GENERIC_ARRAY_TYPES.every(t => !(value instanceof t));
}