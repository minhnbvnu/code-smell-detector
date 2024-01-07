function translateMarkerLineAndFill(s) {
    const result = {
        'lineColor': s['markerLineColor'],
        'linePatternFile': s['markerLinePatternFile'],
        'lineWidth': s['markerLineWidth'],
        'lineOpacity': s['markerLineOpacity'],
        'lineDasharray': s['markerLineDasharray'],
        'lineCap': 'butt',
        'lineJoin': 'round',
        'polygonFill': s['markerFill'],
        'polygonPatternFile': s['markerFillPatternFile'],
        'polygonOpacity': s['markerFillOpacity']
    };
    if (result['lineWidth'] === 0) {
        result['lineOpacity'] = 0;
    }
    return result;
}