function firstLastMatchInRange(rangeLen, predicate){
    let first = undefined;
    let last = undefined;
    for (let i = 0; i < rangeLen; i++) {
        if (predicate(i)) {
            if (first === undefined) {
                first = i;
            }
            last = i;
        }
    }
    return [first, last];
}