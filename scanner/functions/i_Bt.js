function i_Bt(t, e) {
    e = e || 0;
    for (var r = 0, n = e; n < t.length; n++)
        r <<= 8,
            r |= 255 & t[n];
    return r
}