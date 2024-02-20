function $addMutate(a, b) {
    const t = typeof a;
    return ((t === 'object') && (a !== null)) ?
        $objectAddMutate(a, b) :
        (t === 'string') ?
        a += $stringify(b) :
        a += b;
}