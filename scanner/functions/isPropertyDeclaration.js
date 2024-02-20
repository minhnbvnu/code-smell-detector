function isPropertyDeclaration(node) {
        return node.kind === ts.SyntaxKind.PropertyDeclaration;
    }