function getRecursionIdentity(type) {
                if (type.flags & 524288 /* Object */ && !isObjectOrArrayLiteralType(type)) {
                    if (getObjectFlags(type) && 4 /* Reference */ && type.node) {
                        return type.node;
                    }
                    if (type.symbol && !(getObjectFlags(type) & 16 /* Anonymous */ && type.symbol.flags & 32 /* Class */)) {
                        return type.symbol;
                    }
                    if (isTupleType(type)) {
                        return type.target;
                    }
                }
                if (type.flags & 262144 /* TypeParameter */) {
                    return type.symbol;
                }
                if (type.flags & 8388608 /* IndexedAccess */) {
                    do {
                        type = type.objectType;
                    } while (type.flags & 8388608 /* IndexedAccess */);
                    return type;
                }
                if (type.flags & 16777216 /* Conditional */) {
                    return type.root;
                }
                return type;
            }