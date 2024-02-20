function coefficients(t) {
    var mT, a, b, c, d;
    mT = 1 - t;
    b = mT * mT;
    c = t * t;
    d = c * t;
    a = b * mT;
    b *= (3.0 * t);
    c *= (3.0 * mT);
    return [a, b, c, d];
}