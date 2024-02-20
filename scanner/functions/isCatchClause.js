function isCatchClause(node) {
        return node.kind === ts.SyntaxKind.CatchClause;
    }