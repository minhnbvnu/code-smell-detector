function oscillate(x, lo, hi) {
    if (lo === undefined) {
        lo = 0; hi = 1;
    } else if (hi === undefined) {
        // Legacy version
        hi = lo;
        lo = 0;
    }

    if (hi <= lo) { $error("oscillate(x, lo, hi) must have hi > lo"); }
    x -= lo;
    hi -= lo;
    
    const k = 2 * hi;
    x = loop(x, k);
    return ((x < hi) ? x : k - x) + lo;
}