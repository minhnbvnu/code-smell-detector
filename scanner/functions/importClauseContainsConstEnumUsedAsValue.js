function importClauseContainsConstEnumUsedAsValue(importClause) {
                return forEachImportClauseDeclaration(importClause, (declaration) => {
                    return !!getSymbolLinks(getSymbolOfDeclaration(declaration)).constEnumReferenced;
                });
            }