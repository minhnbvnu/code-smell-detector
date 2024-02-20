function roundToPrecision (num, precision = 16) {
    return Number.parseFloat(num.toPrecision(precision));
}