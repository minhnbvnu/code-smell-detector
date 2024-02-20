function isEmptyAnonymousObjectType(type) {
                return !!(getObjectFlags(type) & 16 /* Anonymous */ && (type.members && isEmptyResolvedType(type) || type.symbol && type.symbol.flags & 2048 /* TypeLiteral */ && getMembersOfSymbol(type.symbol).size === 0));
            }