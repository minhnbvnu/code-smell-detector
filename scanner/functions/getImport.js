function getImport() {
                const isImport3 = isNodeImport(node);
                if (!isImport3)
                    return void 0;
                let importedSymbol = checker.getImmediateAliasedSymbol(symbol);
                if (!importedSymbol)
                    return void 0;
                importedSymbol = skipExportSpecifierSymbol(importedSymbol, checker);
                if (importedSymbol.escapedName === "export=") {
                    importedSymbol = getExportEqualsLocalSymbol(importedSymbol, checker);
                    if (importedSymbol === void 0)
                        return void 0;
                }
                const importedName = symbolEscapedNameNoDefault(importedSymbol);
                if (importedName === void 0 || importedName === "default" /* Default */ || importedName === symbol.escapedName) {
                    return { kind: 0 /* Import */, symbol: importedSymbol };
                }
            }