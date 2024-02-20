function c_g_Bt(t) {
    for (var e = t.length, r = 0; r < e; r += 2) {
        var n = t[r];
        t[r] = t[r + 1],
            t[r + 1] = n
    }
    return t
}