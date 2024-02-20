function isObjectLiteralType(type) {
            return type.flags & 524288 /* Object */ && (getObjectFlags(type) & 128 /* ObjectLiteral */ || type.symbol && tryCast(singleOrUndefined(type.symbol.declarations), isTypeLiteralNode));
        }