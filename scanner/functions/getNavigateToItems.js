function getNavigateToItems(sourceFiles, checker, cancellationToken, searchValue, maxResultCount, excludeDtsFiles) {
            const patternMatcher = createPatternMatcher(searchValue);
            if (!patternMatcher)
                return emptyArray;
            const rawItems = [];
            for (const sourceFile of sourceFiles) {
                cancellationToken.throwIfCancellationRequested();
                if (excludeDtsFiles && sourceFile.isDeclarationFile) {
                    continue;
                }
                sourceFile.getNamedDeclarations().forEach((declarations, name) => {
                    getItemsFromNamedDeclaration(patternMatcher, name, declarations, checker, sourceFile.fileName, rawItems);
                });
            }
            rawItems.sort(compareNavigateToItems);
            return (maxResultCount === void 0 ? rawItems : rawItems.slice(0, maxResultCount)).map(createNavigateToItem);
        }