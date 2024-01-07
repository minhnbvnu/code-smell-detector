function isTextSymbol(symbol) {
    if (!symbol) {
        return false;
    }
    if (!isNil(symbol['textName'])) {
        return true;
    }
    return false;
}