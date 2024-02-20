function isDebuggerStatement(node) {
        return node.kind === ts.SyntaxKind.DebuggerStatement;
    }