function isConstructorDeclaration(node) {
        return node.kind === ts.SyntaxKind.Constructor;
    }