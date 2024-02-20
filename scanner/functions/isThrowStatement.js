function isThrowStatement(node) {
        return node.kind === ts.SyntaxKind.ThrowStatement;
    }