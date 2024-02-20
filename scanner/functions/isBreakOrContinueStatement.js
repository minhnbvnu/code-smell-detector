function isBreakOrContinueStatement(node) {
        return node.kind === ts.SyntaxKind.BreakStatement ||
            node.kind === ts.SyntaxKind.ContinueStatement;
    }