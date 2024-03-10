function g_to_string(t, e, r) {
    var n = !1;
    if ((void 0 === e || e < 0) && (e = 0),
    e > this.length)
        return "";
    if ((void 0 === r || r > this.length) && (r = this.length),
    r <= 0)
        return "";
    if (r >>>= 0,
        e >>>= 0,
    r <= e)
        return "";
    for (t || (t = "utf8"); ; )
        switch (t) {
            case "hex":
                return N(this, e, r);
            case "utf8":
            case "utf-8":
                return T_g(this, e, r);
            case "ascii":
                return k(this, e, r);
            case "latin1":
            case "binary":
                return R(this, e, r);
            case "base64":
                return O(this, e, r);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return j_g(this, e, r);
            default:
                if (n)
                    throw new TypeError("Unknown encoding: " + t);
                t = (t + "").toLowerCase(),
                    n = !0
        }
}