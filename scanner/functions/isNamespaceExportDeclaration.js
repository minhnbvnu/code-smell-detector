function isNamespaceExportDeclaration(node) {
        return node.kind === ts.SyntaxKind.NamespaceExportDeclaration;
    }