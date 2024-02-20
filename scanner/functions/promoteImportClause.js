function promoteImportClause(importClause) {
                changes.delete(sourceFile, getTypeKeywordOfTypeOnlyImport(importClause, sourceFile));
                if (convertExistingToTypeOnly) {
                    const namedImports = tryCast(importClause.namedBindings, isNamedImports);
                    if (namedImports && namedImports.elements.length > 1) {
                        if (ts_OrganizeImports_exports.detectImportSpecifierSorting(namedImports.elements, preferences) && aliasDeclaration.kind === 273 /* ImportSpecifier */ && namedImports.elements.indexOf(aliasDeclaration) !== 0) {
                            changes.delete(sourceFile, aliasDeclaration);
                            changes.insertImportSpecifierAtIndex(sourceFile, aliasDeclaration, namedImports, 0);
                        }
                        for (const element of namedImports.elements) {
                            if (element !== aliasDeclaration && !element.isTypeOnly) {
                                changes.insertModifierBefore(sourceFile, 154 /* TypeKeyword */, element);
                            }
                        }
                    }
                }
            }