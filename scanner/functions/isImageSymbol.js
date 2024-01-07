function isImageSymbol(symbol) {
    if (!symbol) {
        return false;
    }
    if (!isNil(symbol['markerFile'])) {
        return true;
    }
    return false;
}