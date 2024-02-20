function readIntBE(t, e, r) {
    t |= 0,
        e |= 0,
    r || undefined;
    for (var n = e, o = 1, i = this[t + --n]; n > 0 && (o *= 256); )
        i += this[t + --n] * o;
    return o *= 128,
    i >= o && (i -= Math.pow(2, 8 * e)),
        i
}