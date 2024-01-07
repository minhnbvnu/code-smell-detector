function isVectorSymbol(symbol) {
    if (!symbol) {
        return false;
    }
    if (isNil(symbol['markerFile']) && !isNil(symbol['markerType']) && (symbol['markerType'] !== 'path')) {
        return true;
    }
    return false;
}