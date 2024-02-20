function fuzzyCompare(p1, p2) {
    return Math.abs(p1 - p2) <= (0.000000000001 * Math.min(Math.abs(p1), Math.abs(p2)));
}