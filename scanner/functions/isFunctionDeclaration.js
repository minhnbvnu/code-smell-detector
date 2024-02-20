function isFunctionDeclaration(node) {
        return node.kind === ts.SyntaxKind.FunctionDeclaration;
    }