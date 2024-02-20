function matchColorDistance(r1, g1, b1, r2, g2, b2) {
    return Math.pow(30 * (r1 - r2), 2)
        + Math.pow(59 * (g1 - g2), 2)
        + Math.pow(11 * (b1 - b2), 2);
}