function _grad(hash, x, y, z) {
    var h, u, v;
    h = hash & 15;
    u = h < 8 ? x : y;
    v = h < 4 ? y : h === 12 || h === 14 ? x : z;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}