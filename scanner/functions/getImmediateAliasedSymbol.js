function getImmediateAliasedSymbol(symbol) {
                Debug.assert((symbol.flags & 2097152 /* Alias */) !== 0, "Should only get Alias here.");
                const links = getSymbolLinks(symbol);
                if (!links.immediateTarget) {
                    const node = getDeclarationOfAliasSymbol(symbol);
                    if (!node)
                        return Debug.fail();
                    links.immediateTarget = getTargetOfAliasDeclaration(node, 
                    /*dontRecursivelyResolve*/
                    true);
                }
                return links.immediateTarget;
            }