function $sub(a, b) {
    return ((typeof a === 'object') && (a !== null)) ? $objectSub(a, b) : a - b;
}