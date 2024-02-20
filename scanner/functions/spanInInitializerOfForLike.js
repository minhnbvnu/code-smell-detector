function spanInInitializerOfForLike(forLikeStatement) {
                    if (forLikeStatement.initializer.kind === 258 /* VariableDeclarationList */) {
                        const variableDeclarationList = forLikeStatement.initializer;
                        if (variableDeclarationList.declarations.length > 0) {
                            return spanInNode(variableDeclarationList.declarations[0]);
                        }
                    }
                    else {
                        return spanInNode(forLikeStatement.initializer);
                    }
                }