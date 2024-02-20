function getIndexSymbol(symbol) {
                return symbol.members ? getIndexSymbolFromSymbolTable(symbol.members) : void 0;
            }