function isPatternLiteralPlaceholderType(type) {
                return !!(type.flags & (1 /* Any */ | 4 /* String */ | 8 /* Number */ | 64 /* BigInt */)) || isPatternLiteralType(type);
            }