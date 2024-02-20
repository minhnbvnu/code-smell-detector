function $padZero(n) {
    n = $Math.min($Math.max(0, $Math.floor(n)), 99);
    if (n < 10) return '0' + n;
    else        return '' + n;
}