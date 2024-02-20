function includePrivateSymbol(symbol) {
                        if (some(symbol.declarations, isParameterDeclaration))
                            return;
                        Debug.assertIsDefined(deferredPrivatesStack[deferredPrivatesStack.length - 1]);
                        getUnusedName(unescapeLeadingUnderscores(symbol.escapedName), symbol);
                        const isExternalImportAlias = !!(symbol.flags & 2097152 /* Alias */) && !some(symbol.declarations, (d) => !!findAncestor(d, isExportDeclaration) || isNamespaceExport(d) || isImportEqualsDeclaration(d) && !isExternalModuleReference(d.moduleReference));
                        deferredPrivatesStack[isExternalImportAlias ? 0 : deferredPrivatesStack.length - 1].set(getSymbolId(symbol), symbol);
                    }