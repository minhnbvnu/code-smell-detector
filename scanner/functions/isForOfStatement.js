function isForOfStatement(node) {
        return node.kind === ts.SyntaxKind.ForOfStatement;
    }