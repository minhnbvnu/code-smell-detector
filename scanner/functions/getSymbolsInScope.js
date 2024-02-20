function getSymbolsInScope(location, meaning) {
                if (location.flags & 33554432 /* InWithStatement */) {
                    return [];
                }
                const symbols = createSymbolTable();
                let isStaticSymbol = false;
                populateSymbols();
                symbols.delete("this" /* This */);
                return symbolsToArray(symbols);
                function populateSymbols() {
                    while (location) {
                        if (canHaveLocals(location) && location.locals && !isGlobalSourceFile(location)) {
                            copySymbols(location.locals, meaning);
                        }
                        switch (location.kind) {
                            case 308 /* SourceFile */:
                                if (!isExternalModule(location))
                                    break;
                            case 264 /* ModuleDeclaration */:
                                copyLocallyVisibleExportSymbols(getSymbolOfDeclaration(location).exports, meaning & 2623475 /* ModuleMember */);
                                break;
                            case 263 /* EnumDeclaration */:
                                copySymbols(getSymbolOfDeclaration(location).exports, meaning & 8 /* EnumMember */);
                                break;
                            case 228 /* ClassExpression */:
                                const className = location.name;
                                if (className) {
                                    copySymbol(location.symbol, meaning);
                                }
                            case 260 /* ClassDeclaration */:
                            case 261 /* InterfaceDeclaration */:
                                if (!isStaticSymbol) {
                                    copySymbols(getMembersOfSymbol(getSymbolOfDeclaration(location)), meaning & 788968 /* Type */);
                                }
                                break;
                            case 215 /* FunctionExpression */:
                                const funcName = location.name;
                                if (funcName) {
                                    copySymbol(location.symbol, meaning);
                                }
                                break;
                        }
                        if (introducesArgumentsExoticObject(location)) {
                            copySymbol(argumentsSymbol, meaning);
                        }
                        isStaticSymbol = isStatic(location);
                        location = location.parent;
                    }
                    copySymbols(globals, meaning);
                }
                function copySymbol(symbol, meaning2) {
                    if (getCombinedLocalAndExportSymbolFlags(symbol) & meaning2) {
                        const id = symbol.escapedName;
                        if (!symbols.has(id)) {
                            symbols.set(id, symbol);
                        }
                    }
                }
                function copySymbols(source, meaning2) {
                    if (meaning2) {
                        source.forEach((symbol) => {
                            copySymbol(symbol, meaning2);
                        });
                    }
                }
                function copyLocallyVisibleExportSymbols(source, meaning2) {
                    if (meaning2) {
                        source.forEach((symbol) => {
                            if (!getDeclarationOfKind(symbol, 278 /* ExportSpecifier */) && !getDeclarationOfKind(symbol, 277 /* NamespaceExport */)) {
                                copySymbol(symbol, meaning2);
                            }
                        });
                    }
                }
            }