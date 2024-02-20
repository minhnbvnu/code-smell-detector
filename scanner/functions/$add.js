function $add(a, b) {
    // Keep short to encourage inlining
    const t = typeof a;
    return ((t === 'object') && (a !== null)) ?
        $objectAdd(a, b) :
        (t === 'string') ?
        a + $stringify(b) :
        a + b;
}