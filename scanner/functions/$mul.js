function $mul(a, b) {
    // Special case: allow number * object
    return ((typeof a === 'object') && (a !== null)) ?
        $objectMul(a, b) :
        ((typeof b === 'object') && (b !== null)) ?
        $objectMul(b, a) :
        a * b;
}