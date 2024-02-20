function qualifierIsUnnecessary(qualifier, name) {
                const tsQualifier = esTreeNodeToTSNodeMap.get(qualifier);
                const tsName = esTreeNodeToTSNodeMap.get(name);
                const namespaceSymbol = checker.getSymbolAtLocation(tsQualifier);
                if (namespaceSymbol === undefined ||
                    !symbolIsNamespaceInScope(namespaceSymbol)) {
                    return false;
                }
                const accessedSymbol = checker.getSymbolAtLocation(tsName);
                if (accessedSymbol === undefined) {
                    return false;
                }
                // If the symbol in scope is different, the qualifier is necessary.
                const fromScope = getSymbolInScope(tsQualifier, accessedSymbol.flags, sourceCode.getText(name));
                return (fromScope === undefined || symbolsAreEqual(accessedSymbol, fromScope));
            }