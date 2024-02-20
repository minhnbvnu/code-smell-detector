function isImportTypeNode(node) {
        return node.kind === ts.SyntaxKind.ImportType;
    }