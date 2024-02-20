function getDescriptionForFunctionLikeDeclaration(scope) {
            switch (scope.kind) {
                case 173 /* Constructor */:
                    return "constructor";
                case 215 /* FunctionExpression */:
                case 259 /* FunctionDeclaration */:
                    return scope.name ? `function '${scope.name.text}'` : ANONYMOUS;
                case 216 /* ArrowFunction */:
                    return "arrow function";
                case 171 /* MethodDeclaration */:
                    return `method '${scope.name.getText()}'`;
                case 174 /* GetAccessor */:
                    return `'get ${scope.name.getText()}'`;
                case 175 /* SetAccessor */:
                    return `'set ${scope.name.getText()}'`;
                default:
                    throw Debug.assertNever(scope, `Unexpected scope kind ${scope.kind}`);
            }
        }