function parseJSXMemberExpression() {
        var marker = markerCreate(),
            expr = parseJSXIdentifier();

        while (match('.')) {
            lex();
            expr = markerApply(marker, delegate.createJSXMemberExpression(expr, parseJSXIdentifier()));
        }

        return expr;
    }