function isImportEqualsDeclaration(node) {
        return node.kind === ts.SyntaxKind.ImportEqualsDeclaration;
    }