function getTypeWithSyntheticDefaultOnly(type, symbol, originalSymbol, moduleSpecifier) {
                const hasDefaultOnly = isOnlyImportedAsDefault(moduleSpecifier);
                if (hasDefaultOnly && type && !isErrorType(type)) {
                    const synthType = type;
                    if (!synthType.defaultOnlyType) {
                        const type2 = createDefaultPropertyWrapperForModule(symbol, originalSymbol);
                        synthType.defaultOnlyType = type2;
                    }
                    return synthType.defaultOnlyType;
                }
                return void 0;
            }