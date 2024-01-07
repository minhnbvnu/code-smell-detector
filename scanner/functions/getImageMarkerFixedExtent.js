function getImageMarkerFixedExtent(out, symbol, resources) {
    const url = symbol['markerFile'],
        img = resources ? resources.getImage(url) : null;
    const width = symbol['markerWidth'] || (img ? img.width : 0),
        height = symbol['markerHeight'] || (img ? img.height : 0);
    TEMP_SIZE.width = width;
    TEMP_SIZE.height = height;
    const alignPoint = getAlignPoint(TEMP_SIZE, symbol['markerHorizontalAlignment'] || 'middle', symbol['markerVerticalAlignment'] || 'top');
    return getFixedExtent(out, symbol['markerDx'] || 0, symbol['markerDy'] || 0,
        getMarkerRotation(symbol), alignPoint, width, height);
}