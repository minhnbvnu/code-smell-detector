function isParameterDeclaration(node) {
        return node.kind === ts.SyntaxKind.Parameter;
    }