function getTypeWithSyntheticDefaultImportType(type, symbol, originalSymbol, moduleSpecifier) {
                var _a2;
                if (allowSyntheticDefaultImports && type && !isErrorType(type)) {
                    const synthType = type;
                    if (!synthType.syntheticType) {
                        const file = (_a2 = originalSymbol.declarations) == null ? void 0 : _a2.find(isSourceFile);
                        const hasSyntheticDefault = canHaveSyntheticDefault(file, originalSymbol, 
                        /*dontResolveAlias*/
                        false, moduleSpecifier);
                        if (hasSyntheticDefault) {
                            const anonymousSymbol = createSymbol(2048 /* TypeLiteral */, "__type" /* Type */);
                            const defaultContainingObject = createDefaultPropertyWrapperForModule(symbol, originalSymbol, anonymousSymbol);
                            anonymousSymbol.links.type = defaultContainingObject;
                            synthType.syntheticType = isValidSpreadType(type) ? getSpreadType(type, defaultContainingObject, anonymousSymbol, 
                            /*objectFlags*/
                            0, 
                            /*readonly*/
                            false) : defaultContainingObject;
                        }
                        else {
                            synthType.syntheticType = type;
                        }
                    }
                    return synthType.syntheticType;
                }
                return type;
            }