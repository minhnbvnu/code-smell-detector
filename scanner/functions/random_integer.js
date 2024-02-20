function random_integer(lo, hi, rng) {
    if (hi === undefined) {
        if (lo === undefined) {
            $error("random_integer(lo, hi, random = random) requires at least two arguments.");
        }
        // Backwards compatibility
        hi = lo;
        lo = 0;        
    }
    rng = rng || random;
    return $Math.min(hi, floor(rng(lo, hi + 1)));
}