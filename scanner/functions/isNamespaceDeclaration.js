function isNamespaceDeclaration(node) {
        return isModuleDeclaration(node) &&
            node.name.kind === ts.SyntaxKind.Identifier &&
            node.body !== undefined &&
            (node.body.kind === ts.SyntaxKind.ModuleBlock ||
                isNamespaceDeclaration(node.body));
    }