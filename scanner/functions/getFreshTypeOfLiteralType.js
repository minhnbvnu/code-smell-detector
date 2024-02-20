function getFreshTypeOfLiteralType(type) {
                if (type.flags & 2976 /* Freshable */) {
                    if (!type.freshType) {
                        const freshType = createLiteralType(type.flags, type.value, type.symbol, type);
                        freshType.freshType = freshType;
                        type.freshType = freshType;
                    }
                    return type.freshType;
                }
                return type;
            }