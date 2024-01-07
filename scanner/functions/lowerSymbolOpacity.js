function lowerSymbolOpacity(symbol, ratio) {
    function s(_symbol, _ratio) {
        const op = _symbol['opacity'];
        if (isNil(op)) {
            _symbol['opacity'] = _ratio;
        } else {
            _symbol['opacity'] *= _ratio;
        }
    }
    let lower;
    if (Array.isArray(symbol)) {
        lower = [];
        for (let i = 0; i < symbol.length; i++) {
            const d = extend({}, symbol[i]);
            s(d, ratio);
            lower.push(d);
        }
    } else {
        lower = extend({}, symbol);
        s(lower, ratio);
    }
    return lower;
}