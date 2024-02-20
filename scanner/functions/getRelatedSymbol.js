function getRelatedSymbol(search, referenceSymbol, referenceLocation, state) {
                        const { checker } = state;
                        return forEachRelatedSymbol(referenceSymbol, referenceLocation, checker, 
                        /*isForRenamePopulateSearchSymbolSet*/
                        false, 
                        /*onlyIncludeBindingElementAtReferenceLocation*/
                        state.options.use !== 2 /* Rename */ || !!state.options.providePrefixAndSuffixTextForRename, (sym, rootSymbol, baseSymbol, kind) => {
                            if (baseSymbol) {
                                if (isStaticSymbol(referenceSymbol) !== isStaticSymbol(baseSymbol)) {
                                    baseSymbol = void 0;
                                }
                            }
                            return search.includes(baseSymbol || rootSymbol || sym) ? { symbol: rootSymbol && !(getCheckFlags(sym) & 6 /* Synthetic */) ? rootSymbol : sym, kind } : void 0;
                        }, 
                        /*allowBaseTypes*/
                        (rootSymbol) => !(search.parents && !search.parents.some((parent2) => explicitlyInheritsFrom(rootSymbol.parent, parent2, state.inheritsFromCache, checker))));
                    }