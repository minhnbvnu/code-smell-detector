function getFunctionReferences(containingFunction, sourceFile, program, cancellationToken) {
            let searchToken;
            switch (containingFunction.kind) {
                case 173 /* Constructor */:
                    searchToken = findChildOfKind(containingFunction, 135 /* ConstructorKeyword */, sourceFile);
                    break;
                case 216 /* ArrowFunction */:
                case 215 /* FunctionExpression */:
                    const parent2 = containingFunction.parent;
                    searchToken = (isVariableDeclaration(parent2) || isPropertyDeclaration(parent2)) && isIdentifier(parent2.name) ? parent2.name : containingFunction.name;
                    break;
                case 259 /* FunctionDeclaration */:
                case 171 /* MethodDeclaration */:
                case 170 /* MethodSignature */:
                    searchToken = containingFunction.name;
                    break;
            }
            if (!searchToken) {
                return void 0;
            }
            return getReferences(searchToken, program, cancellationToken);
        }