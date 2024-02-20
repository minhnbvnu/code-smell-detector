function parseJSXChild() {
        var token, marker;
        if (match('{')) {
            token = parseJSXExpressionContainer();
        } else if (lookahead.type === Token.JSXText) {
            marker = markerCreatePreserveWhitespace();
            token = markerApply(marker, delegate.createLiteral(lex()));
        } else if (match('<')) {
            token = parseJSXElement();
        } else {
            throwUnexpected(lookahead);
        }
        return token;
    }