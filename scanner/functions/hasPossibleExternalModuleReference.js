function hasPossibleExternalModuleReference(node) {
            return isAnyImportOrReExport(node) || isModuleDeclaration(node) || isImportTypeNode(node) || isImportCall(node);
        }