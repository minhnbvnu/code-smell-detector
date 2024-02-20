function isValidFunctionDeclaration(functionDeclaration, checker) {
            var _a2;
            if (!isValidParameterNodeArray(functionDeclaration.parameters, checker))
                return false;
            switch (functionDeclaration.kind) {
                case 259 /* FunctionDeclaration */:
                    return hasNameOrDefault(functionDeclaration) && isSingleImplementation(functionDeclaration, checker);
                case 171 /* MethodDeclaration */:
                    if (isObjectLiteralExpression(functionDeclaration.parent)) {
                        const contextualSymbol = getSymbolForContextualType(functionDeclaration.name, checker);
                        return ((_a2 = contextualSymbol == null ? void 0 : contextualSymbol.declarations) == null ? void 0 : _a2.length) === 1 && isSingleImplementation(functionDeclaration, checker);
                    }
                    return isSingleImplementation(functionDeclaration, checker);
                case 173 /* Constructor */:
                    if (isClassDeclaration(functionDeclaration.parent)) {
                        return hasNameOrDefault(functionDeclaration.parent) && isSingleImplementation(functionDeclaration, checker);
                    }
                    else {
                        return isValidVariableDeclaration(functionDeclaration.parent.parent) && isSingleImplementation(functionDeclaration, checker);
                    }
                case 215 /* FunctionExpression */:
                case 216 /* ArrowFunction */:
                    return isValidVariableDeclaration(functionDeclaration.parent);
            }
            return false;
        }