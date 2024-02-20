function u_h_Bt(t, e) {
    return e = e || 0,
        readInt32BE.call(t.slice(e, e + 8), 4, 8)
}