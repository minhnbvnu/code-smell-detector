function isExportAssignment(node) {
        return node.kind === ts.SyntaxKind.ExportAssignment;
    }