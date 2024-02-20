function isTransientSymbol(symbol) {
            return (symbol.flags & 33554432 /* Transient */) !== 0;
        }