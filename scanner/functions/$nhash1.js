function $nhash1(x) {
    x %= 6.28318531;

    let s = 1.27323954 * x;
    const k = 0.405284735 * x * x;
    if (x < 0) s += k; else s -= k;

    // At this point, s is a fast, bad approximation of sin(x)

    /*
    // Correction factor (if we wanted more precision; costs another 10%)
    const c = 0.225 * (s * s + s);
    if (s < 0) s -= c; else s += c;
    */

    // At this point, s is a fast, good approximation of sin(x)

    // Extract the lower decimal places, which are approximately
    // uniformly distributed and on the range [0, 1)
    s *= 1e4;
    return s - $Math.floor(s);
}