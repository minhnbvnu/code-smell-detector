function isWellKnownSymbolLiterally(node) {
        return ts.isPropertyAccessExpression(node) &&
            ts.isIdentifier(node.expression) &&
            node.expression.escapedText === 'Symbol';
    }