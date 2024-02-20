function isBreakStatement(node) {
        return node.kind === ts.SyntaxKind.BreakStatement;
    }