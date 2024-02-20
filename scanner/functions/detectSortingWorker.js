function detectSortingWorker(importGroups, preferences) {
            const collateCaseSensitive = getOrganizeImportsComparer(preferences, 
            /*ignoreCase*/
            false);
            const collateCaseInsensitive = getOrganizeImportsComparer(preferences, 
            /*ignoreCase*/
            true);
            let sortState = 3 /* Both */;
            let seenUnsortedGroup = false;
            for (const importGroup of importGroups) {
                if (importGroup.length > 1) {
                    const moduleSpecifierSort = detectSortCaseSensitivity(importGroup, (i) => {
                        var _a2, _b;
                        return (_b = (_a2 = tryCast(i.moduleSpecifier, isStringLiteral)) == null ? void 0 : _a2.text) != null ? _b : "";
                    }, collateCaseSensitive, collateCaseInsensitive);
                    if (moduleSpecifierSort) {
                        sortState &= moduleSpecifierSort;
                        seenUnsortedGroup = true;
                    }
                    if (!sortState) {
                        return sortState;
                    }
                }
                const declarationWithNamedImports = find(importGroup, (i) => {
                    var _a2, _b;
                    return ((_b = tryCast((_a2 = i.importClause) == null ? void 0 : _a2.namedBindings, isNamedImports)) == null ? void 0 : _b.elements.length) > 1;
                });
                if (declarationWithNamedImports) {
                    const namedImportSort = detectImportSpecifierSorting(declarationWithNamedImports.importClause.namedBindings.elements, preferences);
                    if (namedImportSort) {
                        sortState &= namedImportSort;
                        seenUnsortedGroup = true;
                    }
                    if (!sortState) {
                        return sortState;
                    }
                }
                if (sortState !== 3 /* Both */) {
                    return sortState;
                }
            }
            return seenUnsortedGroup ? 0 /* None */ : sortState;
        }