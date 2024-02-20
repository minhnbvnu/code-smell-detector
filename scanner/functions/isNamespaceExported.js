function isNamespaceExported(node) {
        return node.parent.kind === ts.SyntaxKind.ModuleDeclaration || util_1.hasModifier(node.modifiers, ts.SyntaxKind.ExportKeyword);
    }