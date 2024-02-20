function getStatementsOrClassElements(scope) {
            if (isFunctionLikeDeclaration(scope)) {
                const body = scope.body;
                if (isBlock(body)) {
                    return body.statements;
                }
            }
            else if (isModuleBlock(scope) || isSourceFile(scope)) {
                return scope.statements;
            }
            else if (isClassLike(scope)) {
                return scope.members;
            }
            else {
                assertType(scope);
            }
            return emptyArray;
        }