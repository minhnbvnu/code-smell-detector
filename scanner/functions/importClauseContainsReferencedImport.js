function importClauseContainsReferencedImport(importClause) {
                return forEachImportClauseDeclaration(importClause, (declaration) => {
                    return !!getSymbolOfDeclaration(declaration).isReferenced;
                });
            }