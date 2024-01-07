function calVectorMarkerSize(out, symbol) {
    const padding = getVectorPadding(symbol);
    const width = getValueOrDefault(symbol['markerWidth'], DEFAULT_MARKER_SYMBOLS.markerWidth);
    const height = getValueOrDefault(symbol['markerHeight'], DEFAULT_MARKER_SYMBOLS.markerHeight);
    const lineWidth = getValueOrDefault(symbol['markerLineWidth'], DEFAULT_MARKER_SYMBOLS.markerLineWidth),
        shadow = 2 * ((symbol['shadowBlur'] || 0) + Math.max(Math.abs(symbol['shadowOffsetX'] || 0) + Math.abs(symbol['shadowOffsetY'] || 0))), // add some tolerance for shadowOffsetX/Y
        w = Math.round(width + lineWidth + shadow + padding * 2),
        h = Math.round(height + lineWidth + shadow + padding * 2);
    out[0] = w;
    out[1] = h;
    return out;
}