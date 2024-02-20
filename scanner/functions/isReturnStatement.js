function isReturnStatement(node) {
        return node.kind === ts.SyntaxKind.ReturnStatement;
    }