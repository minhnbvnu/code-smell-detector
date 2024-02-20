function getLocalSymbolForExportDefault(symbol) {
            if (!isExportDefaultSymbol(symbol) || !symbol.declarations)
                return void 0;
            for (const decl of symbol.declarations) {
                if (decl.localSymbol)
                    return decl.localSymbol;
            }
            return void 0;
        }