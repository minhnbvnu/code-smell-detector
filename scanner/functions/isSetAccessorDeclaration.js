function isSetAccessorDeclaration(node) {
        return node.kind === ts.SyntaxKind.SetAccessor;
    }