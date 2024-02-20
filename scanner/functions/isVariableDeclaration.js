function isVariableDeclaration(node) {
        return node.kind === ts.SyntaxKind.VariableDeclaration;
    }