function isNullLiteral(node) {
        return node.kind === ts.SyntaxKind.NullKeyword;
    }