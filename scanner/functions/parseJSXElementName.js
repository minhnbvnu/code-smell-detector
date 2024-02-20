function parseJSXElementName() {
        if (lookahead2().value === ':') {
            return parseJSXNamespacedName();
        }
        if (lookahead2().value === '.') {
            return parseJSXMemberExpression();
        }

        return parseJSXIdentifier();
    }