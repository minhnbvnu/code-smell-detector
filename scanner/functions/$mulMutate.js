function $mulMutate(a, b) {
    return ((typeof a === 'object') && (a !== null)) ? $objectMulMutate(a, b) : a *= b;
}