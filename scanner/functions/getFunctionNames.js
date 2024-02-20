function getFunctionNames(functionDeclaration) {
            switch (functionDeclaration.kind) {
                case 259 /* FunctionDeclaration */:
                    if (functionDeclaration.name)
                        return [functionDeclaration.name];
                    const defaultModifier = Debug.checkDefined(findModifier(functionDeclaration, 88 /* DefaultKeyword */), "Nameless function declaration should be a default export");
                    return [defaultModifier];
                case 171 /* MethodDeclaration */:
                    return [functionDeclaration.name];
                case 173 /* Constructor */:
                    const ctrKeyword = Debug.checkDefined(findChildOfKind(functionDeclaration, 135 /* ConstructorKeyword */, functionDeclaration.getSourceFile()), "Constructor declaration should have constructor keyword");
                    if (functionDeclaration.parent.kind === 228 /* ClassExpression */) {
                        const variableDeclaration = functionDeclaration.parent.parent;
                        return [variableDeclaration.name, ctrKeyword];
                    }
                    return [ctrKeyword];
                case 216 /* ArrowFunction */:
                    return [functionDeclaration.parent.name];
                case 215 /* FunctionExpression */:
                    if (functionDeclaration.name)
                        return [functionDeclaration.name, functionDeclaration.parent.name];
                    return [functionDeclaration.parent.name];
                default:
                    return Debug.assertNever(functionDeclaration, `Unexpected function declaration kind ${functionDeclaration.kind}`);
            }
        }