function isExportDeclaration(node) {
        return node.kind === ts.SyntaxKind.ExportDeclaration;
    }