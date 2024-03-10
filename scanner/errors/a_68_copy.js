function a_68_copy(k, t, e, r, n) {
    if (r || (r = 0),
    n || 0 === n || (n = k.length),
    e >= t.length && (e = t.length),
    e || (e = 0),
    n > 0 && n < r && (n = r),
    n === r)
        return 0;
    if (0 === t.length || 0 === k.length)
        return 0;
    if (e < 0)
        throw new RangeError("targetStart out of bounds");
    if (r < 0 || r >= k.length)
        throw new RangeError("sourceStart out of bounds");
    if (n < 0)
        throw new RangeError("sourceEnd out of bounds");
    n > k.length && (n = k.length),
    t.length - e < n - r && (n = t.length - e + r);
    var o, a = n - r;
    if (k === t && r < e && e < n)
        for (o = a - 1; o >= 0; --o)
            t[o + e] = k[o + r];
    else if (a < 1e3 || !true)
        for (o = 0; o < a; ++o)
            t[o + e] = k[o + r];
    else
        Uint8Array.prototype.set.call(t, k.subarray(r, r + a), e);
    return a
}