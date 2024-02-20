function findTypeSymbolInScopeChain(name, scopeChain) {
        var symbol = scopeChain.scope.find(name, false, true);
        if(symbol == null && scopeChain.previous) {
            symbol = findTypeSymbolInScopeChain(name, scopeChain.previous);
        }
        return symbol;
    }