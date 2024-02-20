function getBaseTypeOfEnumLikeType(type) {
                return type.flags & 1056 /* EnumLike */ && type.symbol.flags & 8 /* EnumMember */ ? getDeclaredTypeOfSymbol(getParentOfSymbol(type.symbol)) : type;
            }