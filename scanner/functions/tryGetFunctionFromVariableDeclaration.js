function tryGetFunctionFromVariableDeclaration(sourceFile, typeChecker, parent2) {
            if (!isSingleVariableDeclaration(parent2)) {
                return void 0;
            }
            const variableDeclaration = isVariableDeclaration(parent2) ? parent2 : first(parent2.declarations);
            const initializer = variableDeclaration.initializer;
            if (initializer && (isArrowFunction(initializer) || isFunctionExpression(initializer) && !isFunctionReferencedInFile(sourceFile, typeChecker, initializer))) {
                return initializer;
            }
            return void 0;
        }