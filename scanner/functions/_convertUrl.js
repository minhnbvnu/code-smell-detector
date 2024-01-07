function _convertUrl(res) {
    if (isFunctionDefinition(res) && res.stops) {
        const stops = res.stops;
        for (let i = 0; i < stops.length; i++) {
            stops[i][1] = _convertUrl(stops[i][1]);
        }
        return res;
    }
    if (res.slice(0, 4) === 'url(') {
        res = extractCssUrl(res);
    }
    return res;
}