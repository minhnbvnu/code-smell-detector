function isVariableStatement(node) {
        return node.kind === ts.SyntaxKind.VariableStatement;
    }