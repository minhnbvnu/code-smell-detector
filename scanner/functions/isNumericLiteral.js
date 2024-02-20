function isNumericLiteral(node) {
        return node.kind === ts.SyntaxKind.NumericLiteral;
    }