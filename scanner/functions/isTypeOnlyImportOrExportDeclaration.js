function isTypeOnlyImportOrExportDeclaration(node) {
            return isTypeOnlyImportDeclaration(node) || isTypeOnlyExportDeclaration(node);
        }