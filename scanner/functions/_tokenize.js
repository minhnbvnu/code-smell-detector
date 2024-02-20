function _tokenize(text) {
    let tokens = seq(text.toLowerCase().split(/\s/)).
        flatMap(part => seq(part).
            segmentBy(e => {
                if (e.trim() === '') {
                    return " ";
                }
                if (e.match(/[\.0-9]/)) {
                    return "#";
                }
                if (e.match(/[_a-z]/)) {
                    return "a";
                }
                return NaN; // Always split.
            }).
            map(e => e.join(''))).
        filter(e => e.trim() !== '').
        toArray();

    return _mergeScientificFloatTokens(tokens);
}