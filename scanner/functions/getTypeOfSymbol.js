function getTypeOfSymbol(symbol) {
                const checkFlags = getCheckFlags(symbol);
                if (checkFlags & 65536 /* DeferredType */) {
                    return getTypeOfSymbolWithDeferredType(symbol);
                }
                if (checkFlags & 1 /* Instantiated */) {
                    return getTypeOfInstantiatedSymbol(symbol);
                }
                if (checkFlags & 262144 /* Mapped */) {
                    return getTypeOfMappedSymbol(symbol);
                }
                if (checkFlags & 8192 /* ReverseMapped */) {
                    return getTypeOfReverseMappedSymbol(symbol);
                }
                if (symbol.flags & (3 /* Variable */ | 4 /* Property */)) {
                    return getTypeOfVariableOrParameterOrProperty(symbol);
                }
                if (symbol.flags & (16 /* Function */ | 8192 /* Method */ | 32 /* Class */ | 384 /* Enum */ | 512 /* ValueModule */)) {
                    return getTypeOfFuncClassEnumModule(symbol);
                }
                if (symbol.flags & 8 /* EnumMember */) {
                    return getTypeOfEnumMember(symbol);
                }
                if (symbol.flags & 98304 /* Accessor */) {
                    return getTypeOfAccessors(symbol);
                }
                if (symbol.flags & 2097152 /* Alias */) {
                    return getTypeOfAlias(symbol);
                }
                return errorType;
            }