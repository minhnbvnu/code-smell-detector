function retrievePrecedingIdentifier(text, pos, regex) {
    regex = regex || ID_REGEX;
    var buf = [];
    for (var i = pos-1; i >= 0; i--) {
        if (regex.test(text[i])) {
            buf.push(text[i]);
        } else {
            break;
        }
    }
    return buf.reverse().join('');
}