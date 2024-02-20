function getContainingModuleSymbol(importer, checker) {
            return checker.getMergedSymbol(getSourceFileLikeForImportDeclaration(importer).symbol);
        }