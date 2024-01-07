function approx(val, expected, delta) {
    if (delta == null) { delta = 1e-6; }
    return val >= expected - delta && val <= expected + delta;
}