function isTypeParameterDeclaration(node) {
        return node.kind === ts.SyntaxKind.TypeParameter;
    }