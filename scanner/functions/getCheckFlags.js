function getCheckFlags(symbol) {
            return symbol.flags & 33554432 /* Transient */ ? symbol.links.checkFlags : 0;
        }