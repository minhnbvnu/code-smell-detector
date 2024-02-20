function i_u(t, e) {
    e = e || 10,
        this._a00 = 0,
        this._a16 = 0,
        this._a32 = 0,
        this._a48 = 0;
    for (var r = c[e] || new i_i(Math.pow(e, 5)), n = 0, o = t.length; n < o; n += 5) {
        var a = Math.min(5, o - n)
            , s = parseInt(t.slice(n, n + a), e);
        add(multiply(this, a < 5 ? new i_i(Math.pow(e, a)) : r), new i_i(s))
    }
    return this
}