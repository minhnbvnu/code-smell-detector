function min_value(a) {
    if (typeof a === 'number') { return a; }
    let s = Infinity;
    for (let key in a) s = $Math.min(s, a[key]);
    return s;
}