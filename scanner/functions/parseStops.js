function parseStops(value, replacer) {
    const defaultValue = value['default'];
    if (isString(defaultValue)) {
        value['default'] = defaultValue.replace(URL_PATTERN, replacer);
    }
    const stops = value.stops;
    if (!stops) {
        return value;
    }
    for (let i = 0; i < stops.length; i++) {
        if (!Array.isArray(stops[i])) {
            continue;
        }
        if (isString(stops[i][1])) {
            stops[i][1] = stops[i][1].replace(URL_PATTERN, replacer);
        } else if (isFunctionDefinition(stops[i][1])) {
            stops[i][1] = parseStops(stops[i][1], replacer);
        }
    }
    return value;
}