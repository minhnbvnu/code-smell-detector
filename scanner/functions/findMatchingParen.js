function findMatchingParen(str, i, direction, open = '(', close = ')') {
    i += direction;
    for (let stack = 1; stack > 0; i += direction) {
        switch (str[i]) {
        case open: stack += direction; break;
        case close: stack -= direction; break;
        }
        if (i === str.length || i === -1) {
            throw 'Missing matching parenthesis';
        }
    } // for
    
    return i;
}