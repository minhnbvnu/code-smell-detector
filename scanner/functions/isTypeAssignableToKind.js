function isTypeAssignableToKind(source, kind, strict) {
                if (source.flags & kind) {
                    return true;
                }
                if (strict && source.flags & (3 /* AnyOrUnknown */ | 16384 /* Void */ | 32768 /* Undefined */ | 65536 /* Null */)) {
                    return false;
                }
                return !!(kind & 296 /* NumberLike */) && isTypeAssignableTo(source, numberType) || !!(kind & 2112 /* BigIntLike */) && isTypeAssignableTo(source, bigintType) || !!(kind & 402653316 /* StringLike */) && isTypeAssignableTo(source, stringType) || !!(kind & 528 /* BooleanLike */) && isTypeAssignableTo(source, booleanType) || !!(kind & 16384 /* Void */) && isTypeAssignableTo(source, voidType) || !!(kind & 131072 /* Never */) && isTypeAssignableTo(source, neverType) || !!(kind & 65536 /* Null */) && isTypeAssignableTo(source, nullType) || !!(kind & 32768 /* Undefined */) && isTypeAssignableTo(source, undefinedType) || !!(kind & 4096 /* ESSymbol */) && isTypeAssignableTo(source, esSymbolType) || !!(kind & 67108864 /* NonPrimitive */) && isTypeAssignableTo(source, nonPrimitiveType);
            }