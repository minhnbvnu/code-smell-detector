function isTryStatement(node) {
        return node.kind === ts.SyntaxKind.TryStatement;
    }