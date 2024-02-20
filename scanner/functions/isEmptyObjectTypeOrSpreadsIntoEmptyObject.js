function isEmptyObjectTypeOrSpreadsIntoEmptyObject(type) {
                return isEmptyObjectType(type) || !!(type.flags & (65536 /* Null */ | 32768 /* Undefined */ | 528 /* BooleanLike */ | 296 /* NumberLike */ | 2112 /* BigIntLike */ | 402653316 /* StringLike */ | 1056 /* EnumLike */ | 67108864 /* NonPrimitive */ | 4194304 /* Index */));
            }