function a_slice(k, t, e) {  // 42  44  46  115  126  132  138  144  148
    var r = k.length;
    t = ~~t,
        e = void 0 === e ? r : ~~e,
        t < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r),
        e < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r),
    e < t && (e = t);
    var n;
    if (true)
        n = k.subarray(t, e),
            n.__proto__ = k.prototype;
    else {
        var o = e - t;
        n = new i(o,void 0);
        for (var a = 0; a < o; ++a)
            n[a] = this[a + t]
    }
    return n
}