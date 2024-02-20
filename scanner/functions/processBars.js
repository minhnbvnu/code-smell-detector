function processBars(src, sym, fcn) {
    // Absolute value
    var i = src.indexOf(sym);
    while (i >= 0) {
        let j = nextInstance(src, sym, i + 1);
        if (j === -1) { throw makeError("Unbalanced " + sym + "..." + sym, 0); }
        src = src.substring(0, i) + ' ' + fcn + '(' + src.substring(i + 1, j) + ') ' + src.substring(j + 1);

        // See if there are more instances
        i = src.indexOf(sym);
    }
    return src;
}