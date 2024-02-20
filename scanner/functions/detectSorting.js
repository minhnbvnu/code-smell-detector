function detectSorting(sourceFile, preferences) {
            return detectSortingWorker(groupImportsByNewlineContiguous(sourceFile, sourceFile.statements.filter(isImportDeclaration)), preferences);
        }