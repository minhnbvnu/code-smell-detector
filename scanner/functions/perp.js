function perp(v) {
    if (Array.isArray(v)) {
        return [-v[1], v[0]];
    } else {
        return xy(-v.y, v.x);
    }
}