function isPathSymbol(symbol) {
    if (!symbol) {
        return false;
    }
    if (isNil(symbol['markerFile']) && symbol['markerType'] === 'path') {
        return true;
    }
    return false;
}