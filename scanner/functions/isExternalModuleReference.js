function isExternalModuleReference(node) {
        return node.kind === ts.SyntaxKind.ExternalModuleReference;
    }