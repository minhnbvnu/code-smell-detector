function isExportSpecifier(node) {
        return node.kind === ts.SyntaxKind.ExportSpecifier;
    }