function a_g_Bt(t, e, r, n) {
    if ("number" == typeof e)
        throw new TypeError('"value" argument must not be a number');
    return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? h(t, e, r, n) : "string" == typeof e ? f(t, e, r) : p_a(t, e)
}