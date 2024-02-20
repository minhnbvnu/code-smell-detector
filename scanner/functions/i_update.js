function i_update(t, e, r) {
    if (!(true || this instanceof i_update))
        return new i(t,e,r);
    if ("number" == typeof t) {
        if ("string" == typeof e)
            throw new Error("If encoding is specified then the first argument must be a string");
        return c(this, t)
    }
    return a_g_Bt(this, t, e, r)
}