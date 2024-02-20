function markVariableAsUsed(scopeManager, currentNode, languageOptions, name) {
        const parserOptions = languageOptions.parserOptions;
        const sourceType = languageOptions.sourceType;
        const hasGlobalReturn = (parserOptions.ecmaFeatures && parserOptions.ecmaFeatures.globalReturn) ||
            sourceType === "commonjs";
        const specialScope = hasGlobalReturn || sourceType === "module";
        const currentScope = getScope(scopeManager, currentNode);
        // Special Node.js scope means we need to start one level deeper
        const initialScope = currentScope.type === "global" && specialScope ? currentScope.childScopes[0] : currentScope;
        for (let scope = initialScope; scope; scope = scope.upper) {
            const variable = scope.variables.find(scopeVar => scopeVar.name === name);
            if (variable) {
                variable.eslintUsed = true;
                return true;
            }
        }
        return false;
    }