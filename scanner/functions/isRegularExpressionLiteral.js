function isRegularExpressionLiteral(node) {
        return node.kind === ts.SyntaxKind.RegularExpressionLiteral;
    }