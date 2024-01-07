function getMarkerFixedExtent(out, symbol, resources, textDesc) {
    const extent = out || new PointExtent();
    if (Array.isArray(symbol)) {
        const symbols = symbol;
        for (let i = 0; i < symbols.length; i++) {
            getMarkerFixedExtent(extent, symbols[i], resources, textDesc[i]);
        }
        return extent;
    }
    if (isTextSymbol(symbol)) {
        extent._combine(getTextMarkerFixedExtent(FIXED_EXTENT, symbol, textDesc));
    }
    if (isImageSymbol(symbol)) {
        extent._combine(getImageMarkerFixedExtent(FIXED_EXTENT, symbol, resources));
    }
    if (isVectorSymbol(symbol)) {
        extent._combine(getVectorMarkerFixedExtent(FIXED_EXTENT, symbol));
    }
    if (isPathSymbol(symbol)) {
        extent._combine(getImageMarkerFixedExtent(FIXED_EXTENT, symbol));
    }
    return extent;
}