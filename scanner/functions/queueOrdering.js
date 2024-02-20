function queueOrdering(a, b) {
    const cmp = b.priority - a.priority;
    // Prioritize recent commands
    if (cmp === 0) {
        return b.timestamp - a.timestamp;
    }
    return cmp;
}