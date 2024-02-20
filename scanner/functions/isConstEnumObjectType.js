function isConstEnumObjectType(type) {
                return !!(getObjectFlags(type) & 16 /* Anonymous */) && !!type.symbol && isConstEnumSymbol(type.symbol);
            }