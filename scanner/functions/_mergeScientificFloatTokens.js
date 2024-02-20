function _mergeScientificFloatTokens(tokens) {
    tokens = [...tokens];
    for (let i = tokens.indexOf('e', 1); i !== -1; i = tokens.indexOf('e', i + 1)) {
        let s = i - 1;
        let e = i + 1;
        if (!tokens[s].match(/[0-9]/)) {
            continue;
        }
        if ((tokens[e] + '').match(/[+-]/)) {
            e += 1;
        }

        if ((tokens[e] + '').match(/[0-9]/)) {
            e += 1;
            tokens.splice(s, e - s, tokens.slice(s, e).join(''));
            i -= 1;
        }
    }
    return tokens;
}