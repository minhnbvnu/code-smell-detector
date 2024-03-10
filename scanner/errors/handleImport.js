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