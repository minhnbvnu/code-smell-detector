function isConstVariable(symbol) {
                return symbol.flags & 3 /* Variable */ && (getDeclarationNodeFlagsFromSymbol(symbol) & 2 /* Const */) !== 0;
            }