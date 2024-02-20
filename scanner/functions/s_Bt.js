function s_Bt(t, e) {
    return readUInt32BE.call(a_slice(t, e, e + 8), 4, 8)
}