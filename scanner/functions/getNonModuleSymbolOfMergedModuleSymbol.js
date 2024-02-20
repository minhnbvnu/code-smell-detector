function getNonModuleSymbolOfMergedModuleSymbol(symbol) {
                        if (!(symbol.flags & (1536 /* Module */ | 33554432 /* Transient */)))
                            return void 0;
                        const decl = symbol.declarations && find(symbol.declarations, (d) => !isSourceFile(d) && !isModuleDeclaration(d));
                        return decl && decl.symbol;
                    }