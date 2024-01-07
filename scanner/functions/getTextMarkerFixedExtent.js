function getTextMarkerFixedExtent(out, symbol, textDesc) {
    const size = textDesc['size'];
    const alignPoint = getAlignPoint(size, symbol['textHorizontalAlignment'], symbol['textVerticalAlignment']);
    // if (symbol['textHaloRadius']) {
    //     const r = symbol['textHaloRadius'];
    //     size = size.add(r * 2, r * 2);
    // }
    const textHaloRadius = (symbol.textHaloRadius || 0);
    const extent = getFixedExtent(out, symbol['textDx'] || 0, symbol['textDy'] || 0, getMarkerRotation(symbol, 'textRotation'),
        alignPoint, size.width, size.height);
    extent.xmin -= textHaloRadius;
    extent.xmax += textHaloRadius;
    extent.ymin -= textHaloRadius;
    extent.ymax += textHaloRadius;
    return extent;
}