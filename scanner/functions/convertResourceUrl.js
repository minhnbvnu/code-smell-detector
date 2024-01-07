function convertResourceUrl(symbol) {
    if (!symbol) {
        return null;
    }

    const s = symbol;
    if (IS_NODE) {
        return s;
    }
    const props = RESOURCE_PROPERTIES;
    let res;
    for (let ii = 0, len = props.length; ii < len; ii++) {
        res = s[props[ii]];
        if (!res) {
            continue;
        }
        s[props[ii]] = _convertUrl(res);
    }
    return s;
}