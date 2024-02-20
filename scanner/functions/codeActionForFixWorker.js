function codeActionForFixWorker(changes, sourceFile, symbolName2, fix, includeSymbolNameInDescription, compilerOptions, preferences) {
            const quotePreference = getQuotePreference(sourceFile, preferences);
            switch (fix.kind) {
                case 0 /* UseNamespace */:
                    addNamespaceQualifier(changes, sourceFile, fix);
                    return [Diagnostics.Change_0_to_1, symbolName2, `${fix.namespacePrefix}.${symbolName2}`];
                case 1 /* JsdocTypeImport */:
                    addImportType(changes, sourceFile, fix, quotePreference);
                    return [Diagnostics.Change_0_to_1, symbolName2, getImportTypePrefix(fix.moduleSpecifier, quotePreference) + symbolName2];
                case 2 /* AddToExisting */: {
                    const { importClauseOrBindingPattern, importKind, addAsTypeOnly, moduleSpecifier } = fix;
                    doAddExistingFix(changes, sourceFile, importClauseOrBindingPattern, importKind === 1 /* Default */ ? { name: symbolName2, addAsTypeOnly } : void 0, importKind === 0 /* Named */ ? [{ name: symbolName2, addAsTypeOnly }] : emptyArray, compilerOptions, preferences);
                    const moduleSpecifierWithoutQuotes = stripQuotes(moduleSpecifier);
                    return includeSymbolNameInDescription ? [Diagnostics.Import_0_from_1, symbolName2, moduleSpecifierWithoutQuotes] : [Diagnostics.Update_import_from_0, moduleSpecifierWithoutQuotes];
                }
                case 3 /* AddNew */: {
                    const { importKind, moduleSpecifier, addAsTypeOnly, useRequire, qualification } = fix;
                    const getDeclarations = useRequire ? getNewRequires : getNewImports;
                    const defaultImport = importKind === 1 /* Default */ ? { name: symbolName2, addAsTypeOnly } : void 0;
                    const namedImports = importKind === 0 /* Named */ ? [{ name: symbolName2, addAsTypeOnly }] : void 0;
                    const namespaceLikeImport = importKind === 2 /* Namespace */ || importKind === 3 /* CommonJS */ ? { importKind, name: (qualification == null ? void 0 : qualification.namespacePrefix) || symbolName2, addAsTypeOnly } : void 0;
                    insertImports(changes, sourceFile, getDeclarations(moduleSpecifier, quotePreference, defaultImport, namedImports, namespaceLikeImport, compilerOptions), 
                    /*blankLineBetween*/
                    true, preferences);
                    if (qualification) {
                        addNamespaceQualifier(changes, sourceFile, qualification);
                    }
                    return includeSymbolNameInDescription ? [Diagnostics.Import_0_from_1, symbolName2, moduleSpecifier] : [Diagnostics.Add_import_from_0, moduleSpecifier];
                }
                case 4 /* PromoteTypeOnly */: {
                    const { typeOnlyAliasDeclaration } = fix;
                    const promotedDeclaration = promoteFromTypeOnly(changes, typeOnlyAliasDeclaration, compilerOptions, sourceFile, preferences);
                    return promotedDeclaration.kind === 273 /* ImportSpecifier */ ? [Diagnostics.Remove_type_from_import_of_0_from_1, symbolName2, getModuleSpecifierText(promotedDeclaration.parent.parent)] : [Diagnostics.Remove_type_from_import_declaration_from_0, getModuleSpecifierText(promotedDeclaration)];
                }
                default:
                    return Debug.assertNever(fix, `Unexpected fix kind ${fix.kind}`);
            }
        }