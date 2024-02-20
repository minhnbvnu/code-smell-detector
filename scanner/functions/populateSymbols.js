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