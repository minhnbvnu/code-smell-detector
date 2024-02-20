function getSearchesFromDirectImports(directImports, exportSymbol, exportKind, checker, isForRename) {
            const importSearches = [];
            const singleReferences = [];
            function addSearch(location, symbol) {
                importSearches.push([location, symbol]);
            }
            if (directImports) {
                for (const decl of directImports) {
                    handleImport(decl);
                }
            }
            return { importSearches, singleReferences };
            function handleImport(decl) {
                if (decl.kind === 268 /* ImportEqualsDeclaration */) {
                    if (isExternalModuleImportEquals(decl)) {
                        handleNamespaceImportLike(decl.name);
                    }
                    return;
                }
                if (decl.kind === 79 /* Identifier */) {
                    handleNamespaceImportLike(decl);
                    return;
                }
                if (decl.kind === 202 /* ImportType */) {
                    if (decl.qualifier) {
                        const firstIdentifier = getFirstIdentifier(decl.qualifier);
                        if (firstIdentifier.escapedText === symbolName(exportSymbol)) {
                            singleReferences.push(firstIdentifier);
                        }
                    }
                    else if (exportKind === 2 /* ExportEquals */) {
                        singleReferences.push(decl.argument.literal);
                    }
                    return;
                }
                if (decl.moduleSpecifier.kind !== 10 /* StringLiteral */) {
                    return;
                }
                if (decl.kind === 275 /* ExportDeclaration */) {
                    if (decl.exportClause && isNamedExports(decl.exportClause)) {
                        searchForNamedImport(decl.exportClause);
                    }
                    return;
                }
                const { name, namedBindings } = decl.importClause || { name: void 0, namedBindings: void 0 };
                if (namedBindings) {
                    switch (namedBindings.kind) {
                        case 271 /* NamespaceImport */:
                            handleNamespaceImportLike(namedBindings.name);
                            break;
                        case 272 /* NamedImports */:
                            if (exportKind === 0 /* Named */ || exportKind === 1 /* Default */) {
                                searchForNamedImport(namedBindings);
                            }
                            break;
                        default:
                            Debug.assertNever(namedBindings);
                    }
                }
                if (name && (exportKind === 1 /* Default */ || exportKind === 2 /* ExportEquals */) && (!isForRename || name.escapedText === symbolEscapedNameNoDefault(exportSymbol))) {
                    const defaultImportAlias = checker.getSymbolAtLocation(name);
                    addSearch(name, defaultImportAlias);
                }
            }
            function handleNamespaceImportLike(importName) {
                if (exportKind === 2 /* ExportEquals */ && (!isForRename || isNameMatch(importName.escapedText))) {
                    addSearch(importName, checker.getSymbolAtLocation(importName));
                }
            }
            function searchForNamedImport(namedBindings) {
                if (!namedBindings) {
                    return;
                }
                for (const element of namedBindings.elements) {
                    const { name, propertyName } = element;
                    if (!isNameMatch((propertyName || name).escapedText)) {
                        continue;
                    }
                    if (propertyName) {
                        singleReferences.push(propertyName);
                        if (!isForRename || name.escapedText === exportSymbol.escapedName) {
                            addSearch(name, checker.getSymbolAtLocation(name));
                        }
                    }
                    else {
                        const localSymbol = element.kind === 278 /* ExportSpecifier */ && element.propertyName ? checker.getExportSpecifierLocalTargetSymbol(element) : checker.getSymbolAtLocation(name);
                        addSearch(name, localSymbol);
                    }
                }
            }
            function isNameMatch(name) {
                return name === exportSymbol.escapedName || exportKind !== 0 /* Named */ && name === "default" /* Default */;
            }
        }