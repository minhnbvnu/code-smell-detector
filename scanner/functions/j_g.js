function j_g(t, e, r) {
    for (var n = a_slice(t, e, r), o = "", i = 0; i < n.length; i += 2)
        o += String.fromCharCode(n[i] + 256 * n[i + 1]);
    return o
}