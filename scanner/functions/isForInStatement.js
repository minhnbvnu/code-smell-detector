function isForInStatement(node) {
        return node.kind === ts.SyntaxKind.ForInStatement;
    }