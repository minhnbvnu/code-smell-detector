function getFunctionInfo(file, startPosition, program) {
            const token = getTokenAtPosition(file, startPosition);
            const typeChecker = program.getTypeChecker();
            const func = tryGetFunctionFromVariableDeclaration(file, typeChecker, token.parent);
            if (func && !containingThis(func.body) && !typeChecker.containsArgumentsReference(func)) {
                return { selectedVariableDeclaration: true, func };
            }
            const maybeFunc = getContainingFunction(token);
            if (maybeFunc && (isFunctionExpression(maybeFunc) || isArrowFunction(maybeFunc)) && !rangeContainsRange(maybeFunc.body, token) && !containingThis(maybeFunc.body) && !typeChecker.containsArgumentsReference(maybeFunc)) {
                if (isFunctionExpression(maybeFunc) && isFunctionReferencedInFile(file, typeChecker, maybeFunc))
                    return void 0;
                return { selectedVariableDeclaration: false, func: maybeFunc };
            }
            return void 0;
        }