function getEnclosingFunctionScope(scope) {
        let currentScope = scope;
        while (currentScope.type !== "function" && currentScope.type !== "global") {
            currentScope = currentScope.upper;
        }
        return currentScope;
    }