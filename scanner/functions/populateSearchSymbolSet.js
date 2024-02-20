function populateSearchSymbolSet(symbol, location, checker, isForRename, providePrefixAndSuffixText, implementations) {
                        const result = [];
                        forEachRelatedSymbol(symbol, location, checker, isForRename, !(isForRename && providePrefixAndSuffixText), (sym, root, base) => {
                            if (base) {
                                if (isStaticSymbol(symbol) !== isStaticSymbol(base)) {
                                    base = void 0;
                                }
                            }
                            result.push(base || root || sym);
                        }, 
                        // when try to find implementation, implementations is true, and not allowed to find base class
                        /*allowBaseTypes*/
                        () => !implementations);
                        return result;
                    }