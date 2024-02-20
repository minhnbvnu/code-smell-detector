function isConstEnumSymbol(symbol) {
                return (symbol.flags & 128 /* ConstEnum */) !== 0;
            }