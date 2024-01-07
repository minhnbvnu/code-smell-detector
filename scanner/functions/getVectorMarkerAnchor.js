function getVectorMarkerAnchor(symbol, w, h) {
    const padding = getVectorPadding();
    const shadow = 2 * (symbol['shadowBlur'] || 0),
        margin = shadow + padding;
    TEMP_SIZE.width = w;
    TEMP_SIZE.height = h;
    const markerType = symbol['markerType'];
    const p = getAlignPoint(TEMP_SIZE, symbol['markerHorizontalAlignment'] || getDefaultHAlign(markerType), symbol['markerVerticalAlignment'] || getDefaultVAlign(markerType));
    if (p.x !== -w / 2) {
        p.x -= sign(p.x + w / 2) * margin;
    }
    if (p.y !== -h / 2) {
        p.y -= sign(p.y + h / 2) * margin;
    }
    return p;
}