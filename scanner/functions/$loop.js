function $loop(x, lo, hi) {
    x -= lo;
    hi -= lo;
    return (x - $Math.floor(x / hi) * hi) + lo;
}