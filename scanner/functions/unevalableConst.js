function unevalableConst(code) {
    var token = definitions.tokens[code];
    var constName = definitions.opTypeNames.hasOwnProperty(token)
        ? definitions.opTypeNames[token]
        : token in definitions.keywords
        ? token.toUpperCase()
        : token;
    return { toSource: function() { return constName } };
}