function copySymbol(symbol, meaning2) {
                    if (getCombinedLocalAndExportSymbolFlags(symbol) & meaning2) {
                        const id = symbol.escapedName;
                        if (!symbols.has(id)) {
                            symbols.set(id, symbol);
                        }
                    }
                }