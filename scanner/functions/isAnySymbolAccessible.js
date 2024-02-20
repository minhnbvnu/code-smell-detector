function isAnySymbolAccessible(symbols, enclosingDeclaration, initialSymbol, meaning, shouldComputeAliasesToMakeVisible, allowModules) {
                if (!length(symbols))
                    return;
                let hadAccessibleChain;
                let earlyModuleBail = false;
                for (const symbol of symbols) {
                    const accessibleSymbolChain = getAccessibleSymbolChain(symbol, enclosingDeclaration, meaning, 
                    /*useOnlyExternalAliasing*/
                    false);
                    if (accessibleSymbolChain) {
                        hadAccessibleChain = symbol;
                        const hasAccessibleDeclarations = hasVisibleDeclarations(accessibleSymbolChain[0], shouldComputeAliasesToMakeVisible);
                        if (hasAccessibleDeclarations) {
                            return hasAccessibleDeclarations;
                        }
                    }
                    if (allowModules) {
                        if (some(symbol.declarations, hasNonGlobalAugmentationExternalModuleSymbol)) {
                            if (shouldComputeAliasesToMakeVisible) {
                                earlyModuleBail = true;
                                continue;
                            }
                            return {
                                accessibility: 0 /* Accessible */
                            };
                        }
                    }
                    const containers = getContainersOfSymbol(symbol, enclosingDeclaration, meaning);
                    const parentResult = isAnySymbolAccessible(containers, enclosingDeclaration, initialSymbol, initialSymbol === symbol ? getQualifiedLeftMeaning(meaning) : meaning, shouldComputeAliasesToMakeVisible, allowModules);
                    if (parentResult) {
                        return parentResult;
                    }
                }
                if (earlyModuleBail) {
                    return {
                        accessibility: 0 /* Accessible */
                    };
                }
                if (hadAccessibleChain) {
                    return {
                        accessibility: 1 /* NotAccessible */,
                        errorSymbolName: symbolToString(initialSymbol, enclosingDeclaration, meaning),
                        errorModuleName: hadAccessibleChain !== initialSymbol ? symbolToString(hadAccessibleChain, enclosingDeclaration, 1920 /* Namespace */) : void 0
                    };
                }
            }