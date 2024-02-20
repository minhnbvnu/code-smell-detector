function promoteFromTypeOnly(changes, aliasDeclaration, compilerOptions, sourceFile, preferences) {
            const convertExistingToTypeOnly = importNameElisionDisabled(compilerOptions);
            switch (aliasDeclaration.kind) {
                case 273 /* ImportSpecifier */:
                    if (aliasDeclaration.isTypeOnly) {
                        const sortKind = ts_OrganizeImports_exports.detectImportSpecifierSorting(aliasDeclaration.parent.elements, preferences);
                        if (aliasDeclaration.parent.elements.length > 1 && sortKind) {
                            changes.delete(sourceFile, aliasDeclaration);
                            const newSpecifier = factory.updateImportSpecifier(aliasDeclaration, 
                            /*isTypeOnly*/
                            false, aliasDeclaration.propertyName, aliasDeclaration.name);
                            const comparer = ts_OrganizeImports_exports.getOrganizeImportsComparer(preferences, sortKind === 2 /* CaseInsensitive */);
                            const insertionIndex = ts_OrganizeImports_exports.getImportSpecifierInsertionIndex(aliasDeclaration.parent.elements, newSpecifier, comparer);
                            changes.insertImportSpecifierAtIndex(sourceFile, newSpecifier, aliasDeclaration.parent, insertionIndex);
                        }
                        else {
                            changes.deleteRange(sourceFile, aliasDeclaration.getFirstToken());
                        }
                        return aliasDeclaration;
                    }
                    else {
                        Debug.assert(aliasDeclaration.parent.parent.isTypeOnly);
                        promoteImportClause(aliasDeclaration.parent.parent);
                        return aliasDeclaration.parent.parent;
                    }
                case 270 /* ImportClause */:
                    promoteImportClause(aliasDeclaration);
                    return aliasDeclaration;
                case 271 /* NamespaceImport */:
                    promoteImportClause(aliasDeclaration.parent);
                    return aliasDeclaration.parent;
                case 268 /* ImportEqualsDeclaration */:
                    changes.deleteRange(sourceFile, aliasDeclaration.getChildAt(1));
                    return aliasDeclaration;
                default:
                    Debug.failBadSyntaxKind(aliasDeclaration);
            }
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
        }