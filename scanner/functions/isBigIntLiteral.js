function isBigIntLiteral(node) {
        return node.kind === ts.SyntaxKind.BigIntLiteral;
    }