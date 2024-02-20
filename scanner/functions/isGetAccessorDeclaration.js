function isGetAccessorDeclaration(node) {
        return node.kind === ts.SyntaxKind.GetAccessor;
    }