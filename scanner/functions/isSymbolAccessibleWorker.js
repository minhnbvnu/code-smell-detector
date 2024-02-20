function isSymbolAccessibleWorker(symbol, enclosingDeclaration, meaning, shouldComputeAliasesToMakeVisible, allowModules) {
                if (symbol && enclosingDeclaration) {
                    const result = isAnySymbolAccessible([symbol], enclosingDeclaration, symbol, meaning, shouldComputeAliasesToMakeVisible, allowModules);
                    if (result) {
                        return result;
                    }
                    const symbolExternalModule = forEach(symbol.declarations, getExternalModuleContainer);
                    if (symbolExternalModule) {
                        const enclosingExternalModule = getExternalModuleContainer(enclosingDeclaration);
                        if (symbolExternalModule !== enclosingExternalModule) {
                            return {
                                accessibility: 2 /* CannotBeNamed */,
                                errorSymbolName: symbolToString(symbol, enclosingDeclaration, meaning),
                                errorModuleName: symbolToString(symbolExternalModule),
                                errorNode: isInJSFile(enclosingDeclaration) ? enclosingDeclaration : void 0
                            };
                        }
                    }
                    return {
                        accessibility: 1 /* NotAccessible */,
                        errorSymbolName: symbolToString(symbol, enclosingDeclaration, meaning)
                    };
                }
                return { accessibility: 0 /* Accessible */ };
            }