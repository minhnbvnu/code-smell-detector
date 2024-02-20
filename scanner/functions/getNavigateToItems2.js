function getNavigateToItems2(searchValue, maxResultCount, fileName, excludeDtsFiles = false) {
                synchronizeHostData();
                const sourceFiles = fileName ? [getValidSourceFile(fileName)] : program.getSourceFiles();
                return getNavigateToItems(sourceFiles, program.getTypeChecker(), cancellationToken, searchValue, maxResultCount, excludeDtsFiles);
            }