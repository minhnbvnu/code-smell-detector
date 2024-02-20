function $neg(a) {
    return ((typeof a === 'object') && (a !== null)) ? $objectNeg(a) : -a;
}