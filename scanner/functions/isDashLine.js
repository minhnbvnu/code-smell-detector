function isDashLine(symbolizers = []) {
    if (!Array.isArray(symbolizers)) {
        symbolizers = [symbolizers];
    }
    const len = symbolizers.length;
    for (let i = 0; i < len; i++) {
        const symbolizer = symbolizers[i];
        if (!symbolizer.style) {
            continue;
        }
        const { lineDasharray, lineWidth } = symbolizer.style;
        if (lineWidth && isNumber(lineWidth) && lineWidth > 0 && lineDasharray && Array.isArray(lineDasharray) && lineDasharray.length) {
            return true;
        }
    }
    return false;

}