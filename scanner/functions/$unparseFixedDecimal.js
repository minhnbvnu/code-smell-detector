function $unparseFixedDecimal(n, d) {
    const k = 10**d;
    n = $Math.round((n + Number.EPSILON) * k) / k
    return n.toFixed(d).replace(/\.?0*$/, '')
}