function r_decrypt(e) {
    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "hjasbdn2ih823rgwudsde7e2dhsdhas";
    "string" == typeof r && (r = [].map.call(r, function(t) {
        return t.charCodeAt(0)
    }));
    for (var n, o = [], i = 0, a = new i_update(e.length), s = 0; s < 256; s++)
        o[s] = s;
    for (s = 0; s < 256; s++)
        i = (i + o[s] + r[s % r.length]) % 256,
            n = o[s],
            o[s] = o[i],
            o[i] = n;
    s = 0,
        i = 0;
    for (var u = 0; u < e.length; u++)
        s = (s + 1) % 256,
            i = (i + o[s]) % 256,
            n = o[s],
            o[s] = o[i],
            o[i] = n,
            a[u] = e[u] ^ o[(o[s] + o[i]) % 256];
    return a
}