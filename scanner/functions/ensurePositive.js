function ensurePositive(value) {
    return ("number" === typeof value) ? Math.max(0, value) : 0;
}