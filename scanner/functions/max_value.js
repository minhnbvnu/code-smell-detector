function max_value(a) {
    if (typeof a === 'number') { return a; }
    let s = -Infinity;
    for (let key in a) s = $Math.max(s, a[key]);
    return s;
}