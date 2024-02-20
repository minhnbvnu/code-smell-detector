function isForInOrOfStatement(node) {
        return node.kind === ts.SyntaxKind.ForOfStatement || node.kind === ts.SyntaxKind.ForInStatement;
    }