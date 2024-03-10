function isSimpleTypeRelatedTo(source, target, relation, errorReporter) {
                const s = source.flags;
                const t = target.flags;
                if (t & 1 /* Any */ || s & 131072 /* Never */ || source === wildcardType)
                    return true;
                if (t & 2 /* Unknown */ && !(relation === strictSubtypeRelation && s & 1 /* Any */))
                    return true;
                if (t & 131072 /* Never */)
                    return false;
                if (s & 402653316 /* StringLike */ && t & 4 /* String */)
                    return true;
                if (s & 128 /* StringLiteral */ && s & 1024 /* EnumLiteral */ && t & 128 /* StringLiteral */ && !(t & 1024 /* EnumLiteral */) && source.value === target.value)
                    return true;
                if (s & 296 /* NumberLike */ && t & 8 /* Number */)
                    return true;
                if (s & 256 /* NumberLiteral */ && s & 1024 /* EnumLiteral */ && t & 256 /* NumberLiteral */ && !(t & 1024 /* EnumLiteral */) && source.value === target.value)
                    return true;
                if (s & 2112 /* BigIntLike */ && t & 64 /* BigInt */)
                    return true;
                if (s & 528 /* BooleanLike */ && t & 16 /* Boolean */)
                    return true;
                if (s & 12288 /* ESSymbolLike */ && t & 4096 /* ESSymbol */)
                    return true;
                if (s & 32 /* Enum */ && t & 32 /* Enum */ && source.symbol.escapedName === target.symbol.escapedName && isEnumTypeRelatedTo(source.symbol, target.symbol, errorReporter))
                    return true;
                if (s & 1024 /* EnumLiteral */ && t & 1024 /* EnumLiteral */) {
                    if (s & 1048576 /* Union */ && t & 1048576 /* Union */ && isEnumTypeRelatedTo(source.symbol, target.symbol, errorReporter))
                        return true;
                    if (s & 2944 /* Literal */ && t & 2944 /* Literal */ && source.value === target.value && isEnumTypeRelatedTo(source.symbol, target.symbol, errorReporter))
                        return true;
                }
                if (s & 32768 /* Undefined */ && (!strictNullChecks && !(t & 3145728 /* UnionOrIntersection */) || t & (32768 /* Undefined */ | 16384 /* Void */)))
                    return true;
                if (s & 65536 /* Null */ && (!strictNullChecks && !(t & 3145728 /* UnionOrIntersection */) || t & 65536 /* Null */))
                    return true;
                if (s & 524288 /* Object */ && t & 67108864 /* NonPrimitive */ && !(relation === strictSubtypeRelation && isEmptyAnonymousObjectType(source) && !(getObjectFlags(source) & 8192 /* FreshLiteral */)))
                    return true;
                if (relation === assignableRelation || relation === comparableRelation) {
                    if (s & 1 /* Any */)
                        return true;
                    if (s & 8 /* Number */ && (t & 32 /* Enum */ || t & 256 /* NumberLiteral */ && t & 1024 /* EnumLiteral */))
                        return true;
                    if (s & 256 /* NumberLiteral */ && !(s & 1024 /* EnumLiteral */) && (t & 32 /* Enum */ || t & 256 /* NumberLiteral */ && t & 1024 /* EnumLiteral */ && source.value === target.value))
                        return true;
                    if (isUnknownLikeUnionType(target))
                        return true;
                }
                return false;
            }