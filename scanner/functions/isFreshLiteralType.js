function isFreshLiteralType(type) {
                return !!(type.flags & 2976 /* Freshable */) && type.freshType === type;
            }