function getExportNeedsImportStarHelper(node) {
            return !!getNamespaceDeclarationNode(node);
        }