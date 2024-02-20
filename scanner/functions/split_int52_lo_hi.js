function split_int52_lo_hi(i) {
    let lo = i | 0
    if (lo < 0) lo += 4294967296

    let hi = i - lo
    hi /= 4294967296

    if ((hi < 0) || (hi >= 1048576)) throw new Error ("not an int52: "+i)

    return [ lo, hi ]
}