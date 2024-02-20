function importFromModuleSpecifier(node) {
            return tryGetImportFromModuleSpecifier(node) || Debug.failBadSyntaxKind(node.parent);
        }