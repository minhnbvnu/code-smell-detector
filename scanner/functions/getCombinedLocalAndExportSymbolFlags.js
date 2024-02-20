function getCombinedLocalAndExportSymbolFlags(symbol) {
            return symbol.exportSymbol ? symbol.exportSymbol.flags | symbol.flags : symbol.flags;
        }