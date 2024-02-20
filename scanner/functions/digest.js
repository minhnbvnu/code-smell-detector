function digest(kkk) {  // 90
    var a = i_i  // 这些加密数据有用
        , s = a("11400714785074694791")
        , u = a("14029467366897019727")
        , c = a("1609587929392839161")
        , f = a("9650029242287828579")
        , l = a("2870177450012600261");

    var t, e, r = kkk.memory, n = "string" == typeof r, o = 0, i = kkk.memsize, h = new i_i;
    for (kkk.total_len >= 32 ? (t = kkk.v1.clone().rotl(1),
        t.add(kkk.v2.clone().rotl(7)),
        t.add(kkk.v3.clone().rotl(12)),
        t.add(kkk.v4.clone().rotl(18)),
        t.xor(kkk.v1.multiply(u).rotl(31).multiply(s)),
        t.multiply(s).add(f),
        t.xor(kkk.v2.multiply(u).rotl(31).multiply(s)),
        t.multiply(s).add(f),
        t.xor(kkk.v3.multiply(u).rotl(31).multiply(s)),
        t.multiply(s).add(f),
        t.xor(kkk.v4.multiply(u).rotl(31).multiply(s)),
        t.multiply(s).add(f)) : t = add(kkk.seed.clone(), l),
             add(t, s_this(kkk.total_len, h)); o <= i - 8; )
        n ? a_a.call(h, r.charCodeAt(o + 1) << 8 | r.charCodeAt(o), r.charCodeAt(o + 3) << 8 | r.charCodeAt(o + 2), r.charCodeAt(o + 5) << 8 | r.charCodeAt(o + 4), r.charCodeAt(o + 7) << 8 | r.charCodeAt(o + 6)): a_a.call(h, r[o + 1] << 8 | r[o], r[o + 3] << 8 | r[o + 2], r[o + 5] << 8 | r[o + 4], r[o + 7] << 8 | r[o + 6]),
            multiply(rotl.call(multiply(h, u),31), s),
            add(multiply(rotl.call(xor.call(t,h),27), s),f),
            o += 8;
    for (o + 4 <= i && (n ? h.fromBits(r.charCodeAt(o + 1) << 8 | r.charCodeAt(o), r.charCodeAt(o + 3) << 8 | r.charCodeAt(o + 2), 0, 0) : h.fromBits(r[o + 1] << 8 | r[o], r[o + 3] << 8 | r[o + 2], 0, 0),
        t.xor(multiply(h, s)).rotl(23).multiply(u).add(c),
        o += 4); o < i; )
        h.fromBits(n ? r.charCodeAt(o++) : r[o++], 0, 0, 0),
            t.xor(h.multiply(l)).rotl(11).multiply(s);
    return e = shiftRight.call(clone.call(t), 33),
        multiply(xor.call(t, e), u),
        e = shiftRight.call(clone.call(t), 29),
        multiply(xor.call(t, e), c),
        e = shiftRight.call(clone.call(t), 32),
        xor.call(t, e),
        i_this.call(kkk, kkk.seed),
        t
}