function $divMutate(a, b) {
    return ((typeof a === 'object') && (a !== null)) ? $objectDivMutate(a, b) : a /= b;
}