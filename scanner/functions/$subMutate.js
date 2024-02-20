function $subMutate(a, b) {
    return ((typeof a === 'object') && (a !== null)) ? $objectSubMutate(a, b) : a -= b;
}