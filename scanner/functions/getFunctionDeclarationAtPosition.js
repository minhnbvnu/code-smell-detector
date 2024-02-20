function getFunctionDeclarationAtPosition(file, startPosition, checker) {
            const node = getTouchingToken(file, startPosition);
            const functionDeclaration = getContainingFunctionDeclaration(node);
            if (isTopLevelJSDoc(node))
                return void 0;
            if (functionDeclaration && isValidFunctionDeclaration(functionDeclaration, checker) && rangeContainsRange(functionDeclaration, node) && !(functionDeclaration.body && rangeContainsRange(functionDeclaration.body, node)))
                return functionDeclaration;
            return void 0;
        }