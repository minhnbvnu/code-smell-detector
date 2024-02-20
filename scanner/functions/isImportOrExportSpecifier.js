function isImportOrExportSpecifier(node) {
            return isImportSpecifier(node) || isExportSpecifier(node);
        }