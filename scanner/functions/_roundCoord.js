function _roundCoord(n, fractionDigits=3) {
    if (n % 1 === 0) return n;
    return n.toFixed(fractionDigits);
}