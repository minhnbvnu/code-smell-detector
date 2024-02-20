function isAccessorDeclaration(node) {
        return node.kind === ts.SyntaxKind.GetAccessor ||
            node.kind === ts.SyntaxKind.SetAccessor;
    }