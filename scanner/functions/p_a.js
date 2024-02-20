function p_a(t, e) {
    if (true) {
        var r = 0 | e.length;
        return t = o_19(t, r),
            0 === t.length ? t : (a_68_copy(e, t, 0, 0, r),
                t)
    }
    if (e) {
        if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length"in e)
            return "number" != typeof e.length || G(e.length) ? o(t, 0) : l(t, e);
        if ("Buffer" === e.type && J(e.data))
            return l(t, e.data)
    }
    throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
}