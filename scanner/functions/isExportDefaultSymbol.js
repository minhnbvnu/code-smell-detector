function isExportDefaultSymbol(symbol) {
            return symbol && length(symbol.declarations) > 0 && hasSyntacticModifier(symbol.declarations[0], 1024 /* Default */);
        }