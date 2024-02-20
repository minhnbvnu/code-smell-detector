function tryGetDeclaredTypeOfSymbol(symbol) {
                if (symbol.flags & (32 /* Class */ | 64 /* Interface */)) {
                    return getDeclaredTypeOfClassOrInterface(symbol);
                }
                if (symbol.flags & 524288 /* TypeAlias */) {
                    return getDeclaredTypeOfTypeAlias(symbol);
                }
                if (symbol.flags & 262144 /* TypeParameter */) {
                    return getDeclaredTypeOfTypeParameter(symbol);
                }
                if (symbol.flags & 384 /* Enum */) {
                    return getDeclaredTypeOfEnum(symbol);
                }
                if (symbol.flags & 8 /* EnumMember */) {
                    return getDeclaredTypeOfEnumMember(symbol);
                }
                if (symbol.flags & 2097152 /* Alias */) {
                    return getDeclaredTypeOfAlias(symbol);
                }
                return void 0;
            }