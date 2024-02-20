function isAnyImportOrReExport(node) {
            return isAnyImportSyntax(node) || isExportDeclaration(node);
        }