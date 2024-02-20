function getMergedAliasedSymbolOfNamespaceExportDeclaration(node, symbol, checker) {
                        if (node.parent && isNamespaceExportDeclaration(node.parent)) {
                            const aliasedSymbol = checker.getAliasedSymbol(symbol);
                            const targetSymbol = checker.getMergedSymbol(aliasedSymbol);
                            if (aliasedSymbol !== targetSymbol) {
                                return targetSymbol;
                            }
                        }
                        return void 0;
                    }