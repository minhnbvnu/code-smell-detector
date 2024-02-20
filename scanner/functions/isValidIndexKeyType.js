function isValidIndexKeyType(type) {
                return !!(type.flags & (4 /* String */ | 8 /* Number */ | 4096 /* ESSymbol */)) || isPatternLiteralType(type) || !!(type.flags & 2097152 /* Intersection */) && !isGenericType(type) && some(type.types, isValidIndexKeyType);
            }