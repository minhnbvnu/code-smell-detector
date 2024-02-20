function isNamespaceImport(node) {
        return node.kind === ts.SyntaxKind.NamespaceImport;
    }