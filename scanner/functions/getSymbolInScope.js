function getSymbolInScope(node, flags, name) {
                // TODO:PERF `getSymbolsInScope` gets a long list. Is there a better way?
                const scope = checker.getSymbolsInScope(node, flags);
                return scope.find(scopeSymbol => scopeSymbol.name === name);
            }