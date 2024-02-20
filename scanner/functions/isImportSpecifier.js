function isImportSpecifier(node) {
        return node.kind === ts.SyntaxKind.ImportSpecifier;
    }