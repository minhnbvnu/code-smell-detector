function getVectorMarkerFixedExtent(out, symbol, size) {
    // const padding = getVectorPadding(symbol) * 2;
    size = size || calVectorMarkerSize(SIZE, symbol);
    // if (padding) {
    //     size = size.map(d => d - padding);
    // }
    const alignPoint = getVectorMarkerAnchor(symbol, size[0], size[1]);
    return getFixedExtent(out, symbol['markerDx'] || 0, symbol['markerDy'] || 0,
        getMarkerRotation(symbol), alignPoint, size[0], size[1]);
}